package backendTiendaVirtual.backend.persitence.entity;

import backendTiendaVirtual.backend.persitence.entity.auth.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sellers")
@Builder
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "shop_address", nullable = false)
    private String shopAddress;

    @Column(nullable = false, unique = true)
    private Integer carnet;

    @Column(name = "phone_number", nullable = false, unique = true)
    private Integer phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
