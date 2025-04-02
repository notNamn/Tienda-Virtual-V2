package backendTiendaVirtual.backend.dto;

import backendTiendaVirtual.backend.persitence.entity.Sale;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDto {
    private Long id;
    private OrderDto order;

    private Double subtotal;
    private Double IGV;
    private Double total;

    private LocalDateTime createdAt;

    private SellerDto seller;
    private CustomerDto customer;

    public static SaleDto converterToDto(Sale sale) {
        SellerDto sellerDto = SellerDto.converterToDto(sale.getSeller());
        CustomerDto customerDto = CustomerDto.converterToDto(sale.getCustomer());
        OrderDto orderDto = OrderDto.convertToDto(sale.getOrder());
        return new SaleDto(
                sale.getId(),
                orderDto,
                sale.getSubtotal(),
                sale.getIGV(),
                sale.getTotal(),
                sale.getCreatedAt(),
                sellerDto,
                customerDto
        );
    }
}
