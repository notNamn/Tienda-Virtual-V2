package backendTiendaVirtual.backend.seed;

import backendTiendaVirtual.backend.persitence.entity.Category;
import backendTiendaVirtual.backend.persitence.entity.Product;
import backendTiendaVirtual.backend.persitence.repository.CategoryRepository;
import backendTiendaVirtual.backend.persitence.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

//@Component
@AllArgsConstructor
public class ProductDataSeed implements CommandLineRunner {

    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        Category tecnologia = new Category();
        tecnologia.setName("Tecnologia");

        Category videojuegos = new Category();
        videojuegos.setName("Videojuegos");
        // Hibernate: insert into categories (name) values (?)
        // Hibernate: insert into products (category_id,description,image_url,price,stock,title) values (?,?,?,?,?,?)
        Product product1 = new Product();
        product1.setTitle("Iphone 14");
        product1.setDescription("Iphone 14 Pro Max");
        product1.setPrice(1000.0);
        product1.setStock(10);
        product1.setImageUrl("https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
        product1.setCategory(tecnologia);

        Product product2 = new Product();
        product2.setTitle("Playstation 5");
        product2.setDescription("Playstation 5");
        product2.setPrice(1000.0);
        product2.setStock(10);
        product2.setImageUrl("https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
        product2.setCategory(videojuegos);

        categoryRepository.saveAll(List.of(tecnologia, videojuegos));
        productRepository.saveAll(List.of(product1, product2));
    }


}
