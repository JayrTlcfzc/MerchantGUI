import React, { useState } from "react";
import Sidebar from "./Navbar/Sidebar";

const Layout = ({ children, username }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col w-full">
        <header className="bg-[#215172] text-white p-4 flex justify-between items-center">
          <div className="text-white text-lg font-medium">{username}</div>
        </header>
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
