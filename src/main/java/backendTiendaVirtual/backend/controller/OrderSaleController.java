package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.controller.common.CartOrderController;
import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.dto.OrderDto;
import backendTiendaVirtual.backend.dto.SaleDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Order;
import backendTiendaVirtual.backend.persitence.entity.Sale;
import backendTiendaVirtual.backend.service.IOrderSaleService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order/sale")
@AllArgsConstructor
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderSaleController implements CartOrderController {

    private IOrderSaleService orderSaleService;

    private static final Logger logger = LoggerFactory.getLogger(OrderSaleController.class);

    @GetMapping("/{id}")
    public ResponseEntity<?> findSaleById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(SaleDto.converterToDto(orderSaleService.findById(id).get()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Order not found", e.getMessage()));
        }

    }

    @PostMapping("/create")
    @Override
    public ResponseEntity<?> createOrder() {
        try {
            Order order = orderSaleService.createOrder();
            logger.info("ORDER CREATE {}", order.getId());
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(OrderDto.convertToDto(order));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Order not created", e.getMessage()));
        }
    }


    /**
     * ACTUALIZAR ESTE METODO , CREO Q HAY OTRA MEJOR FORMA
     * la dejaere de tarea para la version v2  :v
     *
     * @param orderId
     * @param productId
     * @param quantity
     * @return
     */
    @PostMapping("/add/{orderId}")
    @Override
    public ResponseEntity<?> addProductToOrder(@PathVariable Long orderId,
                                               @RequestParam Long productId,
                                               @RequestParam Integer quantity) {
        logger.info("ADD ORDER ID {} PRODUCT ID {}  QUANTITY {} ", orderId, productId, quantity);
        try {
            Order order = orderSaleService
                    .addProductToOrder(orderId, productId, quantity);
            return ResponseEntity.ok(OrderDto.convertToDto(order));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Failed to add product to order", e.getMessage()));
        }
    }

    @PutMapping("/remove")
    @Override
    public ResponseEntity<?> removeProductToOrder(@PathVariable Long orderId,
                                                  @RequestParam Long productId,
                                                  @RequestParam Integer quantity) {
        logger.info("REMOVE ORDER ID {} PRODUCT ID {} QUANTITY {} ", orderId, productId, quantity);
        try {
            Order order = orderSaleService
                    .removeProductToOrder(orderId, productId, quantity);
            return ResponseEntity.ok(OrderDto.convertToDto(order));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Failed to remove product from order", e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{orderId}")
    @Override
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        logger.info("DELETE ORDER ID {} ", orderId);
        try {
            orderSaleService
                    .deleteOrder(orderId);
            return ResponseEntity
                    .ok(new Message(200, "Order deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Failed to delete order", e.getMessage()));
        }
    }

    @PostMapping("/process/{orderId}")
    @Override
    public ResponseEntity<?> processOrder(@PathVariable Long orderId,
                                          @RequestParam Integer carnetSeller,
                                          @RequestBody CustomerDto customer,
                                          @RequestParam Double IGV) {
        logger.info("PROCESS ORDER ID {} CARNET SELLER {} CUSTOMER {} IGV {} ", orderId, carnetSeller, customer, IGV);
        try {
            Sale sale = orderSaleService
                    .processOrder(orderId, carnetSeller, customer, IGV);
            return ResponseEntity
                    .ok(SaleDto.converterToDto(sale));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Failed to process order", e.getMessage()));
        }
    }
}
