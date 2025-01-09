import React, { useState, useEffect } from "react";
import StatusModal from "../../../components/Modals/statusModal";
import {
  HandleChange,
  HandleChangeDigitsOnly,
  HandleChangeTextOnly,
  ResetFormData,
} from "../../../components/Validations";
import { useTranslation } from "react-i18next";
import { userLevelCol } from "../../../api/webuser";
import { editUserLevel, userLevelSearch } from "../../../api/manageUserLevels";
import { toast, ToastContainer } from "react-toastify";

const EditUserLevel = () => {
  const { t, i18n } = useTranslation();
  const [levels, setLevels] = useState([]);
  const [userLevel, setUserLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLevelData, setUserLevelData] = useState([]);
 // const [formData, setFormData] = useState(initialFormData);

  // const initialFormData = {
  //   userLevel: "",
  //   sessionTimeout: "",
  //   passwordExpiry: "",
  //   minimumPassword: "",
  //   passwordHistory: "",
  //   maxAllocation: "",
  // };

  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  useEffect(() => {
      const fetchUserLevels = async () => {
        setLoading(true);
        try {
          const result = await userLevelCol();
          if (result.success) {
            const parsedLevels = JSON.parse(result.level);
            console.log(parsedLevels)
            if (Array.isArray(parsedLevels)) {
              setLevels(parsedLevels); 
  
            } else {
              setError('Invalid user level data format');
            }
          } else {
            setError(result.message || 'Invalid data format');
          }
        } catch (err) {
          setError(err.message); // Handle fetch errors
        } finally {
          setLoading(false);
        }
      };
    
      fetchUserLevels();
    }, []);

    // const getNameAndId = (label) => {
    //   if (label === t("session_timeout")) return "sessionTimeout";
    //   if (label === t("password_expiry")) return "passwordExpiry";
    //   if (label === t("minimum_password")) return "minimumPassword";
    //   if (label === t("password_history")) return "passwordHistory";
    //   if (label === t("max_allocation")) return "maxAllocation";
    //   return ""; // Default fallback (optional)
    // };
  
    // const nameAndId = getNameAndId(label);

    // const getPlaceholder = (label) => {
    //   if (label === t("session_timeout")) return "Session Timeout";
    //   if (label === t("password_expiry")) return "Password Expiry";
    //   if (label === t("minimum_password")) return "Minimum Password";
    //   if (label === t("password_history")) return "Password History";
    //   if (label === t("max_allocation")) return "Max Allocation";
    //   return ""; // Default fallback (optional)
    // };
  
    // const placeholderData = getPlaceholder(label);

    const handleShowData = async (userlevel) => {
      try {
        const { success, dataUserLevel, message } = await userLevelSearch(userlevel);

        console.log("userLevelData: " + dataUserLevel.sessionTimeout);
        console.log("success?: " + success);

        if (success) {
          setUserLevelData([
            { label: t("session_timeout"), value: dataUserLevel.sessionTimeout },
            { label: t('password_expiry'), value: dataUserLevel.passwordExpiry },
            { label: t('minimum_password'), value: dataUserLevel.minimumPassword },
            { label: t('password_history'), value: dataUserLevel.passwordHistory },
            { label: t('max_allocation'), value: dataUserLevel.maxAllocation },
          ]);
        } else {
          console.log("HERE!");
          setUserLevelData([]);
          console.log(message);
        }

      } catch (error) {
        console.log("ERROR!");
        console.log(error.message);
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate form submission success or failure
    const isFormValid =
      userLevel &&
      formData.sessionTimeout &&
      formData.passwordExpiry &&
      formData.minimumPassword &&
      formData.passwordHistory &&
      formData.maxAllocation;

    if (isFormValid) {
      const response = await editUserLevel(formData);
      console.log("response: " + response);
      setModalState({
        isOpen: true,
        status: "success",
        message: "Edited User Level Successfully!",
      });

      ResetFormData(setFormData, initialFormData)();
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: "Failed to Edit User Level. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className=" p-6 rounded-2xl w-full max-w-4xl">
        {/* Fields Container */}
        <div className="border-2 border-[#23587C] bg-white p-4 rounded-2xl">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                {t("user_level")}
              </label>
              <select
                name="userLevel"
                id="userLevel"
                value={userLevel}
                onChange={(e) => {
                  const selectedLevel = e.target.value;
                  setUserLevel(selectedLevel);
                  handleShowData(selectedLevel);
                }}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select User Level</option>
                {levels.map((level) => (
                  <option key={level.USERSLEVEL} value={level.USERSLEVEL.toUpperCase()}>
                    {level.USERSLEVEL === 'TEMP1' ? 'TEMPORARY_NEW' : level.USERSLEVEL}
                  </option>
                ))}
              </select>
            </div>
            {userLevelData.map(( item, index ) => (
              <div key={index}>
                <label className="block text-gray-700 mb-1 truncate w-full">
                  {item.label}
                </label>
                <input 
                  type={
                    item.label === t("max_allocation") ? "number" : "text"
                  }
                  // name={nameAndId}
                  // id={nameAndId}
                  value={item.value || ''}
                  // placeholder={placeholderData}
                  // onChange={
                  //   item.label === t("max_allocation")
                  //   ? HandleChangeTextOnly(setFormData)
                  //   : HandleChangeDigitsOnly(setFormData)
                  // }
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#23587C] tracking-wide shadow-md rounded font-bold text-white py-2 px-6 hover:bg-[#1e4d6b] focus:outline-none focus:ring-2 focus:ring-[#1e4d6b]/50 focus:ring-offset-2"
          >
            {t("save_changes")}
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

      <ToastContainer />

    </div>
    
  );
};

export default EditUserLevel;