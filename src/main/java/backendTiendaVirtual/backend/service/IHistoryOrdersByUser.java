package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.persitence.entity.Sale;

import java.util.List;

public interface IHistoryOrdersByUser {

    List<Sale> findAllSalesByUserId(Long userId);

    List<Invoice> findAllInvoicesByUserId(Long userId);
}
