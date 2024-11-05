package com.server.iot.server.file;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;


/**
 * This class serves as a Data Transfer Object (DTO) for file information.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileDto implements Serializable {

    @NotBlank
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private Long size;
}
