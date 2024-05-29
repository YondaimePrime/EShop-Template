package com.docker.compose.user.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class UserDetailDTO {

    @NotNull
    private String id;
    @NotBlank(message = "Username must not be empty!")
    @Indexed(unique = true)
    private String username;
    @NotBlank(message = "FirstName must not be empty!")
    private String firstName;
    @NotBlank(message = "LastName must not be empty!")
    private String lastName;
    @NotBlank(message = "Password must not be empty!")
    private boolean admin;
    @NotBlank(message = "Email must not be empty!")
    @Pattern(regexp = "^\\S+@\\S+\\.\\S+$", message = "Invalid email address.")
    @Indexed(unique = true)
    private String email;

    private String address;
    private String password;
    private String city;
    private String number;
}
