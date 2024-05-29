package com.docker.compose.user.controller;

import com.docker.compose.user.persistance.entity.User;
import com.docker.compose.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity < List <User>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUser());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity < User > getUserById(@PathVariable String id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @GetMapping("users/email:{email}")
    public ResponseEntity <User> getUserByEmail(@PathVariable String email){
        return ResponseEntity.ok().body(userService.getUserByEmail(email));
    }

    @GetMapping("users/login://{email}:{password}//")
    public ResponseEntity<User> LoginUser(
            @PathVariable("email") String email,
            @PathVariable("password") String password){
        if(userService.loginUser(email,password)){
            return ResponseEntity.ok().body(userService.getUserByEmail(email));
        }else {
            throw new RuntimeException("User was not Found");
        }
    }

    @PostMapping("/users/register")
    public ResponseEntity < User > createUser(@RequestBody User user) {
        return ResponseEntity.ok().body(this.userService.createUser(user));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity < User > updateUser(@PathVariable String id, @RequestBody User user) {
        user.setId(id);
        return ResponseEntity.ok().body(this.userService.updateUser(user));
    }

    @DeleteMapping("/users/{id}")
    public HttpStatus deleteUser(@PathVariable String id) {
        this.userService.deleteUser(id);
        return HttpStatus.OK;
    }

    @DeleteMapping("/users")
    public HttpStatus deleteAllUsers() {
        this.userService.deleteCollection();
        return HttpStatus.OK;
    }
}
