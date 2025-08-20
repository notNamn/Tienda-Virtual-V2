package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import backendTiendaVirtual.backend.security.jwt.IJwtProvider;
import backendTiendaVirtual.backend.security.model.UserPrincipal;
import backendTiendaVirtual.backend.security.utils.SecurityUtils;
import backendTiendaVirtual.backend.service.IAuthenticationService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class ImplAuthenticationService implements IAuthenticationService {
    private AuthenticationManager authenticationManager;
    private IJwtProvider jwtProvider;

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(ImplAuthenticationService.class);

    @Override
    public User signInAndReturnJwt(User signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtProvider.generateToken(userPrincipal);
        User sigInUser = userPrincipal.getUser();
        sigInUser.setToken(token);
        // retorna el
        return sigInUser;
    }

    @Override
    public String signUpAuthentication(UserDto userDto) {
        try{
            if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
                logger.info("EL USUARIO YA EXISTE: {} ", userDto.getUsername() );
                return null;
            }

            User user = User.builder()
                    .username(userDto.getUsername())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .role(Role.SELLER)
                    .build();
            User newUserAccount = userRepository.save(user);
            return jwtProvider.generateToken(newUserAccount);
        }catch (Exception e) {
            logger.error("OCURRIO UN ERROR AL CREA UN USUARIO: {} ", e.getMessage());
            throw new RuntimeException("ERROR CREATE USER NOT FOUND" + userDto.getUsername() + e.getMessage());
        }
    }

    @Override
    public String authenticationSignIn(UserDto userDto) {
        try {
            User user = userRepository.findByUsername(userDto.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

            if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
                throw new BadCredentialsException("Contraseña incorrecta");
            }

            List<String> roles = Arrays.asList(user.getRole().name());
            UserPrincipal principal = UserPrincipal.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .authorities(SecurityUtils.convertToAuthorities(roles))
                    .build();

            String jwtToken = jwtProvider.generateToken(principal); // Genera el token
            return jwtToken;
        }catch (BadCredentialsException e) {
            return null;
        }
    }
}
