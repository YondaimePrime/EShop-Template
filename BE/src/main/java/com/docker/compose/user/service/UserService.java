package com.docker.compose.user.service;

import com.docker.compose.exception.ResourceNotFoundException;
import com.docker.compose.exception.WrongCredentialsException;
import com.docker.compose.user.persistance.entity.User;
import com.docker.compose.user.persistance.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user) {

        return userRepository.save(user);
    }

    public User updateUser(User user) {
        Optional< User > userDb = this.userRepository.findById((user.getId()));

        if (userDb.isPresent()) {
            User userUpdate = userDb.get();
            userUpdate.setId(user.getId());
            userUpdate.setUsername(user.getUsername());
            userUpdate.setFirstName(user.getFirstName());
            userUpdate.setLastName(user.getLastName());
            userUpdate.setPassword(user.getPassword());
            userUpdate.setNumber(user.getNumber());

            userUpdate.setAdmin(user.isAdmin());
            userUpdate.setEmail(user.getEmail());
            userUpdate.setAddress(user.getAddress());
            userUpdate.setCity(user.getCity());
            userRepository.save(userUpdate);

            return userUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + user.getId());
        }
    }

    public List < User > getAllUser() {
        return this.userRepository.findAll();
    }


    public User getUserByEmail(String email){
        if(this.userRepository.findUserByEmail(email) == null){
            throw new ResourceNotFoundException("User with email " + email + " not found!");
        }
        else {
            return this.userRepository.findUserByEmail(email);
        }
    }


    public boolean loginUser(String email, String password) {
        User user = userRepository.findUserByEmail(email);
        if(user != null) {
            if (Objects.equals(user.getPassword(), password)) {
                System.out.println("\nUser Found: " + user + "\n");
                return Objects.equals(user.getPassword(), password);
            } else {
                throw new WrongCredentialsException("The password or email does not match!");

            }
        }
        else {
            throw new ResourceNotFoundException("User with this email address does not exist: " + email);
        }
    }

    public User getUserByUsername(String username){
        Optional<User> userDb = Optional.ofNullable(this.userRepository.findUserByUsername(username));

        if(userDb.isPresent()){
            return userDb.get();
        }
        else {
            throw new ResourceNotFoundException("User with this name doesn't exist: " + username);
        }
    }

    public User getUserById(String userId) {

        Optional < User > userDb = this.userRepository.findById(userId);

        if (userDb.isPresent()) {
            return userDb.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + userId);
        }
    }



    public void deleteUser(String userId) {
        Optional < User > userDb = this.userRepository.findById(userId);

        if (userDb.isPresent()) {
            this.userRepository.delete(userDb.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + userId);
        }

    }


    public void deleteCollection() {
        this.userRepository.deleteAll();
    }
}
