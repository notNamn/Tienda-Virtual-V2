package backendTiendaVirtual.backend.seed;

import backendTiendaVirtual.backend.persitence.entity.Seller;
import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.SellerRepository;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class UserDataSeed implements CommandLineRunner {
    private UserRepository userRepository;
    private SellerRepository sellerRepository;
    @Override
    public void run(String... args) throws Exception {
        User userAdmin = User.builder()
                .username("admin")
                .password("admin")
                .role(Role.ADMIN)
                .build();
        // Hibernate: insert into users (password,role,username) values (?,?,?)
        User userSeller = User.builder()
                .username("seller")
                .password("seller")
                .role(Role.SELLER)
                .build();
        User userSeller2 = User.builder()
                .username("qwew")
                .password("seller")
                .role(Role.SELLER)
                .build();
        // Hibernate: insert into sellers (carnet,first_name,last_name,phone_number,shop_address,user_id) values (?,?,?,?,?,?)
        Seller seller1 = Seller.builder()
                .firstName("Pedro")
                .lastName("Perez")
                .shopAddress("Calle 1")
                .carnet(12345678)
                .phoneNumber(12345678)
                .user(userSeller)
                .build();

        Seller seller2 = Seller.builder()
                .firstName("nombre")
                .lastName("nombre")
                .shopAddress("Calle 1")
                .carnet(243323)
                .phoneNumber(134234)
                .user(userAdmin)
                .build();

        Seller seller3 = Seller.builder()
                .firstName("asda")
                .lastName("sadad")
                .shopAddress("Calle 1")
                .carnet(34563)
                .phoneNumber(2342)
                .user(userSeller2)
                .build();

        userRepository.saveAll(List.of(userAdmin, userSeller, userSeller2));
        sellerRepository.saveAll(List.of(seller1, seller2, seller3));
    }
}
