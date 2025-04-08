package backendTiendaVirtual.backend.security;

import backendTiendaVirtual.backend.persitence.entity.auth.Role; // Importar Role
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.security.model.UserPrincipal;
import backendTiendaVirtual.backend.security.utils.SecurityUtils;
import backendTiendaVirtual.backend.service.IUserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger; // Importar Logger
import org.slf4j.LoggerFactory; // Importar LoggerFactory
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // Para autoridad por defecto
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

@Service
@AllArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private IUserService userService;
    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        logger.info("Cargando detalles de usuario: {}", user);
        Set<GrantedAuthority> authorities;

        if (user.getRole() == null) {
            logger.warn("¡El usuario '{}' no tiene un rol asignado en la base de datos! Asignando autoridades vacías.", username);
            // Opción A: Asignar autoridades vacías (el usuario no tendrá roles)
            authorities = Collections.emptySet();
            // Opción B: Asignar un rol/autoridad por defecto (si aplica a tu lógica)
            // authorities = Set.of(new SimpleGrantedAuthority("ROLE_DEFAULT")); // O el rol que definas
            // Opción C: Lanzar una excepción si un rol es estrictamente necesario
            // throw new IllegalStateException("El usuario '" + username + "' debe tener un rol asignado.");
        } else {
            // Si el rol no es nulo, crea la autoridad normalmente
            authorities = Set.of(SecurityUtils.converToAuthority(user.getRole().name()));
        }

        // Asegúrate de que SecurityUtils.converToAuthority añade "ROLE_" si no existe.
        return UserPrincipal.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword()) // La contraseña hasheada de la BD
                .authorities(authorities)
                .user(user)
                .build();
    }
}
