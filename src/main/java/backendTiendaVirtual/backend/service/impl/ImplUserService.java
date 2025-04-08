package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.UserDto;
import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import backendTiendaVirtual.backend.security.jwt.IJwtProvider;
import backendTiendaVirtual.backend.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImplUserService implements IUserService  {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private IJwtProvider jwtProvider;

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

    @Override
    public void changeRole(String username, Role role) {
        try{
            Optional<User> userExist = userRepository.findByUsername(username);
            if (!userExist.isPresent()){
                throw new UsernameNotFoundException("User not found");
            }
            userExist.get().setRole(role);
            userRepository.save(userExist.get());

        }catch (Exception e){
            throw new RuntimeException("ERROR USER NOT FOUND" + username + e.getMessage());
        }
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
                .password(passwordEncoder.encode(entityDTO.getPassword()))
                .role(Role.SELLER)
                .build();
        User userCreate = userRepository.save(newUser);
        String jwt = jwtProvider.generateToken(userCreate);
        userCreate.setToken(jwt);
        return userCreate;
    }

}
