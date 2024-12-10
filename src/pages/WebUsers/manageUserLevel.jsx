import React, { useState } from "react";
import AddUserLevel from "./manageuserlevels/addUserLevel";
import EditUserLevel from "./manageuserlevels/editUserLevel";

const ManageUserLevel = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-200">
          <span className="text-orange-500 mr-2">⚙️</span> MANAGE USER LEVELS
        </h1>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setActiveTab("add")}
            className={`py-2 px-4 rounded-md ${
              activeTab === "add"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Add User Level
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`py-2 px-4 rounded-md ${
              activeTab === "edit"
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Edit User Level
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
