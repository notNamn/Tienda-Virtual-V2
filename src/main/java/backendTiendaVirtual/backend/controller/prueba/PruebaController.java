package backendTiendaVirtual.backend.controller.prueba;

import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Seller;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.SellerRepository;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/prueba")
@AllArgsConstructor
public class PruebaController {
    private UserRepository userRepository;
    private SellerRepository sellerRepository;


    @GetMapping("/seller")
    public List<Seller> findAllSeller() {

        return sellerRepository.findAll();
    }


    @GetMapping("/user")
    public List<User> findAllUser() {

        return userRepository.findAll();
    }

    @GetMapping("/error")
    public Object error() {

        return Message.builder()
                .message("Error")
                .status(123)
                .details("sfd")
                .build();
    }
}
