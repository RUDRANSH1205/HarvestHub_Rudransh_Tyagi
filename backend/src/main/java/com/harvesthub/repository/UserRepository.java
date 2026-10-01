package com.harvesthub.repository;

import com.harvesthub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailOrPhone(String email, String phone);

    boolean existsByEmail(String email);
}
