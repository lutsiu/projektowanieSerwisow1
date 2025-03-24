import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Profile from "../components/Common/Profile";
import { Follower, Post, User } from "../models/models";
import { API_URL } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function ProfilePage() {
  const { username } = useParams(); // Get username from URL
  const [pageUser, setPageUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const reduxUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const userResponse = await axios.get<User>(`${API_URL}/users/username/${username}`);
        setPageUser(userResponse.data);

        // Fetch user's posts
        const postsResponse = await axios.get<Post[]>(`${API_URL}/posts/user/${userResponse.data.id}`);
        setPosts(postsResponse.data);

        // Fetch followers & following
        const followersResponse = await axios.get<Follower[]>(`${API_URL}/followers/followers/${userResponse.data.id}`);
        const followingResponse = await axios.get<Follower[]>(`${API_URL}/followers/following/${userResponse.data.id}`);
        setFollowers(followersResponse.data);
        setFollowing(followingResponse.data);

        // Check if the logged-in user follows this profile
        setIsFollowing(followersResponse.data.some((follower) => follower.follower_id === reduxUser?.id));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfileData();
    }
  }, [username, reduxUser]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!pageUser) return <p className="text-white text-center">User not found.</p>;

  return (
    <Profile
      user={pageUser}
      posts={posts}
      followers={followers}
      following={following}
      isMine={pageUser.id === reduxUser?.id}
      isFollowing={isFollowing}
    />
  );
}
