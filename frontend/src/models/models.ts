export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string | null;
  created_at: string; // ISO format (e.g., '2024-03-20T12:34:56Z')
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
}

export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  created_at: string;
}

export interface Follower {
  id: number;
  follower_id: number;
  following_id: number;
  created_at: string;
}
