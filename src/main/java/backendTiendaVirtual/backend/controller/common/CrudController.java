package backendTiendaVirtual.backend.controller.common;

/*
 * @param <E> entidad
 * @param <D> entidadDTO
 */

import org.springframework.http.ResponseEntity;

public interface CrudController< D> {
   default ResponseEntity<?> findAll(){
       return null;
   }
   default ResponseEntity<?> findById(Long id){
       return null;
   }
   default ResponseEntity<?> save(D entityDTO){
       return null;
   }
   default ResponseEntity<?> update(Long id, D entityDTO){
       return null;
   }
   default ResponseEntity<?> delete(Long id){
       return null;
   }
}
