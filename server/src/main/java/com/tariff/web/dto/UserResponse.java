package com.tariff.web.dto;

import lombok.Data;
import com.tariff.domain.User;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;

    public static UserResponse fromUser(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        return response;
    }
}