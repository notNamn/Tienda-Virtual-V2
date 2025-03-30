package backendTiendaVirtual.backend.service.common;


import java.util.List;
import java.util.Optional;


/**
 * CRUD generico
 * @param <E> entidad
 * @param <D> entidadDTO
 */

public interface CRUDCommonService <E, D> {

    List<E> findAll();

   default  Optional<E> findById(Long id){
       return null;
   }

   default E save(D entityDTO){
       return null;
   }

   default Optional<E> update(Long id, D entityDTO){
       return null;
   }

   default void delete(Long id){

   }

}
