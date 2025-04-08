package backendTiendaVirtual.backend.persitence.repository;

import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Modifying
    @Query("UPDATE User u SET u.role = :role WHERE u.username =:username")
    void updateUserRole(@Param("username") String username,@Param("role") Role role);
}
