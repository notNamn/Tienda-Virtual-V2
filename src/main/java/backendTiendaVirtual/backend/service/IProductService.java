package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.ProductDto;
import backendTiendaVirtual.backend.persitence.entity.Product;
import backendTiendaVirtual.backend.service.common.CRUDCommonService;

public interface IProductService extends CRUDCommonService<Product, ProductDto> {
}
