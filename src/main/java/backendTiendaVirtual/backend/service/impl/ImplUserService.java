package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import backendTiendaVirtual.backend.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImplUserService implements IUserService {

    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        Optional<User> userExist = userRepository.findByUsername(username);
        if (!userExist.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return userExist;
    }

    /**
     * CREO QUE YA NO ES NECESARIO ESTE METODO
     * @param entityDTO
     * @return
     */
    @Override
    @Transactional
    public User save(UserDto entityDTO) {
        User newUser = User.builder()
                .username(entityDTO.getUsername())
                .password(entityDTO.getPassword())
                .role(Role.SELLER)
                .build();

        return userRepository.save(newUser);
    }

}
