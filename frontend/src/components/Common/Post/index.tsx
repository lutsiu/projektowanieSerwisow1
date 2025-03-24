import { FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
import { User } from "../../../models/models";

interface PostProps {
  user: User;
  content: string;
  createdAt: string | number; // Ensure timestamp compatibility
  likes: number;
}

export default function Post({ user, content, createdAt, likes }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Format timestamp to "DD MMM YYYY, HH:mm"
  const formattedDate = new Date(createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl bg-gray-800 p-5 shadow-lg w-full max-w-[500px]">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">{user.name}</h3>
        <span className="text-gray-400 text-sm">{formattedDate}</span>
      </div>
      <p className="text-gray-300 mt-3 break-words">{content}</p>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={toggleLike} className="text-gray-400 hover:text-red-500 transition">
          <FaRegHeart className={`text-lg ${liked ? "text-red-500" : ""}`} />
        </button>
        <span className="text-gray-400">{likeCount}</span>
      </div>
    </div>
  );
}
