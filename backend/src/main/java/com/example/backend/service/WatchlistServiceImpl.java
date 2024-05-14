package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.WatchlistItem;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchlistServiceImpl implements WatchlistService {
    private final UserRepository userRepository;
    private final WatchlistRepository watchlistRepository;

    @Override
    public WatchlistItem getWatchlistItem(Long id) {
        return watchlistRepository.findById(id).orElse(null); // Return null if not found
    }

    @Override
    public List<WatchlistItem> getWatchlist() {
        return watchlistRepository.findAll(); // Retrieve all watchlist items
    }

    @Override
    public String deleteWatchlistItem(Long id) {
        if (watchlistRepository.existsById(id)) {
            watchlistRepository.deleteById(id);
            return "Deleted";
        } else {
            return "Watchlist item not found";
        }
    }

    @Override
    public WatchlistItem addWatchlistItem(WatchlistItem watchlistItem) {
        return watchlistRepository.save(watchlistItem);
    }

    @Override
    public void addToWatchlist(Long userId, WatchlistItem watchlistItem) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        WatchlistItem savedWatchlistItem = watchlistRepository.save(watchlistItem);

        // Optionally, you can validate the savedWatchlistItem before adding it to the user's watchlist
        // e.g., check if the stock already exists in the watchlist

        user.getWatchlist().add(savedWatchlistItem);
        userRepository.save(user);
    }
}
