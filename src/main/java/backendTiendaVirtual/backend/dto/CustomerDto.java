package backendTiendaVirtual.backend.dto;

import backendTiendaVirtual.backend.persitence.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
    private String firstName;

    private String lastName;

    private Integer phoneNumber;
    private Integer carnet;


    public static CustomerDto converterToDto(Customer customer) {
        return new CustomerDto(
                customer.getFirstName(),
                customer.getLastName(),
                customer.getPhoneNumber(),
                customer.getCarnet()
        );
    }
}
