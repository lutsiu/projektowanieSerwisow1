import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, removePost } from "../../../redux/slices/postSlice";
import Post from "../Post";
import CreatePost from "../CreatePost";
import { RootState } from "../../../redux/store";

export default function PostsWrapper() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getPosts() as any);
  }, [dispatch]);

  const handleRemovePost = (id: number) => {
    dispatch(removePost(id) as any);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} {...post} removePost={handleRemovePost} />
      ))}
    </div>
  );
}
