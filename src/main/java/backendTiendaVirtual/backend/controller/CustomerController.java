package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.controller.common.CrudController;
import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Customer;
import backendTiendaVirtual.backend.security.annotation.SellerPermission;
import backendTiendaVirtual.backend.service.ICustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customer")
@AllArgsConstructor
public class CustomerController implements CrudController<CustomerDto> {

    private ICustomerService customerService;

    @GetMapping
    @SellerPermission
    @Override
    public ResponseEntity<?> findAll() {
        List<CustomerDto> customers = customerService.findAll()
                .stream()
                .map(CustomerDto::converterToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(customers);
    }

    @PostMapping
    @SellerPermission
    @Override
    public ResponseEntity<?> save(@RequestBody CustomerDto entityDTO) {
        try{
            Customer customer = customerService.save(entityDTO);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(CustomerDto.converterToDto(customer));
        }catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Message.builder()
                            .status(404)
                            .message("Product not save")
                            .details(e.getMessage())
                            .build()
                    );
        }
    }
}
