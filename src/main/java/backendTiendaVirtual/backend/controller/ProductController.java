package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.dto.ProductDto;
import backendTiendaVirtual.backend.dto.CategoryDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Product;
import backendTiendaVirtual.backend.service.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {

    private final IProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> findAll() {
        List<ProductDto> products = productService.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(products);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<?> findsByTitle(@PathVariable String title) {
        try {
            List<ProductDto> products = productService.findsByTitle(title)
                    .stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            if (products.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NO_CONTENT)
                        .body(new Message(200, "Product not found"));
            }
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new Message(404, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Product product = productService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return ResponseEntity.ok(convertToDto(product));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new Message(404, e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ProductDto productDto) {
        try {
            Product savedProduct = productService.save(productDto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(convertToDto(savedProduct));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProductDto productDto) {
        try {
            Product updatedProduct = productService.update(id, productDto)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(convertToDto(updatedProduct));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            productService.delete(id);
            return ResponseEntity.ok()
                    .body(new Message(200, "Product deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new Message(404, e.getMessage()));
        }
    }

    private ProductDto convertToDto(Product product) {
        CategoryDto categoryDto = new CategoryDto(product.getCategory().getName());
        return new ProductDto(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                categoryDto
        );
    }
}
