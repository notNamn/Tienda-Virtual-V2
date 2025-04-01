package backendTiendaVirtual.backend.persitence.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Esclavo :  1(order) - N (orderDetaill)
 * es como item del carrito
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_details")
public class OrderDetaill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;

    @Column(name = "sub_total")
    private Double subTotal;

    // Esclavo :  1(order) - N (orderDetaill)
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @PrePersist // antes de guardar
    @PreUpdate // actualizar
    public void calculateSubTotal() {
        if (this.product != null && this.product.getPrice() != null && this.quantity != null) {
            this.subTotal = this.product.getPrice() * this.quantity;
        } else {
            this.subTotal = 0.0;
        }
    }
}
