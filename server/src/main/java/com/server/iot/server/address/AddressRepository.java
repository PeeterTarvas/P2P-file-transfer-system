package com.server.iot.server.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import java.util.List;


/**
 * Repository that references iot.user table in the database.
 */
@Validated
@Repository
public interface AddressRepository extends JpaRepository<AddressDbo, Long> {


    @Query(value = "SELECT address_id, user_id, ip, port FROM iot.address WHERE user_id IN (:userIds)",
            nativeQuery = true)
    List<AddressDbo> getAddressByUserIds(List<Long> userIds);

}
