package backendTiendaVirtual.backend.security.jwt;

import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.security.model.UserPrincipal;
import backendTiendaVirtual.backend.security.utils.JwtUtils;
import backendTiendaVirtual.backend.security.utils.SecurityUtils;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ImplJwtProvider implements IJwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(ImplJwtProvider.class); // Logger

    @Value("${app.jwt.secret}")
    private String JWT_SECRET;
    @Value("${app.jwt.expiration_time}")
    private Long JWT_EXPIRATION_TIME;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public String generateToken(UserPrincipal auth) {
        String authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Key key = getSigningKey();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(auth.getUsername())
                .claim("roles", authorities)
                .claim("userId", auth.getId())
                // .claim("mensaje", "Bienvenido")
                .setIssuedAt(now) // fecha actual
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String generateToken(User user) {
        Key key = getSigningKey();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION_TIME);
        String authorities = user.getRole().name(); // Asume un solo rol

        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("roles", authorities)
                .claim("userId", user.getId())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public Authentication getAuthentication(HttpServletRequest request) {
        Claims claims = extractClaims(request);
        if (claims == null) {
            logger.debug("No se pudieron extraer claims del token.");
            return null;
        }

        String username = claims.getSubject();
        if (username == null) {
            logger.warn("Username no encontrado en los claims del JWT.");
            return null;
        }

        Long userId = claims.get("userId", Long.class);
        String rolesClaim = claims.get("roles", String.class);
        if (rolesClaim == null || rolesClaim.trim().isEmpty()) {
            logger.warn("Claim 'roles' está vacío o no existe en el JWT para el usuario: {}", username);
            rolesClaim = ""; // Puedes asignar un valor predeterminado o manejarlo de otra manera
        }
        if (userId == null) {
            logger.warn("Claim 'userId' no encontrada en el JWT para el usuario: {}", username);
            return null;
        }

        Set<GrantedAuthority> authorities = Arrays.stream(rolesClaim.split(","))
                .map(String::trim)
                .filter(role -> !role.isEmpty()) // Evitar roles vacíos si hay comas extra
                .map(SecurityUtils::converToAuthority)
                .collect(Collectors.toSet());

        UserDetails userDetails = UserPrincipal.builder()
                .id(userId)
                .username(username)
                .authorities(authorities)
                // No necesitas la contraseña aquí para la autenticación basada en token
                .build();

        // Retorna el objeto Authentication
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public boolean isTokenValid(HttpServletRequest request) {
        try {
            Claims claims = extractClaims(request);
            return claims != null;
        } catch (ExpiredJwtException e) {
            logger.warn("Token JWT expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.warn("Token JWT no soportado: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.warn("Token JWT mal formado: {}", e.getMessage());
        } catch (SignatureException e) {
            logger.error("Fallo en la firma del token JWT: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("Argumento ilegal o claims JWT vacíos: {}", e.getMessage());
        } catch (Exception e) { // Captura genérica por si acaso
            logger.error("Error inesperado al validar el token JWT: {}", e.getMessage());
        }
        return false;
    }

    private Claims extractClaims(HttpServletRequest request) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, SignatureException, IllegalArgumentException {
        String token = JwtUtils.extractTokenFromRequest(request);
        if (token == null) {
            logger.debug("No se encontró token JWT en la cabecera 'Authorization' al intentar extraer claims.");
            return null;
        }

        try {
            Key key = getSigningKey();
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }
        catch (Exception e) {
            logger.error("Error inesperado al extraer claims del token: {}", e.getMessage(), e);
            throw new MalformedJwtException("Error al parsear token", e);
        }
    }
}
