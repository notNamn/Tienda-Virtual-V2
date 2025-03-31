package backendTiendaVirtual.backend.persitence.repository;

import backendTiendaVirtual.backend.persitence.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCarnet(Integer carnet);
}
