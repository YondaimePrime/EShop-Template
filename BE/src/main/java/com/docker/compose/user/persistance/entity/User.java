package com.docker.compose.user.persistance.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document
public class User{

    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private String password;
    @Indexed(unique = true)
    private String email;
    private String city;
    private String number;
    private boolean admin;
}
