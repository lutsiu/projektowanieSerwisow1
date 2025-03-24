import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { createPost } from "../../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { addPost } from "../../../redux/slices/postSlice";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading) return;
    if (!user) return alert("User not authenticated!");

    setLoading(true);

    try {
      const response = await createPost({
        user: user.id,
        content,
      });

      if (response?.data) {
        dispatch(addPost(response.data));
        setContent("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:right-12 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition"
      >
        <FaPlus className="text-3xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div
            className="bg-gray-900 p-6 rounded-lg shadow-xl w-96 sm:w-[400px] relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-xl mb-4">Create a Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="What's on your mind?"
              ></textarea>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
