package com.docker.compose.user.persistance.repository;


import com.docker.compose.user.persistance.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository <User, String > {
    User findUserByEmail(String email);
    User findUserByUsername(String username);
}
