import React, { useState } from "react";
import StatusModal from "../../../components/Modals/statusModal";
import {
  HandleChange,
  HandleChangeDigitsOnly,
  HandleChangeTextOnly,
  ResetFormData,
} from "../../../components/Validations";
import { useTranslation } from "react-i18next";
import { addUserLevel } from "../../../api/manageUserLevels";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from '../../../components/Modals/loadingModal';

const AddUserLevel = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    userLevel: "",
    sessionTimeout: "",
    passwordExpiry: "",
    minimumPassword: "",
    passwordHistory: "",
    maxAllocation: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const handleSubmit = async (e) => {
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

      try {
        setLoading(true);
        const response = await addUserLevel(formData);
        console.log("response: " + response);
        setModalState({
          isOpen: true,
          status: "success",
          message: "Added User Level Successfully!",
        });
        ResetFormData(setFormData, initialFormData)();
      } catch (error) {
        setModalState({
            isOpen: true,
            status: "error",
            message: error.message || t("Failed to add data."),
        });
      } finally {
        setLoading(false);
      }

    } else {
      toast.error('Please fill up the form');
      setModalState({
        isOpen: true,
        status: "error",
        message: "Failed to Add User Level. Please try again.",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      {loading && (<LoadingModal />)}

      <form className=" p-6 w-full max-w-4xl">
        {/* Fields Container */}
        <div className="border-2 border-[#23587C] bg-white p-4 rounded-2xl">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-1 truncate w-full">
                {t("user_level")}
              </label>
              <input
                type="text"
                name="userLevel"
                id="userLevel"
                value={formData.userLevel}
                onChange={HandleChange(setFormData)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="User Level"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-1 truncate w-full">
                {t("session_timeout")}
              </label>
              <input
                type="number"
                name="sessionTimeout"
                id="sessionTimeout"
                value={formData.sessionTimeout}
                onChange={HandleChangeDigitsOnly(setFormData)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Session Timeout"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-1 truncate w-full">
                {t("password_expiry")}
              </label>
              <input
                type="number"
                name="passwordExpiry"
                id="passwordExpiry"
                value={formData.passwordExpiry}
                onChange={HandleChangeDigitsOnly(setFormData)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Password Expiry"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-1 truncate w-full">
                {t("minimum_password")}
              </label>
              <input
                type="text"
                name="minimumPassword"
                id="minimumPassword"
                value={formData.minimumPassword}
                onChange={HandleChangeDigitsOnly(setFormData)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Minimum Password"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-1 truncate w-full">
                {t("password_history")}
              </label>
              <input
                type="text"
                name="passwordHistory"
                id="passwordHistory"
                value={formData.passwordHistory}
                onChange={HandleChangeDigitsOnly(setFormData)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                placeholder="Password History"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 mb-1 truncate w-full">
                {t("max_allocation")}
              </label>
              <input
                type="text"
                name="maxAllocation"
                id="maxAllocation"
                value={formData.maxAllocation}
                onChange={HandleChangeDigitsOnly(setFormData)}
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
            onClick={handleSubmit}
            className="bg-[#23587C] tracking-wide shadow-md rounded font-bold text-white py-2 px-6 hover:bg-[#1e4d6b] focus:outline-none focus:ring-2 focus:ring-[#1e4d6b]/50 focus:ring-offset-2"
          >
            {t("add")}
          </button>
        </div>
      </form>

      <ToastContainer />

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
