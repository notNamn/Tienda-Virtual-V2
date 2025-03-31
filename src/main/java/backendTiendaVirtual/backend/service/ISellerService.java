package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.SellerDto;
import backendTiendaVirtual.backend.persitence.entity.Seller;
import backendTiendaVirtual.backend.service.common.CRUDCommonService;

import java.util.Optional;

public interface ISellerService extends CRUDCommonService<Seller, SellerDto> {
    Optional<Seller> findByCarnet(Integer carnet);
}
