package br.com.gommo.modules.root.repository;

import br.com.gommo.core.entity.StatusEnum;
import br.com.gommo.modules.root.entity.AppUser;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AppUserRepository extends JpaRepository<AppUser, UUID> {

    @Query("SELECT u FROM AppUser u LEFT JOIN FETCH u.roles r LEFT JOIN FETCH r.permissions WHERE u.username = :username AND u.status <> :deleted")
    Optional<AppUser> findActiveByUsername(String username, StatusEnum deleted);

    @Query("SELECT u FROM AppUser u LEFT JOIN FETCH u.roles r LEFT JOIN FETCH r.permissions WHERE u.id = :id AND u.status <> :deleted")
    Optional<AppUser> findActiveByIdWithRoles(UUID id, StatusEnum deleted);

    boolean existsByUsername(String username);
}
