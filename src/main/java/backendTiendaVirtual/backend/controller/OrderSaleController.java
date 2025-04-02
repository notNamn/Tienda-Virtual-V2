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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order/sale")
@AllArgsConstructor
public class OrderSaleController implements CartOrderController {

    private IOrderSaleService orderSaleService;

    @PostMapping
    @Override
    public ResponseEntity<?> createOrder() {
        try {
            Order order = orderSaleService.createOrder();
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(OrderDto.convertToDto(order));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Order not created", e.getMessage()));
        }
    }

    @PostMapping("/add/{orderId}/product/{productId}/quantity/{quantity}")
    @Override
    public ResponseEntity<?> addProductToOrder(@PathVariable Long orderId,
                                               @PathVariable Long productId,
                                               @PathVariable Integer quantity) {
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

    @PutMapping("/remove/{orderId}/product/{productId}/quantity/{quantity}")
    @Override
    public ResponseEntity<?> removeProductToOrder(@PathVariable Long orderId,
                                                  @PathVariable Long productId,
                                                  @PathVariable Integer quantity) {
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

    @DeleteMapping("/{orderId}")
    @Override
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
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

    @PostMapping("/{orderId}/process")
    @Override
    public ResponseEntity<?> processOrder(@PathVariable Long orderId,
                                          @RequestParam Integer carnetSeller,
                                          @RequestBody CustomerDto customer,
                                          @RequestParam Double IGV) {
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
