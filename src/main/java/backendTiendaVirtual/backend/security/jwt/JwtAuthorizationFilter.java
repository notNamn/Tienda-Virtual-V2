package backendTiendaVirtual.backend.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthorizationFilter.class);
    private final IJwtProvider jwtProvider;
    // Lista para almacenar los patrones de las rutas públicas
    private final List<RequestMatcher> publicMatchers;

    public JwtAuthorizationFilter(IJwtProvider jwtProvider, List<String> publicPaths) {
        this.jwtProvider = jwtProvider;
        this.publicMatchers = publicPaths.stream()
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList());
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            String path = request.getRequestURI();
            logger.info("PROCESANDO SOLICITUD PARA EL PATH: {}", path);

            // Comprueba si la ruta actual coincide con alguna de las rutas públicas configuradas
            boolean isPublicPath = publicMatchers.stream()
                    .anyMatch(matcher -> matcher.matches(request));

            if (isPublicPath) {
                logger.info("RUTA PÚBLICA DETECTADA, OMITIENDO VALIDACIÓN JWT PARA: {}", path);
                // Si es pública, simplemente continúa con la cadena de filtros sin validar JWT
                filterChain.doFilter(request, response);
                return; // Importante salir del método aquí
            }

            // Si no es una ruta pública, procede con la validación del token
            logger.info("RUTA REQUIERE AUTENTICACIÓN, VALIDANDO JWT PARA: {}", path);
            Authentication authentication = jwtProvider.getAuthentication(request);

            if (authentication != null && jwtProvider.isTokenValid(request)) {
                logger.info("TOKEN VÁLIDO PARA EL PATH: {}", path);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                // Si se requiere autenticación pero el token no es válido o no existe
                // El log de error se maneja dentro de getAuthentication o isTokenValid
                // El manejo de la respuesta no autorizada se hará más adelante en la cadena
                // o por el propio Spring Security si no hay autenticación válida.
                // Solo logueamos que no se pudo establecer la autenticación.
                logger.warn("NO SE PUDO ESTABLECER AUTENTICACIÓN PARA EL PATH: {}", path);
            }

            filterChain.doFilter(request, response); // Continúa la cadena de filtros

        } catch (Exception e) {
            // Captura cualquier excepción durante el procesamiento del token (firma inválida, etc.)
            logger.error("ERROR AL PROCESAR EL TOKEN PARA EL PATH {}: {}", request.getRequestURI(), e.getMessage());
            // Limpia el contexto de seguridad en caso de error
            SecurityContextHolder.clearContext();
            // Establece la respuesta como no autorizada
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // Opcionalmente, puedes escribir un mensaje de error en la respuesta
            response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"" + e.getMessage() + "\"}");
            response.setContentType("application/json");
            // No llames a filterChain.doFilter(request, response) aquí para detener el procesamiento
            return;
        }
    }
}