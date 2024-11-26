package com.server.iot.server.file;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    @PostMapping("/user/{peerId}/group/{groupId}")
    public ResponseEntity<Void> addFileToUser(
            @PathVariable("peerId") @NotBlank String peerId,
            @RequestBody @Valid FileDto fileDto,
            @PathVariable("groupId") Long groupId) {
        fileService.addFileToUser(peerId, fileDto, groupId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @GetMapping("/availability/{filename}")
    public ResponseEntity<List<FileAvaliablilityDto>> getFileAvailabilityByFilename(
            @PathVariable("filename") @NotBlank String filename) {
        List<FileAvaliablilityDto> availabilityList = fileService.getFileAvailabilityDtoByFilename(filename);
        return ResponseEntity.ok(availabilityList);
    }

    @GetMapping("/filehistory/{groupId}")
    public ResponseEntity<List<FileHistoryDto>> getFileDetails(@PathVariable Long groupId) {
        List<FileHistoryDto> fileDetails = fileService.getFileDetailsByGroupId(groupId);
        return ResponseEntity.ok(fileDetails);
    }
}
