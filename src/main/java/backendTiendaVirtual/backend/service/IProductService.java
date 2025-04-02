package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.ProductDto;
import backendTiendaVirtual.backend.persitence.entity.Product;
import backendTiendaVirtual.backend.service.common.CRUDCommonService;

import java.util.List;

public interface IProductService extends CRUDCommonService<Product, ProductDto> {
    List<Product> findsByTitle(String title);
}
