package br.com.gommo.modules.root.repository;

import br.com.gommo.modules.root.entity.RefreshTokenBlacklist;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenBlacklistRepository extends JpaRepository<RefreshTokenBlacklist, UUID> {

    boolean existsByTokenHash(String tokenHash);
}
