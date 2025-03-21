import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ChevronDown,
  ChevronUp,
  Users,
  Search,
  DollarSign,
  FileText,
  History,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { cn } from "../../lib/utils";
import logo from "../../assets/nufinlogo.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  const { t, i18n } = useTranslation();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (item) => {
    if (!isOpen) {
      // Open the sidebar if it's closed
      setIsOpen(true);
      setExpandedItem(expandedItem === item ? null : item);
    } else {
      // Toggle the dropdown
      setExpandedItem(expandedItem === item ? null : item);
    }
  };

  const menuItems = [
    {
      id: "account",
      title: `${t('account_management')}`,
      icon: Users,
      subItems: [
        storedData.modules?.includes('ACCOUNTS.REGISTER') && { title: `${t('register_subscriber')}`, path: "/account/register" },
        { title: `${t('search_subscriber')}`, path: "/account/search" },
        storedData.modules?.includes('ACCOUNTS.PENDINGSUBS') && { title: `${t('view_pending_subscriber')}`, path: "/account/view-pending" },
      ].filter(Boolean),
    },
    {
      id: "webUsers",
      title: `${t('web_users')}`,
      icon: Search,
      subItems: [
        storedData.modules?.includes('USERS.SEARCHUSER') && { title: `${t('view_web_users')}`, path: "/web-users/view-web-users" },
        storedData.modules?.includes('USERS.REGISTER') && { title: `${t('register_new_user')}`, path: "/web-users/register-new-user" },
        storedData.modules?.includes('USERS.NEWUSERSLEVEL') && { title: `${t('manage_user_levels')}`, path: "/web-users/manage-user-level" },
        storedData.modules?.includes('USERS.UPDATEROLES') && { title: `${t('roles_configuration')}`, path: "/web-users/roles-configuration" }
      ].filter(Boolean),
    },
    {
      id: "funds",
      title: `${t('funds')}`,
      icon: DollarSign,
      subItems: [
        storedData.modules?.includes('FUNDS.CASHALLOCATION') && { title: `${t('allocate_cash')}`, path: "/funds/allocate-cash" },
        storedData.modules?.includes('FUNDS.WALLETTOBANK') && { title: `${t('wallet_to_bank')}`, path: "/funds/wallet-to-bank" },
        storedData.modules?.includes('ACCOUNTS.BATCHREQUESTCOL') && { title: `${t('batch_files')}`, path: "/funds/batch-files" },
        storedData.modules?.includes('FUNDS.BATCHALLOCREQUEST') && { title: `${t('batch_payment_upload')}`, path: "/funds/batch-payment-upload" },
        storedData.modules?.includes('FUNDS.BATCHUPLOADEDCOL') && { title: `${t('batch_uploaded_files')}`, path: "/funds/batch-uploaded-files" },
      ].filter(Boolean),
    },
    {
      id: "reports",
      title: `${t('reports')}`,
      path: "/reports/request-reports",
      icon: FileText,
      subItems: [
        { title: `${t('request_reports')}`, path: "/reports/request-reports" },
      ].filter(Boolean),
    },
    {
      id: "audit",
      title: `${t('audit_trail')}`,
      icon: History,
      subItems: [{ title: `${t('audit_trail')}`, path: "/audit-trail" }].filter(Boolean),
    },
  ];

  return (
    <div
      className={cn(
        "bg-white h-screen transition-all duration-300 ease-in-out relative",
        "rounded-tr-2xl rounded-br-2xl z-10"
      )}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo and Text */}
      {isOpen && (
        <Link to="/dashboard">
          <div className="flex flex-col justify-center items-center h-32">
            <img
              src={logo}
              alt="Nufin Logo"
              className="transition-all duration-300 w-24 border border-gray-300 rounded"
            />
            <span className="text-4xl mt-2 text-[#23587C]">N U F I N</span>{" "}
          </div>
        </Link>
      )}

      {/* Menu Items */}
      <nav className={cn("px-2", isOpen ? "mt-4" : "mt-16")}>
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-[#215172] hover:text-white transition-colors",
                expandedItem === item.id && "bg-gray-100"
              )}
            >
              <item.icon size={20} className="text-orange-500" />
              {isOpen && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.title}</span>
                  {item.subItems.length > 0 &&
                    (expandedItem === item.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
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
                    className="block py-2 px-3 text-sm text-gray-600 hover:bg-[#215172] hover:text-white rounded-md transition-colors"
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
