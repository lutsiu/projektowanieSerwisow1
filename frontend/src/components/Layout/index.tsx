import { ReactNode } from "react";
import LeftSidebar from "../Desktop/Menu"; // Sidebar
import MobileSidebar from "../Mobile/Menu";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl p-4 pb-16 sm:pb-4">{children}</div>
      </div>

      {/* Mobile Sidebar (Shown only below sm) */}
      <MobileSidebar />
    </div>
  );
}