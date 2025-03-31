package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.controller.common.CrudController;
import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController implements CrudController<UserDto> {
    private IUserService userService;

    @GetMapping
    @Override
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok()
                .body(userService.findAll());
    }

    @PostMapping
    @Override
    public ResponseEntity<?> save(@RequestBody UserDto entityDTO) {
        try{
            User user = userService.save(entityDTO);
            UserDto userDto = UserDto.builder()
                    .username(user.getUsername())
                    .role(user.getRole().name())
                    .build();
            return ResponseEntity.ok().body(userDto);
        }catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new Message(400, e.getMessage()));
        }
    }
}
