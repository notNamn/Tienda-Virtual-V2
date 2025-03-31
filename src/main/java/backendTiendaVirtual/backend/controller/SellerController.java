package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.controller.common.CrudController;
import backendTiendaVirtual.backend.dto.SellerDto;
import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.Seller;
import backendTiendaVirtual.backend.service.ISellerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/seller")
@AllArgsConstructor
public class SellerController implements CrudController<SellerDto> {
    private ISellerService sellerService;

    @GetMapping
    @Override
    public ResponseEntity<?> findAll() {

        List<SellerDto> sellers = sellerService.findAll()
                .stream()
                .map(SellerDto::converterToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(sellers);
    }

    @PostMapping
    @Override
    public ResponseEntity<?> save(@RequestBody SellerDto entityDTO) {
        try {
            Seller seller = sellerService.save(entityDTO);
            return ResponseEntity.ok().body(SellerDto.converterToDto(seller));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, e.getMessage()));
        }
    }
}
