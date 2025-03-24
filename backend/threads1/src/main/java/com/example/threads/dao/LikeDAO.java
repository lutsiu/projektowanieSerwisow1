package com.example.threads.dao;

import com.example.threads.models.Like;
import com.example.threads.models.Post;
import com.example.threads.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface LikeDAO extends JpaRepository<Like, Long> {
    Optional<Like> findByUserAndPost(User user, Post post);
    List<Like> findByPost(Post post);
    List<Like> findByUser(User user);
    void deleteByUserAndPost(User user, Post post);
}
