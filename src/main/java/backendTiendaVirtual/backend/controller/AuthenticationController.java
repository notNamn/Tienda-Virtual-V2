package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.service.IAuthenticationService;
import backendTiendaVirtual.backend.service.IUserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authentication")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {
    private IAuthenticationService authenticationService;
    private IUserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    //crear usuario
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody UserDto user) {
        try {
            logger.info("USER DATA /sign-up: {} ", user);
            String jwtToken = authenticationService.signUpAuthentication(user);
            if (jwtToken == null){
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(new Message(200, "El usuario ya existe"));
            }
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new Message(201, "Usuario creado correctamente", jwtToken ));
        }catch (BadCredentialsException e){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new Message(401, "Login incorrecto",e.getMessage()));
        }
    }

    //inciar session
    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody UserDto userDto) {
        try {
            logger.info("USER DATA /sign-in: {} ", userDto);
            String jwtToken = authenticationService.authenticationSignIn(userDto);
            if (jwtToken == null) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new Message(401, "Login incorrecto"));
            }
            return ResponseEntity
                    .ok(new Message(200, "Login correcto", jwtToken));
        }catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new Message(401, "Login incorrecto",e.getMessage()));
        }
    }
}
