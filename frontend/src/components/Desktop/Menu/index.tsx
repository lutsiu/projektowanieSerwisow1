import { FaThreads, FaPlus, FaRegHeart, FaRegUser } from "react-icons/fa6";
import { IoMdHome, IoIosSearch } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <aside className="hidden sm:flex flex-col justify-between h-screen w-20 bg-black p-4 fixed left-0 top-0 border-r border-gray-700">
      {/* Top Logo */}
      <div className="flex items-center justify-center p-3">
        <FaThreads className="text-white text-4xl" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6 mt-6">
        <SidebarItem to="/" icon={<IoMdHome className="text-3xl" />} />
        <SidebarItem to="/search" icon={<IoIosSearch className="text-3xl" />} />
        <SidebarItem to="/add-post" icon={<FaPlus className="text-3xl" />} />
        <SidebarItem to="/liked" icon={<FaRegHeart className="text-3xl" />} />
        <SidebarItem to={`/profile/${user?.username}`} icon={<FaRegUser className="text-2xl" />} />
      </nav>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex justify-center items-center text-white hover:text-red-400 transition p-3 rounded-lg mt-auto">
        <RiMenu2Line className="text-3xl" />
      </button>
    </aside>
  );
}

function SidebarItem({
  to,
  icon,
  label,
  className = "",
}: {
  to: string;
  icon: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`flex justify-center items-center text-white hover:text-blue-400 transition p-3 rounded-lg ${className}`}
    >
      {icon}
      {label && <span className="ml-2 text-sm">{label}</span>}
    </Link>
  );
}
