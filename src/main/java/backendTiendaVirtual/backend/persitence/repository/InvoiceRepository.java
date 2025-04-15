package backendTiendaVirtual.backend.persitence.repository;

import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.persitence.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query("SELECT s FROM Invoice s WHERE s.seller.user.id = :userId")
    List<Invoice> findInvoicesByUserId(@Param("userId") Long userId);

}
