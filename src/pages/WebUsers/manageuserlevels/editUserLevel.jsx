import React, { useState } from "react";
import StatusModal from "../../../components/Modals/statusModal";

const EditUserLevel = () => {

  const [formData, setFormData] = useState({
    userLevel: '',
    sessionTimeout: '',
    passwordExpiry: '',
    minimumPassword: '',
    passwordHistory: '',
    maxAllocation: '',
  })

  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeTextOnly = (e) => {
    const { name, value } = e.target;

    if (/^[A-Za-z]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeDigitsOnly = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleKeyDown = (e) => {
  //   if (["e", "E", "+", "-"].includes(e.key)) {
  //     e.preventDefault();
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission success or failure
    const isFormValid =
      formData.userLevel &&
      formData.sessionTimeout &&
      formData.passwordExpiry &&
      formData.minimumPassword &&
      formData.passwordHistory &&
      formData.maxAllocation;

    if (isFormValid) {
      setModalState({
        isOpen: true,
        status: "success",
        message: "Added User Level Successfully!",
      });

      setFormData({
        userLevel: '',
        sessionTimeout: '',
        passwordExpiry: '',
        minimumPassword: '',
        passwordHistory: '',
        maxAllocation: '',
      });

    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: "Failed to Add User Level. Please try again.",
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
                name="userLevel"
                id="userLevel"
                value={formData.userLevel}
                onChange={handleChange}
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
                name="sessionTimeout"
                id="sessionTimeout"
                value={formData.sessionTimeout}
                onChange={handleChangeDigitsOnly}
                // onKeyDown={handleKeyDown}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Session Timeout"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Password Expiry
              </label>
              <input
                type="number"
                name="passwordExpiry"
                id="passwordExpiry"
                value={formData.passwordExpiry}
                onChange={handleChangeDigitsOnly}
                onKeyDown={handleKeyDown}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Password Expiry"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Minimum Password
              </label>
              <input
                type="text"
                name="minimumPassword"
                id="minimumPassword"
                value={formData.minimumPassword}
                onChange={handleChangeDigitsOnly}
                onKeyDown={handleKeyDown}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Minimum Password"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Password History
              </label>
              <input
                type="text"
                name="passwordHistory"
                id="passwordHistory"
                value={formData.passwordHistory}
                onChange={handleChange}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Password History"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Max Allocation
              </label>
              <input
                type="text"
                name="maxAllocation"
                id="maxAllocation"
                value={formData.maxAllocation}
                onChange={handleChangeDigitsOnly}
                onKeyDown={handleKeyDown}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Max Allocation"
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
