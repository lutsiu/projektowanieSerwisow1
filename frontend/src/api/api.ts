import axios from 'axios';
import { User, Post, Like, Follower } from '../models/models';

export const API_URL = 'http://localhost:8080';

// USERS API
export const fetchUsers = () => axios.get<User[]>(`${API_URL}/users`);
export const fetchUserById = (id: number) => axios.get<User>(`${API_URL}/users/${id}`);
export const fetchUserByUsername = (username: string) =>
  axios.get<User>(`${API_URL}/users/username/${username}`);
export const fetchUserByEmail = (email: string) =>
  axios.get<User>(`${API_URL}/users/email/${email}`);
export const createUser = (userData: Omit<User, 'id' | 'created_at'>) =>
  axios.post<User>(`${API_URL}/users`, userData);
export const deleteUser = (id: number) => axios.delete(`${API_URL}/users/${id}`);

// POSTS API
export const fetchPosts = () => axios.get<Post[]>(`${API_URL}/posts`);
export const fetchPostById = (id: number) => axios.get<Post>(`${API_URL}/posts/${id}`);
export const fetchPostsByUser = (user_id: number) =>
  axios.get<Post[]>(`${API_URL}/posts/user/${user_id}`);
export const createPost = (postData: Omit<Post, 'id' | 'createdAt'>) =>
  axios.post<Post>(`${API_URL}/posts`, postData);
export const deletePost = (id: number) => axios.delete(`${API_URL}/posts/${id}`);

// LIKES API
export const fetchLikesByPost = (post_id: number) =>
  axios.get<Like[]>(`${API_URL}/likes/post/${post_id}`);
export const fetchLikesByUser = (user_id: number) =>
  axios.get<Like[]>(`${API_URL}/likes/user/${user_id}`);
export const likePost = (user_id: number, post_id: number) =>
  axios.post<Like>(`${API_URL}/likes`, { user_id, post_id });
export const unlikePost = (user_id: number, post_id: number) =>
  axios.delete(`${API_URL}/likes`, { data: { user_id, post_id } });

// FOLLOWERS API
export const fetchFollowers = (user_id: number) =>
  axios.get<Follower[]>(`${API_URL}/followers/followers/${user_id}`);
export const fetchFollowing = (user_id: number) =>
  axios.get<Follower[]>(`${API_URL}/followers/following/${user_id}`);
export const followUser = (follower_id: number, following_id: number) =>
  axios.post<Follower>(`${API_URL}/followers`, { follower_id, following_id });
export const unfollowUser = (follower_id: number, following_id: number) =>
  axios.delete(`${API_URL}/followers`, { data: { follower_id, following_id } });
// AUTH API
export const login = (loginRequest: { email: string; password: string }) =>
  axios.post<User>(`${API_URL}/auth/login`, loginRequest);

export const getUser = (id: number) => axios.get<User>(`${API_URL}/auth/me?id=${id}`);
