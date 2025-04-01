package backendTiendaVirtual.backend.service.common;

import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.persitence.entity.Order;

/**
 *
 * @param <S> sale or invoice
 */
public interface CarrToOrderService<S> {

    Order createOrder();

    Order addProductToOrder(Long OrderId, Long productId, Integer quantity);

    Order removeProductToOrder(Long OrderId, Long productId, Integer quantity);

    void deleteOrder(Long orderId);

    S processOrder(Long orderId, Integer carnetSeller,
                   CustomerDto customerDto, Double IGV);

    default double calculateTotalOrder(Order order) {
        double total = order.getOrderDetails()
                .stream()
                .mapToDouble(orderDetails -> orderDetails.getSubTotal())
                .sum();
        return total ;
    }
}

