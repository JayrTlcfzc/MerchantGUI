import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Users, Search, DollarSign, FileText, History, Menu, ChevronLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import logo from "../../assets/nufinlogo.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const menuItems = [
    {
      id: "account",
      title: "Account Management",
      icon: Users,
      subItems: [
        { title: "Register Subscriber", path: "/account/register" },
        { title: "Search Subscriber", path: "/account/search" },
      ],
    },
    {
      id: "webUsers",
      title: "Web Users",
      icon: Search,
      subItems: [],
    },
    {
      id: "funds",
      title: "Funds",
      icon: DollarSign,
      subItems: [],
    },
    {
      id: "reports",
      title: "Reports",
      icon: FileText,
      subItems: [],
    },
    {
      id: "audit",
      title: "Audit Trail",
      icon: History,
      subItems: [],
    },
  ];

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out relative",
        isOpen ? "w-64 rounded-tr-lg rounded-br-lg" : "w-16 rounded-tr-lg rounded-br-lg"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      {isOpen && (
        <div className="flex justify-center items-center h-32">
          <img
            src={logo}
            alt="Nufin Logo"
            className="transition-all duration-300 w-24 border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Menu Items */}
      <nav className={cn("px-2", isOpen ? "mt-4" : "mt-16")}>
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                expandedItem === item.id && "bg-gray-100"
              )}
            >
              <item.icon size={20} className="text-orange-500" />
              {isOpen && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.title}</span>
                  {item.subItems.length > 0 &&
                    (expandedItem === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </>
              )}
            </button>

            {/* Subitems */}
            {isOpen && expandedItem === item.id && item.subItems.length > 0 && (
              <div className="ml-9 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className="block py-2 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
