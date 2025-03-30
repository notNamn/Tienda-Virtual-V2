package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.ProductDto;
import backendTiendaVirtual.backend.persitence.entity.Category;
import backendTiendaVirtual.backend.persitence.entity.Product;
import backendTiendaVirtual.backend.persitence.repository.CategoryRepository;
import backendTiendaVirtual.backend.persitence.repository.ProductRepository;
import backendTiendaVirtual.backend.service.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImplProductService implements IProductService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;


    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        return productRepository.findById(id);
    }

    @Override
    @Transactional
    public Product save(ProductDto entityDTO) {
        if (!categoryRepository.existsByName(entityDTO.getCategory().getName())) {
            Category category = new Category();
            category.setName(entityDTO.getCategory().getName());
            categoryRepository.save(category);
        }
        Product product = new Product();
        product.setTitle(entityDTO.getTitle());
        product.setDescription(entityDTO.getDescription());
        product.setPrice(entityDTO.getPrice());
        product.setStock(entityDTO.getStock());
        product.setImageUrl(entityDTO.getImageUrl());
        product.setCategory(categoryRepository.findByName(entityDTO.getCategory().getName()).get());
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Optional<Product> update(Long id, ProductDto entityDTO) {
        Product productBD = productRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Product not found"));
        if (productBD == null) {
            throw new RuntimeException("Product not found");
        }
        productBD.setTitle(entityDTO.getTitle());
        productBD.setDescription(entityDTO.getDescription());
        productBD.setPrice(entityDTO.getPrice());
        productBD.setStock(entityDTO.getStock());
        productBD.setImageUrl(entityDTO.getImageUrl());
        productBD.setCategory(categoryRepository.findByName(entityDTO.getCategory().getName()).get());

        return Optional.of(productRepository.save(productBD));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
