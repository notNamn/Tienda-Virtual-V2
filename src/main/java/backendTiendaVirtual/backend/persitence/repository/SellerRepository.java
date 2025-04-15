package backendTiendaVirtual.backend.persitence.repository;

import backendTiendaVirtual.backend.persitence.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findByCarnet(Integer carnet);

    Optional<Seller> findByUser_Username(String username);
}

