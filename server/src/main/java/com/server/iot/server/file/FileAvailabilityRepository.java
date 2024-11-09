package com.server.iot.server.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileAvailabilityRepository extends JpaRepository<FileAvailabilityDbo, Long> {

    List<FileAvailabilityDbo> findAllByFileId(Long fileId);

}
