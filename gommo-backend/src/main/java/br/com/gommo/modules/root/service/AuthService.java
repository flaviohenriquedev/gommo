package br.com.gommo.modules.root.service;

import br.com.gommo.core.entity.StatusEnum;
import br.com.gommo.core.exception.BusinessException;
import br.com.gommo.core.security.JwtProperties;
import br.com.gommo.core.security.JwtService;
import br.com.gommo.modules.root.dto.LoginRequestDto;
import br.com.gommo.modules.root.dto.RefreshTokenRequestDto;
import br.com.gommo.modules.root.dto.TokenResponseDto;
import br.com.gommo.modules.root.entity.AppUser;
import br.com.gommo.modules.root.entity.Permission;
import br.com.gommo.modules.root.entity.RefreshToken;
import br.com.gommo.modules.root.entity.RefreshTokenBlacklist;
import br.com.gommo.modules.root.entity.Role;
import br.com.gommo.modules.root.repository.AppUserRepository;
import br.com.gommo.modules.root.repository.RefreshTokenBlacklistRepository;
import br.com.gommo.modules.root.repository.RefreshTokenRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.OffsetDateTime;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService implements IAuthService {

    private final AppUserRepository appUserRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenBlacklistRepository blacklistRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    public AuthService(
            AppUserRepository appUserRepository,
            RefreshTokenRepository refreshTokenRepository,
            RefreshTokenBlacklistRepository blacklistRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            JwtProperties jwtProperties) {
        this.appUserRepository = appUserRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.blacklistRepository = blacklistRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.jwtProperties = jwtProperties;
    }

    @Override
    @Transactional
    public TokenResponseDto login(LoginRequestDto request) {
        AppUser user = appUserRepository
                .findActiveByUsername(request.getUsername(), StatusEnum.DELETED)
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        user.setLastLogin(OffsetDateTime.now());
        appUserRepository.save(user);

        return buildTokenResponse(user);
    }

    @Override
    @Transactional
    public TokenResponseDto refresh(RefreshTokenRequestDto request) {
        String rawRefresh = request.getRefreshToken();
        if (!jwtService.isRefreshToken(rawRefresh)) {
            throw new BusinessException("INVALID_REFRESH", "Invalid refresh token");
        }

        String tokenHash = hashToken(rawRefresh);
        if (blacklistRepository.existsByTokenHash(tokenHash)) {
            throw new BusinessException("REVOKED_REFRESH", "Refresh token has been revoked");
        }

        RefreshToken stored = refreshTokenRepository
                .findByTokenHashAndRevokedFalse(tokenHash)
                .orElseThrow(() -> new BusinessException("INVALID_REFRESH", "Refresh token not found"));

        if (stored.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new BusinessException("EXPIRED_REFRESH", "Refresh token expired");
        }

        stored.setRevoked(true);
        refreshTokenRepository.save(stored);
        blacklistRepository.save(RefreshTokenBlacklist.builder()
                .tokenHash(tokenHash)
                .revokedAt(OffsetDateTime.now())
                .build());

        UUID userId = jwtService.extractUserId(rawRefresh);
        AppUser user = appUserRepository
                .findById(userId)
                .filter(u -> u.getStatus() != StatusEnum.DELETED)
                .orElseThrow(() -> new BusinessException("USER_NOT_FOUND", "User not found"));

        return buildTokenResponse(user);
    }

    private TokenResponseDto buildTokenResponse(AppUser user) {
        List<String> permissions = user.getRoles().stream()
                .map(Role::getPermissions)
                .flatMap(java.util.Set::stream)
                .map(Permission::getCode)
                .distinct()
                .toList();

        String accessToken = jwtService.generateAccessToken(user.getId(), user.getUsername(), permissions);
        String refreshToken = jwtService.generateRefreshToken(user.getId());
        persistRefreshToken(user.getId(), refreshToken);

        return TokenResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresInSeconds(jwtProperties.accessTokenMinutes() * 60)
                .build();
    }

    private void persistRefreshToken(UUID userId, String rawToken) {
        refreshTokenRepository.save(RefreshToken.builder()
                .userId(userId)
                .tokenHash(hashToken(rawToken))
                .expiresAt(OffsetDateTime.now().plusDays(jwtProperties.refreshTokenDays()))
                .revoked(false)
                .createdAt(OffsetDateTime.now())
                .build());
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }
}
