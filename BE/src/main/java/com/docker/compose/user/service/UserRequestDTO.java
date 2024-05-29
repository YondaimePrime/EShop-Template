package com.docker.compose.user.service;

import lombok.Data;

@Data
public class UserRequestDTO {

    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private String password;
    private String email;
    private String city;
    private String number;
    private boolean admin;
}
