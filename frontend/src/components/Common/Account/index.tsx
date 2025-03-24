import { useState } from "react";

interface AccountProps {
  name: string;
  username: string;
}

export default function Account({ name, username }: AccountProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div>
      <div
        className="p-3 bg-gray-800 rounded-lg text-white cursor-pointer hover:bg-gray-700 transition"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-400">{username}</p>
      </div>

      {/* Account Details Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-gray-900 p-6 rounded-lg w-96 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-xl font-bold">{name}</h2>
            <p className="text-gray-400">@{username}</p>

            {/* Follow Button */}
            <button
              onClick={toggleFollow}
              className={`mt-4 px-4 py-2 rounded-md transition ${
                isFollowing ? "bg-gray-700 text-white" : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 block w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
