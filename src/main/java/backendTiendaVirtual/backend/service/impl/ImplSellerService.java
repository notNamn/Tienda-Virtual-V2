package backendTiendaVirtual.backend.service.impl;

import backendTiendaVirtual.backend.dto.SellerDto;
import backendTiendaVirtual.backend.persitence.entity.Seller;
import backendTiendaVirtual.backend.persitence.entity.auth.Role;
import backendTiendaVirtual.backend.persitence.entity.auth.User;
import backendTiendaVirtual.backend.persitence.repository.SellerRepository;
import backendTiendaVirtual.backend.persitence.repository.UserRepository;
import backendTiendaVirtual.backend.service.ISellerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImplSellerService implements ISellerService {

    private SellerRepository sellerRepository;
    private UserRepository userRepository;


    @Override
    public List<Seller> findAll() {
        return sellerRepository.findAll();
    }

    @Override
    @Transactional // crear un vendedor por el login
    public Seller save(SellerDto entityDTO) {

        User user = new User();
        user.setUsername(entityDTO.getUser().getUsername());
        user.setPassword(entityDTO.getUser().getPassword());
        user.setRole(Role.SELLER);

        Seller newSeller = new Seller();
        newSeller.setUser(userRepository.save(user));
        newSeller.setFirstName(entityDTO.getFirstName());
        newSeller.setLastName(entityDTO.getLastName());
        newSeller.setShopAddress(entityDTO.getShopAddress());
        newSeller.setCarnet(entityDTO.getCarnet());
        newSeller.setPhoneNumber(entityDTO.getPhoneNumber());
        return sellerRepository.save(newSeller);
    }

    @Override
    public Optional<Seller> findByCarnet(Integer carnet) {
        Optional<Seller> seller = sellerRepository.findByCarnet(carnet);
        if (!seller.isPresent()) {
            throw new RuntimeException("Seller not found");
        }
        return seller;
    }
}
