package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.ProductDto;
import backendTiendaVirtual.backend.persitence.entity.Category;
import backendTiendaVirtual.backend.persitence.entity.Product;
import backendTiendaVirtual.backend.persitence.repository.CategoryRepository;
import backendTiendaVirtual.backend.persitence.repository.ProductRepository;
import backendTiendaVirtual.backend.service.IProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class ImplProductService implements IProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> findAll() {
        log.debug("Obteniendo todos los productos");
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        validateId(id);
        
        if (!productRepository.existsById(id)) {
            log.warn("Producto con ID {} no encontrado", id);
            throw new ProductNotFoundException("Producto con ID " + id + " no encontrado");
        }
        
        log.debug("Producto encontrado con ID: {}", id);
        return productRepository.findById(id);
    }

    @Override
    public List<Product> findsByTitle(String title) {
        validateTitle(title);
        log.debug("Buscando productos con título que contiene: {}", title);
        return productRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    @Transactional
    public Product save(ProductDto entityDTO) {
        validateProductDto(entityDTO);
        log.info("Guardando nuevo producto: {}", entityDTO.getTitle());
        
        Category category = getOrCreateCategory(entityDTO.getCategory().getName());
        Product product = mapDtoToEntity(entityDTO, new Product());
        product.setCategory(category);
        
        Product savedProduct = productRepository.save(product);
        log.info("Producto guardado exitosamente con ID: {}", savedProduct.getId());
        
        return savedProduct;
    }

    @Override
    @Transactional
    public Optional<Product> update(Long id, ProductDto entityDTO) {
        validateId(id);
        validateProductDto(entityDTO);
        
        log.info("Actualizando producto con ID: {}", id);
        
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Producto con ID {} no encontrado para actualización", id);
                    return new ProductNotFoundException("Producto con ID " + id + " no encontrado");
                });

        Category category = getOrCreateCategory(entityDTO.getCategory().getName());
        Product updatedProduct = mapDtoToEntity(entityDTO, existingProduct);
        updatedProduct.setCategory(category);
        
        Product savedProduct = productRepository.save(updatedProduct);
        log.info("Producto actualizado exitosamente con ID: {}", id);
        
        return Optional.of(savedProduct);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        validateId(id);
        
        if (!productRepository.existsById(id)) {
            log.error("Intento de eliminar producto inexistente con ID: {}", id);
            throw new ProductNotFoundException("Producto con ID " + id + " no encontrado");
        }
        
        productRepository.deleteById(id);
        log.info("Producto con ID {} eliminado exitosamente", id);
    }

    // Métodos privados de utilidad
    
    private Category getOrCreateCategory(String categoryName) {
        return categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    log.info("Creando nueva categoría: {}", categoryName);
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    return categoryRepository.save(newCategory);
                });
    }

    private Product mapDtoToEntity(ProductDto dto, Product product) {
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
        return product;
    }

    // Métodos de validación
    
    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("El ID debe ser un número positivo válido");
        }
    }

    private void validateTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("El título no puede estar vacío");
        }
    }

    private void validateProductDto(ProductDto productDto) {
        if (productDto == null) {
            throw new IllegalArgumentException("ProductDto no puede ser nulo");
        }
        
        if (productDto.getTitle() == null || productDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("El título del producto es obligatorio");
        }
        
        if (productDto.getPrice() == null || productDto.getPrice() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor que cero");
        }
        
        if (productDto.getStock() == null || productDto.getStock() < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }
        
        if (productDto.getCategory() == null || 
            productDto.getCategory().getName() == null || 
            productDto.getCategory().getName().trim().isEmpty()) {
            throw new IllegalArgumentException("La categoría es obligatoria");
        }
    }

    // Excepción personalizada
    public static class ProductNotFoundException extends RuntimeException {
        public ProductNotFoundException(String message) {
            super(message);
        }
    }
}
