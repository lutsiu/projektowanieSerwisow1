package com.example.threads.controllers;

import com.example.threads.models.Follower;
import com.example.threads.models.User;
import com.example.threads.services.FollowerService;
import com.example.threads.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/followers")
public class FollowerController {

    @Autowired
    private FollowerService followerService;

    @Autowired
    private UserService userService;

    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Follower>> getFollowers(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(u -> ResponseEntity.ok(followerService.getFollowers(u)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Follower>> getFollowing(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(u -> ResponseEntity.ok(followerService.getFollowing(u)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Follower> followUser(@RequestParam Long followerId, @RequestParam Long followingId) {
        Optional<User> follower = userService.getUserById(followerId);
        Optional<User> following = userService.getUserById(followingId);

        if (follower.isPresent() && following.isPresent()) {
            Follower newFollow = followerService.followUser(follower.get(), following.get());
            return newFollow != null ? ResponseEntity.ok(newFollow) : ResponseEntity.badRequest().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unfollowUser(@RequestParam Long followerId, @RequestParam Long followingId) {
        Optional<User> follower = userService.getUserById(followerId);
        Optional<User> following = userService.getUserById(followingId);

        if (follower.isPresent() && following.isPresent()) {
            followerService.unfollowUser(follower.get(), following.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
