package com.server.iot.server.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
//    List<Group> findByUserId(Long userId);
}
