package com.example.threads.services;

import com.example.threads.dao.LikeDAO;
import com.example.threads.models.Like;
import com.example.threads.models.Post;
import com.example.threads.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeDAO likeDAO;

    public List<Like> getLikesByPost(Post post) {
        return likeDAO.findByPost(post);
    }

    public List<Like> getLikesByUser(User user) {
        return likeDAO.findByUser(user);
    }

    public Optional<Like> findLike(User user, Post post) {
        return likeDAO.findByUserAndPost(user, post);
    }

    public Like likePost(User user, Post post) {
        if (likeDAO.findByUserAndPost(user, post).isEmpty()) {
            Like like = new Like();
            like.setUser(user);
            like.setPost(post);
            return likeDAO.save(like);
        }
        return null;
    }

    public void unlikePost(User user, Post post) {
        likeDAO.deleteByUserAndPost(user, post);
    }
}
