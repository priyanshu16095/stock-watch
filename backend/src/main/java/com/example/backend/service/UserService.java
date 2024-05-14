package com.example.backend.service;

import com.example.backend.entity.User;

public interface UserService {
    User getUser(Long id);
    User createUser(User user);
}
