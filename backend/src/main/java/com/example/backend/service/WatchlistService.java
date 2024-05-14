package com.example.backend.service;

import com.example.backend.entity.WatchlistItem;

import java.util.List;

public interface WatchlistService {
    WatchlistItem getWatchlistItem(Long id);
    List<WatchlistItem> getWatchlist();
    String deleteWatchlistItem(Long id);
    WatchlistItem addWatchlistItem(WatchlistItem watchlistItem);
    void addToWatchlist(Long userId, WatchlistItem watchlistItem);
}
