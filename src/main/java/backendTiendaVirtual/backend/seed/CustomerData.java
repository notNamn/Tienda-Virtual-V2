package backendTiendaVirtual.backend.seed;

import backendTiendaVirtual.backend.persitence.entity.Customer;
import backendTiendaVirtual.backend.persitence.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class CustomerData implements CommandLineRunner {
    private CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {
        // Hibernate: insert into customers (carnet,first_name,last_name,phone_number) values (?,?,?,?)
        Customer customer = new Customer();
        customer.setCarnet(12345678);
        customer.setFirstName("Pedro");
        customer.setLastName("Perez");
        customer.setPhoneNumber(1341342);

        Customer customer2 = new Customer();
        customer2.setCarnet(45345545);
        customer2.setFirstName("Maria");
        customer2.setLastName("Perez");
        customer2.setPhoneNumber(2141443545);

        customerRepository.saveAll(List.of(customer, customer2));
    }
}
