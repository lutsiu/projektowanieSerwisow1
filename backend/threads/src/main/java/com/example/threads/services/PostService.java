package com.example.threads.services;

import com.example.threads.dao.PostDAO;
import com.example.threads.models.Post;
import com.example.threads.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostDAO postDAO;

    public List<Post> getAllPosts() {
        return postDAO.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postDAO.findById(id);
    }

    public List<Post> getPostsByUser(User user) {
        return postDAO.findByUser(user);
    }

    public Post createPost(Post post) {
        return postDAO.save(post);
    }

    public void deletePost(Long id) {
        postDAO.deleteById(id);
    }
}
