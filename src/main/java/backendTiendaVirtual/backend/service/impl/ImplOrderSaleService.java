package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.persitence.entity.*;
import backendTiendaVirtual.backend.persitence.repository.*;
import backendTiendaVirtual.backend.service.IOrderSaleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ImplOrderSaleService implements IOrderSaleService {

    private ProductRepository productRepository;
    private OrderRepository orderRepository;
    private OrderDetaillRepository orderDetaillRepository;
    private CustomerRepository customerRepository;
    private SellerRepository sellerRepository;
    private SaleRepository saleRepository;

    @Override
    public Order createOrder() {
        Order order = new Order();
        order.setTotalOrder(0.0);
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public Order addProductToOrder(Long orderId, Long productId, Integer quantity) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (quantity<0) {
            throw new RuntimeException("the quantity is negative");
        }else {
            if (product.getStock() < quantity || product.getStock() <= 0) {
                throw new RuntimeException("Product out of stock, not stock enough");
            }
        }
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        OrderDetaill newOrderDetaill = new OrderDetaill();
        newOrderDetaill.setProduct(product);
        newOrderDetaill.setQuantity(quantity);
        newOrderDetaill.calculateSubTotal();
        newOrderDetaill.setOrder(order);  // ASIGNACIÓN DE LA ORDEN

        order.getOrderDetails()
                .add(orderDetaillRepository.save(newOrderDetaill));
        order.setTotalOrder(calculateTotalOrder(order));

        return orderRepository.save(order);
    }

    /**
     * creo que deberia de haber puesto UPDATEQUANTITYTOPRODUCT
     * recordar cambiar si es necesario!!!
     * @param OrderId Long
     * @param productId Long
     * @param quantity Integer
     * @return Order
     */
    @Override
    @Transactional
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
        Product product = orderDetaill.getProduct();
        product.setStock(product.getStock() + quantity);
        productRepository.save(product); // ACTUALIZAR STOCK

        order.getOrderDetails().remove(orderDetaill);
        order.setTotalOrder(calculateTotalOrder(order));

        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(()-> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }

    @Override
    @Transactional
    public Sale processOrder(Long orderId, Integer carnetSeller,
                             CustomerDto customerDto, Double IGV) {
        Customer customer = customerRepository
                .save(CustomerDto.converterToEntity(customerDto));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(()-> new RuntimeException("Order not found"));

        Seller seller =sellerRepository.findByCarnet(carnetSeller)
                .orElseThrow(()-> new RuntimeException("Seller not found"));

        Sale invoice = new Sale();
        invoice.setSeller(seller);
        invoice.setCustomer(customer);
        invoice.setOrder(order);
        invoice.setIGV(IGV);
        invoice.setTotal(calculateTotalOrder(order)*(1+IGV));
        return saleRepository.save(invoice);
    }
}
