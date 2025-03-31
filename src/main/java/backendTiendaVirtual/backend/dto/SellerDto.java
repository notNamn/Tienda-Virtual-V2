package backendTiendaVirtual.backend.dto;

import backendTiendaVirtual.backend.persitence.entity.Seller;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerDto {
    private String firstName;
    private String lastName;

    private String shopAddress;
    private Integer carnet;
    private Integer phoneNumber;

    private UserDto user;

    public static SellerDto converterToDto(Seller seller) {
        UserDto userDto = UserDto.builder()
                .username(seller.getUser().getUsername())
                .role(seller.getUser().getRole().name())
                .build();
        return new SellerDto(
                seller.getFirstName(),
                seller.getLastName(),
                seller.getShopAddress(),
                seller.getCarnet(),
                seller.getPhoneNumber(),
                userDto
        );
    }
}
