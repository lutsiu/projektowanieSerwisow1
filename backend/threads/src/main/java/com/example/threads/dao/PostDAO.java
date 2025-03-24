package com.example.threads.dao;

import com.example.threads.models.Post;
import com.example.threads.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostDAO extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
}
