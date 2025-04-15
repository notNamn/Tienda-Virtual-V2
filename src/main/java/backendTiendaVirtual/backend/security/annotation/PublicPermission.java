package backendTiendaVirtual.backend.security.annotation;

import jakarta.annotation.security.PermitAll;
import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@PermitAll
public @interface PublicPermission {
}
