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

    /**
     * Adds a file to a user and sets its availability.
     *
     * @param username  The ID of the user to whom the file should be added.
     * @param fileDto The file data to add.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */
    @PostMapping("/user/{username}")
    public ResponseEntity<Void> addFileToUser(
            @PathVariable("username") @NotBlank String username,
            @RequestBody @Valid FileDto fileDto) {
        fileService.addFileToUser(username, fileDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * Retrieves file availability information for a specific filename.
     *
     * @param filename The name of the file to search.
     * @return ResponseEntity containing a list of FileAvailabilityDto objects.
     */
    @GetMapping("/availability/{filename}")
    public ResponseEntity<List<FileAvaliablilityDto>> getFileAvailabilityByFilename(
            @PathVariable("filename") @NotBlank String filename) {
        List<FileAvaliablilityDto> availabilityList = fileService.getFileAvaliablilityDtoByFilename(filename);
        return ResponseEntity.ok(availabilityList);
    }
}
