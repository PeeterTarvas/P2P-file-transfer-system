package com.server.iot.server.file;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileAvaliablilityDto {

    private String username;
    private String filename;
    private String peerId;

}
