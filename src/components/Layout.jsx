import React, { useState } from "react";
import Sidebar from "./Navbar/Sidebar";

const Layout = ({ children, username }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-200"> 
    <Sidebar
      isOpen={isSidebarOpen}
      setIsOpen={setIsSidebarOpen}
    />
    
    <div className="flex flex-col w-full">
      {/* Header overlapping the sidebar */}
      <header className="bg-[#215172] text-white p-4 flex justify-between items-center -ml-16">
        <div className="ml-auto text-white text-lg font-medium">{username}</div>
      </header>
      
      <div className="flex-1 bg-gray-200 p-4 overflow-auto">{children}</div>
    </div>
  </div>
  


  );
};

export default Layout;
