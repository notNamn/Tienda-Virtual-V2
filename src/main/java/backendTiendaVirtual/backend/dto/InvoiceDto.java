package backendTiendaVirtual.backend.dto;

import backendTiendaVirtual.backend.persitence.entity.Invoice;
import backendTiendaVirtual.backend.persitence.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDto {
    private Long id;
    private OrderDto order;

    private Double subtotal;
    private Double IGV;
    private Double total;

    private LocalDateTime createdAt;

    private SellerDto seller;
    private CustomerDto customer;

    public static InvoiceDto converterToDto(Invoice invoice) {
        SellerDto sellerDto = SellerDto.converterToDto(invoice.getSeller());
        CustomerDto customerDto = CustomerDto.converterToDto(invoice.getCustomer());
        OrderDto orderDto = OrderDto.convertToDto(invoice.getOrder());
        return new InvoiceDto(
                invoice.getId(),
                orderDto,
                invoice.getSubtotal(),
                invoice.getIGV(),
                invoice.getTotal(),
                invoice.getCreatedAt(),
                sellerDto,
                customerDto
        );
    }
}
