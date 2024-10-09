package com.server.iot.server.user;


import jakarta.persistence.*;
import lombok.*;

/**
 * This class represents the users account in the database.
 */
@Builder
@Setter
@Getter
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", schema = "iot")
public class UserDbo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;


}
