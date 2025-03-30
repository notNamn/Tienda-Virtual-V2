package backendTiendaVirtual.backend.controller;

import backendTiendaVirtual.backend.controller.common.CrudController;
import backendTiendaVirtual.backend.dto.CategoryDto;
import backendTiendaVirtual.backend.exeption.Message;
import backendTiendaVirtual.backend.service.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class CategoryController implements CrudController<CategoryDto> {

    private ICategoryService categoryService;

    @GetMapping
    @Override
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(categoryService.findAll());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> findByName(@PathVariable String name) {
        try {
            return ResponseEntity.ok().body(categoryService.findByName(name));
        }catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new Message(400, e.getMessage()));
        }
    }
}
