CREATE DATABASE threads;
use threads;

CREATE TABLE users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    username      VARCHAR(50) NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    bio           TEXT DEFAULT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE posts (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE likes (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    user_id   INT NOT NULL,
    post_id   INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
CREATE TABLE followers (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO users (name, username, email, password, bio) VALUES
        ('Alice Johnson', '@alice', 'alice@example.com', 'Qwerty123!', 'Love traveling and photography!'),
('Bob Smith', '@bob', 'bob@example.com', 'Qwerty234!', 'Web developer and tech geek.'),
('Charlie Brown', '@charlie', 'charlie@example.com', 'Qwerty345!', 'Music producer and coffee addict.'),
('Diana White', '@diana', 'diana@example.com', 'Qwerty456!', 'Fitness enthusiast and health coach.');

INSERT INTO posts (user_id, content) VALUES
-- Alice's posts
(1, 'Just visited Paris, what a beautiful city!'),
(1, 'Photography is my therapy.'),
(1, 'Trying out a new camera today!'),
(1, 'Sunsets are the best part of the day.'),
(1, 'Weekend hiking trip was amazing!'),

-- Bob's posts
(2, 'Started learning React.js today!'),
(2, 'Coffee + Coding = Productivity.'),
(2, 'What’s your favorite programming language?'),
(2, 'JavaScript or Python? Debate!'),
(2, 'Building my own app, excited!'),

-- Charlie's posts
(3, 'Music is life.'),
(3, 'Dropping a new beat soon!'),
(3, 'Concert season is here!'),
(3, 'Studio vibes all day long.'),
(3, 'Collaboration requests are open!'),

-- Diana's posts
(4, 'Morning workout complete!'),
(4, 'Healthy food, healthy life.'),
(4, 'Yoga is the key to inner peace.'),
(4, 'Who else loves running?'),
(4, 'Sunday meal prep done!');

INSERT INTO likes (user_id, post_id) VALUES
(1, 6), (1, 7), (1, 8), (1, 9), (1, 10), -- Alice likes Bob's posts
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), -- Bob likes Alice's posts
(3, 11), (3, 12), (3, 13), (3, 14), (3, 15), -- Charlie likes Diana's posts
(4, 16), (4, 17), (4, 18), (4, 19), (4, 20), -- Diana likes Charlie's posts
(1, 16), (2, 12), (3, 8), (4, 3), (1, 20), -- More random likes
(3, 1), (2, 14), (4, 7), (1, 19), (2, 10);

INSERT INTO followers (follower_id, following_id) VALUES
(1, 2), (1, 3), -- Alice follows Bob & Charlie
(2, 1), (2, 4), -- Bob follows Alice & Diana
(3, 2), (3, 4), -- Charlie follows Bob & Diana
(4, 1), (4, 3), -- Diana follows Alice & Charlie
(1, 4), (2, 3), (3, 1), (4, 2); -- More random follows
