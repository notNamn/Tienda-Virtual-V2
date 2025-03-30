package backendTiendaVirtual.backend.exeption;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Message {
    private Integer status;
    private String message;
    private LocalDateTime timestamp;

    public Message(Integer status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
