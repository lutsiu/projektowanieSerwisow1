package com.example.threads.controllers;

import com.example.threads.models.User;
import com.example.threads.dao.UserDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserDAO userRepository;

    public AuthController(UserDAO userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user.get()); // Returns ResponseEntity<User>
        }

        return ResponseEntity.status(401).body("Invalid email or password"); // Returns ResponseEntity<String>
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(@RequestParam Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get()); // Return User if found
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}