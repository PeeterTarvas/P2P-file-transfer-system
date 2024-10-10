package com.server.iot.server.user;


import com.server.iot.server.address.AddressDbo;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

/**
 * This class represents the users account in the database.
 */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", schema = "iot")
public class UserDbo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;


}
