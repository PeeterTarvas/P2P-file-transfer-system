package com.server.iot.server.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileAvailabilityRepository extends JpaRepository<FileAvailabilityDbo, Long> {

    List<FileAvailabilityDbo> findAllByFileId(Long fileId);

    @Query(value = "SELECT u.username, f.name, f.size, f.added_timestamp " +
            "FROM iot.file_availability fa " +
            "JOIN iot.user u ON u.user_id = fa.user_id " +
            "JOIN iot.group g ON g.group_id = fa.group_id " +
            "JOIN iot.files f ON f.file_id = fa.file_id " +
            "WHERE g.group_id = :groupId",
            nativeQuery = true)
    List<Object[]> getFileHistoryByGroupId(@Param("groupId") Long groupId);

}
