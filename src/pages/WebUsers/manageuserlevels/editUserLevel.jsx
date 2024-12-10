import React, { useState } from "react";
import StatusModal from "../../../components/statusModal";

const EditUserLevel = () => {
  const [userLevel, setUserLevel] = useState(""); // State for the dropdown
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  }); // State for the modal

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example logic for success or failure
    if (userLevel) {
      setModalState({
        isOpen: true,
        status: "success",
        message: "User Level updated successfully!",
      });
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: "Failed to update User Level. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className=" p-6 rounded-2xl w-full max-w-4xl"
        onSubmit={handleSubmit}
      >
        {/* Fields Container */}
        <div className="border-2 border-[#23587C] bg-white p-4 rounded-2xl">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">User Level</label>
              <select
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select User Level</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Session Timeout
              </label>
              <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="Session Timeout"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Password Expiry
              </label>
              <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="Password Expiry"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Minimum Password
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Minimum Password"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Password History
              </label>
              <input
                type="email"
                className="w-full border rounded-md p-2"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Max Allocation</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Company"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-[#23587C] tracking-wide shadow-md rounded font-bold text-white py-2 px-6 hover:bg-[#1e4d6b] focus:outline-none focus:ring-2 focus:ring-[#1e4d6b]/50 focus:ring-offset-2"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>

      {/* Status Modal */}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        status={modalState.status}
        message={modalState.message}
      />
    </div>
  );
};

export default EditUserLevel;
