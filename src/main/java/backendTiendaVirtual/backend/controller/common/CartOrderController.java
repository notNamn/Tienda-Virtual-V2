package backendTiendaVirtual.backend.controller.common;

import backendTiendaVirtual.backend.dto.CustomerDto;
import org.springframework.http.ResponseEntity;

/**
 * INTERFAS QEU INTEGGRA UN PEDIDO
 */
public interface CartOrderController {

    ResponseEntity<?> createOrder();

    ResponseEntity<?> addProductToOrder(Long orderId, Long productId, Integer quantity);

    ResponseEntity<?> removeProductToOrder(Long orderId, Long productId, Integer quantity);

    ResponseEntity<?> deleteOrder(Long orderId);

    ResponseEntity<?> processOrder(Long orderId, Integer carnetSeller, CustomerDto customerDto, Double IGV);
}
