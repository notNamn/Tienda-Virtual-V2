package backendTiendaVirtual.backend.security.jwt;

import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.security.model.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface IJwtProvider {
    String generateToken(UserPrincipal auth);

    String generateToken(User user);

    Authentication getAuthentication(HttpServletRequest request);

    boolean isTokenValid(HttpServletRequest request);
}
