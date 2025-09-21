package com.tariff.service;

import com.tariff.domain.User;
import java.util.Optional;

public interface UserService {
    User registerUser(String username, String email, String password);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean validateCredentials(String username, String password);
}