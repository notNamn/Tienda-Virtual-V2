package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.persitence.entity.Customer;
import backendTiendaVirtual.backend.persitence.repository.CustomerRepository;
import backendTiendaVirtual.backend.service.ICustomerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImplCustomerService implements ICustomerService {

    private CustomerRepository customerRepository;

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    @Transactional
    public Customer save(CustomerDto entityDTO) {
        Customer customer = new Customer();
        customer.setFirstName(entityDTO.getFirstName());
        customer.setLastName(entityDTO.getLastName());
        customer.setPhoneNumber(entityDTO.getPhoneNumber());
        customer.setCarnet(entityDTO.getCarnet());
        return customerRepository.save(customer);
    }

    @Transactional
    @Override
    public Optional<Customer> update(Long id, CustomerDto entityDTO) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (!customer.isPresent()) {
            throw new RuntimeException("Customer not found");
        }
        customer.get().setFirstName(entityDTO.getFirstName());
        customer.get().setLastName(entityDTO.getLastName());
        customer.get().setPhoneNumber(entityDTO.getPhoneNumber());
        customer.get().setCarnet(entityDTO.getCarnet());
        return Optional.of(customerRepository.save(customer.get()));
    }

    @Override
    @Transactional
    public void deleteByCarnet(Integer carnet) {
        Optional<Customer> customer = customerRepository.findByCarnet(carnet);
        if (!customer.isPresent()) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.delete(customer.get());
    }
}
