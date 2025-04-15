package backendTiendaVirtual.backend.security;

import backendTiendaVirtual.backend.security.jwt.IJwtProvider;
import backendTiendaVirtual.backend.security.jwt.ImplJwtProvider;
import backendTiendaVirtual.backend.security.jwt.JwtAuthorizationFilter;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authorization.method.PrePostTemplateDefaults;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
@AllArgsConstructor
public class ConfigSecurity {
    private static final Logger logger = LoggerFactory.getLogger(ConfigSecurity.class);

    private final CustomUserDetailService customUserDetailService;
    private final PasswordEncoder passwordEncoder;
    private final IJwtProvider jwtProvider;

    // Define las rutas públicas como una constante o una lista
    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/authentication/sign-in",
            "/api/authentication/sign-up",
            "/product/**",
            "/category/**"
    );

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter() throws Exception {
        // Pasa el proveedor JWT y la lista de rutas públicas al constructor del filtro
        return new JwtAuthorizationFilter(jwtProvider, PUBLIC_PATHS);
    }

    @Bean // activa las metaanotaciones
    public PrePostTemplateDefaults prePostTemplateDefaults() {
        return new PrePostTemplateDefaults();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder);
        AuthenticationManager authenticationManager = auth.build();

        http.csrf(csrf -> csrf.disable())
                //.cors(cors -> cors.disable())
                // *** CAMBIO CLAVE: Habilita CORS usando la configuración por defecto (que buscará tu WebConfig) ***
                .cors(Customizer.withDefaults())// ACTIVA LOS BEARER TOKEN DEL FRONEND
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authHttp -> {
                    logger.info("INICIANDO CONFIGURACION DE SEGURIDAD");
                    // *** RECOMENDADO: Permite explícitamente las solicitudes OPTIONS ***
                    // Esto asegura que las solicitudes preflight de CORS no sean bloqueadas por la seguridad
                    authHttp.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll(); // Permite las opciones CORS

                    String[] publicPathsArray = PUBLIC_PATHS.toArray(new String[0]);
                    authHttp.requestMatchers(publicPathsArray).permitAll();

                    authHttp.anyRequest().authenticated();
                    logger.info("REGLAS DE AUTORIZACIÓN CONFIGURADAS");
                })
                .authenticationManager(authenticationManager);

        // Añade tu filtro JWT personalizado ANTES del filtro estándar de autenticación por usuario/contraseña
        http.addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        logger.info("CONFIGURACION DE SEGURIDAD COMPLETADA");
        return http.build();
    }
}