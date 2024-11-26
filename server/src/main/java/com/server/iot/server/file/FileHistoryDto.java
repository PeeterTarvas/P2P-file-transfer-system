package com.server.iot.server.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileHistoryDto implements Serializable {
    private String username;
    private String fileName;
    private Long fileSize;
    private LocalDateTime addedTimestamp;
}
