package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false) // Don't need unique constraint for password
    private String password;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @ManyToMany
    @JoinTable(name = "user_watchlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "watchlist_item_id"))
    private Set<WatchlistItem> watchlist = new HashSet<>();

    // Additional fields or methods can be added as needed

    // Getter and setter for watchlist
    public Set<WatchlistItem> getWatchlist() {
        return watchlist;
    }

    public void setWatchlist(Set<WatchlistItem> watchlist) {
        this.watchlist = watchlist;
    }
}
