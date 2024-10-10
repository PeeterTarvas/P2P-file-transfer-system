package com.server.iot.server.address;

import com.server.iot.server.mapper.MapperService;
import com.server.iot.server.user.dtos.LoginRequestDto;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AddressService {


    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final MapperService mapperService;


    @Transactional
    public void saveUserIp(LoginRequestDto loginRequestDto) throws ChangeSetPersister.NotFoundException {
        Optional<UserDbo> user = userRepository.getUserDboByUsername(loginRequestDto.getUsername());
        if (user.isPresent()) {
            UserDbo userDbo = user.get();
            AddressDbo addressDbo = mapperService.convertToAddressDbo(loginRequestDto, userDbo);
            addressRepository.saveAndFlush(addressDbo);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @Transactional
    public List<AddressDbo> getAddressByUsername(List<Long> userIds) throws ChangeSetPersister.NotFoundException {
        return addressRepository.getAddressByUserIds(userIds);
    }





}
