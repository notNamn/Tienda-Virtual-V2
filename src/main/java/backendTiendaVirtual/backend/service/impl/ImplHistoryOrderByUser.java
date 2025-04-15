package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.persitence.entity.Sale;
import backendTiendaVirtual.backend.persitence.repository.InvoiceRepository;
import backendTiendaVirtual.backend.persitence.repository.SaleRepository;
import backendTiendaVirtual.backend.service.IHistoryOrdersByUser;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ImplHistoryOrderByUser implements IHistoryOrdersByUser {

    private SaleRepository saleRepository;
    private InvoiceRepository invoiceRepository;

    @Override
    public List<Sale> findAllSalesByUserId(Long userId) {
        return saleRepository.findSalesByUserId(userId);
    }

    @Override
    public List<Invoice> findAllInvoicesByUserId(Long userId) {
        return invoiceRepository.findInvoicesByUserId(userId);
    }
}
