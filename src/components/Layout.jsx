import React, { useState, useEffect } from "react";
import Sidebar from "./Navbar/Sidebar";
import Logo from '../assets/nufinlogo.png';
import Topbar from "./Navbar/Topbar";

// Function to format date and time to 12-hour format
const formatDateTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
};

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [currentUser, setCurrentUser] = useState("IT_ADMIN_MERCHANT"); // Dynamic current user handler
  const [lastLogin, setLastLogin] = useState("");

  // Mouse enter event on icons
  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
  };

  // Mouse leave event on icons
  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  // Update last login time when dropdown content is opened
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date();
      setLastLogin(formatDateTime(currentDateTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col w-full">
        {/* Header overlapping the sidebar */}
        <header className="bg-[#23587C] text-white p-4 flex justify-between items-center -ml-16">
          <img src={Logo} className="fixed left-20 rounded z-0" alt="Logo" />
          <Topbar
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            hoveredIcon={hoveredIcon}
            username={currentUser} // Dynamic user
            lastLogin={lastLogin}
          />
        </header>

        <div className="flex-1 bg-gray-200 p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
