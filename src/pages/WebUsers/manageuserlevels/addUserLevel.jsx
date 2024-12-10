import React, { useState } from "react";
import StatusModal from "../../../components/statusModal";

const AddUserLevel = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  }); // State for the modal

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example logic for success or failure
    const isFormValid = true; // Replace with actual validation
    if (isFormValid) {
      setModalState({
        isOpen: true,
        status: "success",
        message: "User Level added successfully!",
      });
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: "Failed to add User Level. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className=" p-6 w-full max-w-4xl" onSubmit={handleSubmit}>
        {/* Fields Container */}
        <div className="border-2 border-[#23587C] bg-white p-4 rounded-2xl">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">User Level</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="User Level"
              />
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
            className="bg-[#23587C] text-white py-2 px-6 rounded-md hover:bg-[#1e4d6b]"
          >
            Add
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

export default AddUserLevel;