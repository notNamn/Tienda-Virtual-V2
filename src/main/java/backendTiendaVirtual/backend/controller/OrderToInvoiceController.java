package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.controller.common.CartOrderController;
import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.dto.InvoiceDto;
import backendTiendaVirtual.backend.dto.OrderDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.persitence.entity.Order;
import backendTiendaVirtual.backend.service.IOrderInvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order/invoice")
@AllArgsConstructor
public class OrderToInvoiceController implements CartOrderController {

    private  IOrderInvoiceService orderInvoiceService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Invoice invoice = orderInvoiceService
                    .findById(id)
                    .orElseThrow(()-> new RuntimeException("Order not found"));
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(InvoiceDto.converterToDto(invoice));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Order not found", e.getMessage()));
        }
    }


    @PostMapping
    @Override
    public ResponseEntity<?> createOrder() {
        try {
            Order order = orderInvoiceService.createOrder();
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(OrderDto.convertToDto(order));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Order not created", e.getMessage()));
        }
    }

    @PostMapping("/add/{orderId}")
    @Override
    public ResponseEntity<?> addProductToOrder(@PathVariable Long orderId,
                                               @RequestParam Long productId,
                                               @RequestParam Integer quantity) {
        try {
            Order order = orderInvoiceService
                    .addProductToOrder(orderId, productId, quantity);
            return ResponseEntity.ok(OrderDto.convertToDto(order));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Failed to add product to order", e.getMessage()));
        }
    }

    @PutMapping("/remove/{orderId}")
    @Override
    public ResponseEntity<?> removeProductToOrder(@PathVariable Long orderId,
                                                  @RequestParam Long productId,
                                                  @RequestParam Integer quantity) {
        try {
            Order order = orderInvoiceService
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
        try {
            orderInvoiceService
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
        try {
            Invoice invoice = orderInvoiceService
                    .processOrder(orderId, carnetSeller, customer, IGV);
            return ResponseEntity
                    .ok(InvoiceDto.converterToDto(invoice));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, "Failed to process order", e.getMessage()));
        }
    }
}
