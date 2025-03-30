package backendTiendaVirtual.backend.persitence.entity;

import backendTiendaVirtual.backend.persitence.entity.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sellers")
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

    @Column(name = "phone_number", nullable = false)
    private Integer phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
