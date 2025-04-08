package backendTiendaVirtual.backend.dto;

import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String username;

    private String password;

    private String role;

    private String token;

    public static UserDto converterToDto(User user) {
        return UserDto.builder()
                .username(user.getUsername())
                .role(user.getRole().name())
                .token(user.getToken())
                .build();
    }

    public static User converterToEntity(UserDto userDto) {
        return User.builder()
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .role(Role.valueOf(userDto.getRole()))
                .build();
    }
}
