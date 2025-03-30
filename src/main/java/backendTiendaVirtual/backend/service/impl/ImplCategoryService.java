package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.CategoryDto;
import backendTiendaVirtual.backend.persitence.entity.Category;
import backendTiendaVirtual.backend.persitence.repository.CategoryRepository;
import backendTiendaVirtual.backend.service.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImplCategoryService implements ICategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findByName(String name) {
        if (!categoryRepository.existsByName(name)) {
            throw new RuntimeException("Category not found");
        }
        return categoryRepository.findByName(name);
    }
}
