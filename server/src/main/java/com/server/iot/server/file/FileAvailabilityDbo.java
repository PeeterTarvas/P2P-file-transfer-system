package com.server.iot.server.file;

import com.server.iot.server.user.UserDbo;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

/**
 * This class represents the availability of a file for a user in the database.
 */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "file_availability", schema = "iot")
public class FileAvailabilityDbo implements Serializable {

    @Id
    @Column(name = "file_id")
    private Long fileId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "available", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean available;
}
