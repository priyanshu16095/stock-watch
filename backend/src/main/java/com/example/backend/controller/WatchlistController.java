package com.example.backend.controller;

import com.example.backend.entity.WatchlistItem;
import com.example.backend.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/stockwatch")
@RequiredArgsConstructor
public class WatchlistController {
    private final WatchlistService watchlistService;

    @GetMapping("/watchlist/{id}")
    public ResponseEntity<WatchlistItem> getWatchlistItem(@PathVariable Long id) {
        WatchlistItem watchlistItem = watchlistService.getWatchlistItem(id);
        if (watchlistItem != null) {
            return ResponseEntity.ok(watchlistItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/watchlist")
    public ResponseEntity<WatchlistItem> addWatchlistItem(@RequestBody WatchlistItem watchlistItem) {
        WatchlistItem createdWatchlistItem = watchlistService.addWatchlistItem(watchlistItem);
        return ResponseEntity.created(URI.create("/stockwatch/watchlist/" + createdWatchlistItem.getId())).body(createdWatchlistItem);
    }

    @DeleteMapping("/watchlist/{id}")
    public ResponseEntity<String> deleteWatchlistItem(@PathVariable Long id) {
        String result = watchlistService.deleteWatchlistItem(id);
        if (result.equals("Deleted")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/user/{userId}/watchlist")
    public ResponseEntity<String> addToWatchlist(@PathVariable Long userId, @RequestBody WatchlistItem watchlistItem) {
        watchlistService.addToWatchlist(userId, watchlistItem);
        return ResponseEntity.ok("Stock added to watchlist successfully.");
    }
}
