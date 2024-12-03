import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccountManagement = () => {
    setIsAccountOpen(!isAccountOpen); 
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-16"} relative`}
    >
   
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className=" text-gray-300 hover:text-white absolute left-1/2 transform -translate-x-1/2 top-4 text-2xl"
        >
          ☰
        </button>
      )}

   
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className=" text-gray-300 hover:text-white absolute right-4 top-4 text-2xl"
        >
          ✖
        </button>
      )}

      
      <ul className={`${isOpen ? "block" : "hidden"} space-y-4 p-4 mt-12`}>
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>

       
        <li>
          <button
            onClick={toggleAccountManagement}
            className="w-full text-left hover:text-gray-300 flex justify-between"
          >
            <span>Account Management</span>
            <span>{isAccountOpen ? "▲" : "▼"}</span> {/* Arrow icon */}
          </button>
       
          {isAccountOpen && isOpen && (
            <ul className="space-y-2 pl-6">
              <li>
                <Link to="/account/register" className="hover:text-gray-300">
                  Register Subscriber
                </Link>
              </li>
              <li>
                <Link to="/account/search" className="hover:text-gray-300">
                  Search Subscriber
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
