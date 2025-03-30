package backendTiendaVirtual.backend.persitence.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sub_total")
    private Double subTotal;

    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetaill> orderDetaills;
}
