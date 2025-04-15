package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.service.common.CarrToOrderService;

import java.util.Optional;


public interface IOrderInvoiceService extends CarrToOrderService<Invoice> {
    Optional<Invoice> findById(Long id);
}
