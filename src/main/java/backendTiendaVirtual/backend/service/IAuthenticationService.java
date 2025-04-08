package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.persitence.entity.auth.User;

public interface IAuthenticationService {
    User signInAndReturnJwt(User signInRequest);

    String signUpAuthentication(UserDto userDto);

    String authenticationSignIn(UserDto userDto);
}
