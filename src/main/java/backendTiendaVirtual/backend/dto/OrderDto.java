package backendTiendaVirtual.backend.dto;

import backendTiendaVirtual.backend.persitence.entity.Order;
import backendTiendaVirtual.backend.persitence.entity.OrderDetaill;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Long id;

    private List<OrderDetaill> orderDetails = new ArrayList<>();

    @JsonProperty("count_products")
    private Double countProducts(){
        return orderDetails
                .stream()
                .mapToDouble(orderDetails -> orderDetails.getQuantity())
                .sum();
    }

    public static OrderDto convertToDto(Order order) {
        return new OrderDto(order.getId(), order.getOrderDetails());
    }
}