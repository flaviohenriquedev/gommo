package br.com.gommo.modules.root.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenResponseDto {

    private final String accessToken;
    private final String refreshToken;
    private final String tokenType;
    private final long expiresInSeconds;
}
