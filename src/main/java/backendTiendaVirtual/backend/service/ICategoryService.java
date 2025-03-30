package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.CategoryDto;
import backendTiendaVirtual.backend.persitence.entity.Category;
import backendTiendaVirtual.backend.service.common.CRUDCommonService;

import java.util.Optional;

public interface ICategoryService extends CRUDCommonService<Category, CategoryDto> {

    Optional<Category> findByName(String name);
}
