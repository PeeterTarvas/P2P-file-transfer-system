package com.server.iot.server.file;


import com.server.iot.server.address.AddressDbo;
import com.server.iot.server.address.AddressRepository;
import com.server.iot.server.mapper.MapperService;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Validated
@AllArgsConstructor
@Service
public class FileService {

    private MapperService mapperService;
    private FileRepository fileRepository;
    private FileAvailabilityRepository fileAvailabilityRepository;
    private UserRepository userRepository;
    private AddressRepository addressRepository;


    @Transactional
    public void addFileToUser(@NotBlank String username, @Valid FileDto fileDto) {
        FileDbo fileDbo = mapperService.convertToFileDbo(fileDto);
        Long fileId = createAndReturnFileId(fileDbo);
        fileDbo.setId(fileId);
        Optional<UserDbo> userDbo = userRepository.getUserDboByUsername(username);
        if (userDbo.isPresent()) {
            FileAvailabilityDbo fileAvailabilityDbo = mapperService.fileAvailabilityDbo(fileDbo, userDbo.get().getUserId());
            fileAvailabilityRepository.save(fileAvailabilityDbo);
        }

    }


    public List<FileAvaliablilityDto> getFileAvaliablilityDtoByFilename(@NotBlank String filename) {
        List<FileAvaliablilityDto> fileAvaliablilityDtos = new ArrayList<>();
        List<FileDbo> fileDbo = fileRepository.findAllByName(filename);
        for (FileDbo file : fileDbo) {
            List<FileAvailabilityDbo> findAllByFileId = fileAvailabilityRepository.findAllByFileId(file.getId());
            for (FileAvailabilityDbo fileAvailability : findAllByFileId) {
                UserDbo userDbo = userRepository.getUserDboByUserId(fileAvailability.getUserId());
                List<AddressDbo> addressDbo = addressRepository.getAddressByUserIds(List.of(userDbo.getUserId()));
                AddressDbo address = addressDbo.getFirst();
                FileAvaliablilityDto fileAvaliablilityDto = new FileAvaliablilityDto(userDbo.getUsername(), address.getIp(), address.getPort());
                fileAvaliablilityDtos.add(fileAvaliablilityDto);

            }
        }
        return fileAvaliablilityDtos;
    }


    private Long createAndReturnFileId(FileDbo fileDbo) {
        FileDbo savedFile = fileRepository.saveAndFlush(fileDbo);
        return savedFile.getId();
    }

}
