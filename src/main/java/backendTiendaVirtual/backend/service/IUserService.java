package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.service.common.CRUDCommonService;

import java.util.Optional;

public interface IUserService extends CRUDCommonService<User, UserDto> {

    Optional<User> findByUsername(String username);
}
