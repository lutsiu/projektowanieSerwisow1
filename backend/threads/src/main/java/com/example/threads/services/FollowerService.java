package com.example.threads.services;

import com.example.threads.dao.FollowerDAO;
import com.example.threads.models.Follower;
import com.example.threads.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowerService {

    @Autowired
    private FollowerDAO followerDAO;

    public List<Follower> getFollowers(User user) {
        return followerDAO.findByFollowing(user);
    }

    public List<Follower> getFollowing(User user) {
        return followerDAO.findByFollower(user);
    }

    public boolean isFollowing(User follower, User following) {
        return followerDAO.findByFollowerAndFollowing(follower, following).isPresent();
    }

    public Follower followUser(User follower, User following) {
        if (followerDAO.findByFollowerAndFollowing(follower, following).isEmpty()) {
            Follower followerEntity = new Follower();
            followerEntity.setFollower(follower);
            followerEntity.setFollowing(following);
            return followerDAO.save(followerEntity);
        }
        return null;
    }

    public void unfollowUser(User follower, User following) {
        followerDAO.deleteByFollowerAndFollowing(follower, following);
    }
}
