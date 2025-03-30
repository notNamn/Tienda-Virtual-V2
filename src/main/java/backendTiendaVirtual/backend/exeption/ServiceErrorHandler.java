package backendTiendaVirtual.backend.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ServiceErrorHandler extends RuntimeException {
    public ServiceErrorHandler() {
        super();
    }

    public ServiceErrorHandler(String message) {
        super(message);
    }

    public ServiceErrorHandler(String message, Throwable cause) {
        super(message, cause);
    }
}
