package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.persitence.entity.Sale;
import backendTiendaVirtual.backend.service.common.CarrToOrderService;

import java.util.Optional;

public interface IOrderSaleService extends CarrToOrderService<Sale> {
    Optional<Sale> findById(Long id);
}
