import { FaPlus, FaRegHeart, FaRegUser } from "react-icons/fa6";
import { IoMdHome, IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function MobileSidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <aside className="sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 p-2 z-50">
      <nav className="flex justify-around items-center">
        <SidebarItem to="/" icon={<IoMdHome className="text-2xl" />} />
        <SidebarItem to="/search" icon={<IoIosSearch className="text-2xl" />} />
        <SidebarItem to="/add-post" icon={<FaPlus className="text-2xl" />} />
        <SidebarItem to="/liked" icon={<FaRegHeart className="text-2xl" />} />
        <SidebarItem to={`/profile/${user?.username}`} icon={<FaRegUser className="text-2xl" />}  />
      </nav>
    </aside>
  );
}

function SidebarItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label?: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center text-white hover:text-blue-400 transition p-2 rounded-lg"
    >
      {icon}
      {label && <span className="text-xs">{label}</span>}
    </Link>
  );
}
