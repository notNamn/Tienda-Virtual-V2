package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.persitence.entity.*;
import backendTiendaVirtual.backend.persitence.repository.*;
import backendTiendaVirtual.backend.service.IOrderInvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImplOrderInvoiceService implements IOrderInvoiceService {

    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private OrderDetaillRepository orderDetaillRepository;
    private CustomerRepository customerRepository;
    private SellerRepository sellerRepository;
    private InvoiceRepository invoiceRepository;

    @Override
    public Order createOrder() {
        Order order = new Order();
        order.setTotalOrder(0.0);
        return orderRepository.save(order);
    }

    @Override
    public Order addProductToOrder(Long orderId, Long productId, Integer quantity) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        OrderDetaill newOrderDetaill = new OrderDetaill();
        newOrderDetaill.setProduct(product);
        newOrderDetaill.setQuantity(quantity);
        newOrderDetaill.calculateSubTotal();
        newOrderDetaill.setOrder(order);  // ASIGNACIÓN DE LA ORDEN

        OrderDetaill orderDetaillsave = orderDetaillRepository.save(newOrderDetaill);
        order.getOrderDetails().add(orderDetaillsave);
        order.setTotalOrder(calculateTotalOrder(order));

        return orderRepository.save(order);
    }


    @Override
    public Order removeProductToOrder(Long OrderId, Long productId, Integer quantity) {
        Order order = orderRepository.findById(OrderId)
                .orElseThrow(()-> new RuntimeException("Order not found"));

        OrderDetaill orderDetaill = order.getOrderDetails()
                .stream()
                .filter(detaill -> {
                    detaill.setQuantity(detaill.getQuantity() - quantity);
                    detaill.calculateSubTotal();
                    return detaill.getProduct().getId().equals(productId);
                })
                .findFirst()
                .orElseThrow(()-> new RuntimeException("OrderDetaill not found"));

        // Product product = orderDetaill.getProduct();

        order.getOrderDetails().remove(orderDetaill);
        order.setTotalOrder(calculateTotalOrder(order));

        // productRepository.save(product);
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(()-> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }

    @Override
    public Invoice processOrder(Long orderId, Integer carnetSeller,
                                CustomerDto customerDto, Double IGV) {
        Customer customer = customerRepository
                .save(CustomerDto.converterToEntity(customerDto));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(()-> new RuntimeException("Order not found"));

        Seller seller =sellerRepository.findByCarnet(carnetSeller)
                .orElseThrow(()-> new RuntimeException("Seller not found"));

        Invoice invoice = new Invoice();
        invoice.setSeller(seller);
        invoice.setCustomer(customer);
        invoice.setOrder(order);
        invoice.setIGV(IGV);
        invoice.setTotal(calculateTotalOrder(order)*(1+IGV));
        return invoiceRepository.save(invoice);
    }
}
