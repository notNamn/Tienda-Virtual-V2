package backendTiendaVirtual.backend.controller.test;

import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.persitence.entity.Order;
import backendTiendaVirtual.backend.persitence.entity.Seller;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.SellerRepository;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import backendTiendaVirtual.backend.service.impl.ImplOrderInvoiceService;
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

    private ImplOrderInvoiceService orderInvoiceService;

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

    @GetMapping("/invoice")
    public Object invoice() {
        CustomerDto customerDto = new
                CustomerDto("John", "Doe",
                12345678, 12345678);

       Order order = orderInvoiceService.createOrder();
       Order carritoOrder = orderInvoiceService
               .addProductToOrder(order.getId(), 1L, 1);
       carritoOrder = orderInvoiceService
               .addProductToOrder(order.getId(), 2L, 2);
       carritoOrder = orderInvoiceService
               .addProductToOrder(order.getId(), 3L, 3);
       carritoOrder = orderInvoiceService
               .addProductToOrder(order.getId(), 4L, 4);

        Invoice invoice = orderInvoiceService
        .processOrder(carritoOrder.getId(), 12345678, customerDto, 0.18);

        return invoice;
    }

}
