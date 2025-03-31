package backendTiendaVirtual.backend.service;

import backendTiendaVirtual.backend.dto.CustomerDto;
import backendTiendaVirtual.backend.persitence.entity.Customer;
import backendTiendaVirtual.backend.service.common.CRUDCommonService;

public interface ICustomerService extends CRUDCommonService<Customer, CustomerDto> {

    void deleteByCarnet(Integer carnet);
}
