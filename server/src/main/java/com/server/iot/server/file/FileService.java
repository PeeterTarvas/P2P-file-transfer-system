package com.server.iot.server.file;

import com.server.iot.server.mapper.MapperService;
import com.server.iot.server.user.UserDbo;
import com.server.iot.server.user.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.sql.Timestamp;
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


    @Transactional
    public void addFileToUser(@NotBlank String peerId, @Valid FileDto fileDto, Long groupId) {
        FileDbo fileDbo = mapperService.convertToFileDbo(fileDto);
        Long fileId = createAndReturnFileId(fileDbo);
        fileDbo.setId(fileId);
        Optional<UserDbo> userDbo = userRepository.getUserDboByPeerId(peerId);
        if (userDbo.isPresent()) {
            FileAvailabilityDbo fileAvailabilityDbo = mapperService.fileAvailabilityDbo(fileDbo, userDbo.get().getUserId(), groupId);
            fileAvailabilityRepository.save(fileAvailabilityDbo);
        }

    }


    public List<FileAvaliablilityDto> getFileAvailabilityDtoByFilename(@NotBlank String filename) {
        List<FileAvaliablilityDto> fileAvaliablilityDtos = new ArrayList<>();
        List<FileDbo> fileDbo = fileRepository.findAllByName(filename);
        for (FileDbo file : fileDbo) {
            List<FileAvailabilityDbo> findAllByFileId = fileAvailabilityRepository.findAllByFileId(file.getId());
            for (FileAvailabilityDbo fileAvailability : findAllByFileId) {
                UserDbo userDbo = userRepository.getUserDboByUserId(fileAvailability.getUserId());
                FileAvaliablilityDto fileAvaliablilityDto = new FileAvaliablilityDto(userDbo.getUsername(), file.getName(), userDbo.getPeerId());
                fileAvaliablilityDtos.add(fileAvaliablilityDto);
            }
        }
        return fileAvaliablilityDtos;
    }


    private Long createAndReturnFileId(FileDbo fileDbo) {
        FileDbo savedFile = fileRepository.saveAndFlush(fileDbo);
        return savedFile.getId();
    }

    public List<FileHistoryDto> getFileDetailsByGroupId(Long groupId) {
        List<Object[]> rawResults = fileAvailabilityRepository.getFileHistoryByGroupId(groupId);

        return rawResults.stream().map(row -> new FileHistoryDto(
                (String) row[0], // username
                (String) row[1], // fileName
                ((Number) row[2]).longValue(), // fileSize
                ((Timestamp) row[3]).toLocalDateTime() // addedTimestamp
        )).toList();
    }

}
