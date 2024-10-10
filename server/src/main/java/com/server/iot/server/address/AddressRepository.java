package com.server.iot.server.address;

import com.server.iot.server.user.UserDbo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;


/**
 * Repository that references iot.user table in the database.
 */
@Validated
@Repository
public interface AddressRepository extends JpaRepository<AddressDbo, Long> {



}
