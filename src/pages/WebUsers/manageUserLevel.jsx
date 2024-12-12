import React, { useState } from "react";
import AddUserLevel from "./manageuserlevels/addUserLevel";
import EditUserLevel from "./manageuserlevels/editUserLevel";
import { FaUserGear } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const ManageUserLevel = () => {
  const [activeTab, setActiveTab] = useState("add");

  const { t, i18n } = useTranslation();

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-8">
          <FaUserGear className="text-[#D95F08] mr-2" />
          {t('manage_user_levels')}
        </h1>
        
        <div className="flex items-center justify-center">
          <button
            onClick={() => setActiveTab("add")}
            className={`w-1/4 px-2 py-2 text-sm ${
              activeTab === "add"
                ? "bg-[#D95F08] text-white"
                : "bg-[#d4d4d4] text-gray-700 hover:bg-[#FC8937] hover:text-white"
            }`}
          >
            {t('add_user_level')}
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`w-1/4 px-2 py-2 text-sm ${
              activeTab === "edit"
                ? "bg-[#D95F08] text-white"
                : "bg-[#d4d4d4] text-gray-700 hover:bg-[#FC8937] hover:text-white"
            }`}
          >
            {t('edit_user_level')}
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === "add" && <AddUserLevel />}
          {activeTab === "edit" && <EditUserLevel />}
        </div>
      </div>
    </div>
  );
};

export default ManageUserLevel;
