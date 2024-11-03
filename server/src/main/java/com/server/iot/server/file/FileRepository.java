package com.server.iot.server.file;


import com.server.iot.server.user.UserDbo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileRepository extends JpaRepository<FileDbo, Long> {

    List<FileDbo> findAllByName(String name);

}
