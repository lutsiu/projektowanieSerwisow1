package com.example.threads.controllers;

import com.example.threads.models.Like;
import com.example.threads.models.Post;
import com.example.threads.models.User;
import com.example.threads.services.LikeService;
import com.example.threads.services.PostService;
import com.example.threads.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Like>> getLikesByPost(@PathVariable Long postId) {
        Optional<Post> post = postService.getPostById(postId);
        return post.map(p -> ResponseEntity.ok(likeService.getLikesByPost(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Like>> getLikesByUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(u -> ResponseEntity.ok(likeService.getLikesByUser(u)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Like> likePost(@RequestParam Long userId, @RequestParam Long postId) {
        Optional<User> user = userService.getUserById(userId);
        Optional<Post> post = postService.getPostById(postId);

        if (user.isPresent() && post.isPresent()) {
            Like like = likeService.likePost(user.get(), post.get());
            return like != null ? ResponseEntity.ok(like) : ResponseEntity.badRequest().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unlikePost(@RequestParam Long userId, @RequestParam Long postId) {
        Optional<User> user = userService.getUserById(userId);
        Optional<Post> post = postService.getPostById(postId);

        if (user.isPresent() && post.isPresent()) {
            likeService.unlikePost(user.get(), post.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
