package com.server.iot.server.user;


import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

/**
 * Repository that references iot.user table in the database.
 */
@Validated
@Repository
public interface UserRepository extends JpaRepository<UserDbo, Long> {

    /**
     * This method makes the users details accessible by the users username.
     * @param username of the user.
     * @return users details object from the database.
     */
    Optional<UserDbo> getUserDboByUsername(@NotBlank String username);

}
