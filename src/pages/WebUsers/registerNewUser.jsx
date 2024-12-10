import React, { useState } from "react";
import StatusModal from "../../components/statusModal";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa6";

const RegisterNewUser = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "success",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.reportValidity()) {
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setModalState({
        isOpen: true,
        status: isSuccess ? "success" : "error",
        message: isSuccess
          ? "User registered successfully!"
          : "Registration failed. Please try again.",
      });
      if (isSuccess) {
        toast.success("User registered successfully!");
      } else {
        toast.error("Registration failed");
      }
    }, 100);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Register New User Title outside of the border */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <FaUserPlus className="text-[#D95F08] mr-2" />
            REGISTER NEW USER
          </h2>

          <p className="text-gray-600">
            Please fill in the account details below
          </p>
        </div>

        {/* Form container with border and new border color */}
        <div className="border-2 border-[#23587C] rounded-2xl p-8 bg-white shadow-lg">
          <span className="font-bold text-2xl text-[#23587C] mb-10">
            Account Details
          </span>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  MSISDN
                </label>
                <input
                  type="text"
                  placeholder="Enter MSISDN"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  OTP MSISDN
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP MSISDN"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              {/* Additional fields */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Enter company"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="Enter department"
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  User Level
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                >
                  <option value="">Select user level</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                  required
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Submit button outside the border */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="px-8 py-3 tracking-wide shadow-md rounded font-bold bg-[#23587C] text-white hover:bg-[#2C75A6] focus:outline-none focus:ring-2 focus:ring-[#1e4f6a]/50 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>

      {/* Status Modal component */}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        status={modalState.status}
        message={modalState.message}
      />
    </div>
  );
};

export default RegisterNewUser; // Correct default export
