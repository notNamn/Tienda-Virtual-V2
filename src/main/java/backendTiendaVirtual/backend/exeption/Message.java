package backendTiendaVirtual.backend.exeption;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class Message {
    private Integer status;
    private String message;
    private String details;


    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    public Message(Integer status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public Message(Integer status, String message, String details) {
        this.status = status;
        this.message = message;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }
}
