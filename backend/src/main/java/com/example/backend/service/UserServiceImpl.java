package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.WatchlistItem;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

}
