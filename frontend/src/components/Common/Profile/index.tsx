import { useState } from "react";
import Post from "../Post";

interface User {
  id: number;
  name: string;
  username: string;
  bio?: string | null;
  created_at: string;
}

interface PostProps {
  id: number;
  user: string;
  content: string;
  created_at: string;
  likes: number;
}

interface Follower {
  id: number;
  follower_id: number;
  following_id: number;
}

interface ProfileProps {
  user: User;
  posts: PostProps[];
  followers: Follower[];
  following: Follower[];
  isMine: boolean;
  isFollowing: boolean;
}

export default function Profile({ user, posts, followers, following, isMine, isFollowing: initialIsFollowing }: ProfileProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const toggleFollow = async () => {
    try {
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Failed to update follow status:", error);
    }
  };

  console.log(posts[0])

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-[500px]">
      {/* Profile Header */}
      <div className="w-full bg-gray-800 p-5 rounded-lg text-white text-center">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-400">{user.username}</p>
        <p className="mt-2 text-gray-300">{user.bio || "No bio available"}</p>

        {/* Follow Button (Only for Other Users) */}
        {!isMine && (
          <button
            onClick={toggleFollow}
            className={`mt-3 px-84 py-2 rounded-md transition ${
              isFollowing ? "bg-gray-700 text-white" : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        {/* Followers & Following */}
        <div className="flex justify-center gap-6 mt-4 text-gray-400">
          <span>{followers.length} Followers</span>
          <span>{following.length} Following</span>
        </div>
      </div>

      {/* User's Posts */}

      <div className="mt-5 flex flex-col gap-4 w-full">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <p className="text-gray-400 text-center">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
