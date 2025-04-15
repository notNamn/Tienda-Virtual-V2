package backendTiendaVirtual.backend.persitence.repository;

import backendTiendaVirtual.backend.persitence.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findBySellerId(Integer sellerId);

    @Query("SELECT s FROM Sale s WHERE s.seller.user.id = :userId")
    List<Sale> findSalesByUserId(@Param("userId") Long userId);

}
