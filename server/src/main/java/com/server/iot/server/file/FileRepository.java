package com.server.iot.server.file;


import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FileRepository extends JpaRepository<FileDbo, Long> {

    @Query(value = "SELECT file_id, name, size, checksum, added_timestamp FROM iot.files WHERE name ILIKE CONCAT('%', :name, '%')",
            nativeQuery = true)
    List<FileDbo> findAllByName(@NotBlank String name);


}
