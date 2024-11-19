package com.server.iot.server.user;


import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import java.util.List;
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

    Optional<UserDbo> getUserDboByPeerId(@NotBlank String peerId);
    List<UserDbo> findByIsOnline(boolean isOnline);
    UserDbo getUserDboByUserId(Long id);

    @Query(value = "SELECT user_id, username, password, peer_id, is_online FROM iot.user WHERE username ILIKE CONCAT('%', :searchTerm, '%')", nativeQuery = true)
    List<UserDbo> getUserDboBySearchTerm(@NotBlank String searchTerm);



}
