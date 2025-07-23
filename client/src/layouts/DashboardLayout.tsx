import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? "w-56" : "w-0";
  const sidebarWidthPx = isSidebarOpen ? 226 : 0;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full ${sidebarWidth} transition-all duration-300 z-30`}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Navbar */}
      <div
        className="fixed top-0 right-0 h-16 z-20 bg-white shadow-md flex items-center px-4"
        style={{
          left: `${sidebarWidthPx}px`,
          width: `calc(100% - ${sidebarWidthPx}px)`,
        }}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </div>

      {/* Main Content */}
      <div
        className="absolute top-16 right-0 bottom-0 overflow-y-auto  transition-all duration-300"
        style={{
          left: `${sidebarWidthPx}px`,
          width: `calc(100% - ${sidebarWidthPx}px)`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
