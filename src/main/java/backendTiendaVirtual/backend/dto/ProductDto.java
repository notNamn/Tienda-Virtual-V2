package backendTiendaVirtual.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private String title;
    private String description;
    private Double price;
    private Integer stock;
    private String imageUrl;
    private CategoryDto category;
}
