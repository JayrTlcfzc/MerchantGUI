import React, { useState, useEffect } from "react";
import StatusModal from "../../../components/Modals/statusModal";
import {
  HandleChangeDigitsOnly2,
} from "../../../components/Validations";
import { useTranslation } from "react-i18next";
import { userLevelCol } from "../../../api/webuser";
import { editUserLevel, userLevelSearch } from "../../../api/manageUserLevels";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from '../../../components/Modals/loadingModal';
import { useNavigate } from 'react-router-dom';

const EditUserLevel = () => {
  const { t, i18n } = useTranslation();
  const [levels, setLevels] = useState([]);
  const [userLevel, setUserLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [initialUserLevelData, setInitialUserLevelData] = useState([]); // Store the initial data
  const [userLevelData, setUserLevelData] = useState([
    { label: t("session_timeout"), value: "", nameID: "sessionTimeout" },
    { label: t("password_expiry"), value: "", nameID: "passwordExpiry" },
    { label: t("minimum_password"), value: "", nameID: "MinimumPassword" },
    { label: t("password_history"), value: "", nameID: "passwordHistory" },
    { label: t("max_allocation"), value: "", nameID: "maxAllocation" },
  ]);

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
          if (result.logout) {
            toast.error(result.message);
            navigate('/login');
          } else if (result.success) {
            const parsedLevels = JSON.parse(result.level);
            if (Array.isArray(parsedLevels)) {
              setLevels(parsedLevels); 
            } else {
              toast.error(result.message || "Something went wrong!");
            }
          } else {
            toast.error(result.message || "Something went wrong!");
          }
        } catch (err) {
          toast.error(err.message || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      };
    
      fetchUserLevels();
    }, []);

    const handleShowData = async (userlevel) => {
      try {
        setLoading(true);
        const { success, dataUserLevel, message, logout } = await userLevelSearch(userlevel);

        if (logout) {
          toast.error(message);
          navigate('/login');
        } else if (success) {
          let parsedData;
            if (Array.isArray(dataUserLevel)) {
              parsedData = dataUserLevel[0]; 
            } else {
              parsedData = dataUserLevel; 
            }
            if (parsedData) {
              const newData = [
                { label: t("session_timeout"), value: parsedData.sessionTimeout, nameID: "sessionTimeout" },
                { label: t("password_expiry"), value: parsedData.passwordExpiry, nameID: "passwordExpiry" },
                { label: t("minimum_password"), value: parsedData.minimumPassword, nameID: "minimumPassword" },
                { label: t("password_history"), value: parsedData.passwordHistory, nameID: "passwordHistory" },
                { label: t("max_allocation"), value: parsedData.maxAllocation, nameID: "maxAllocation" },
              ];
              setUserLevelData(newData);
              setInitialUserLevelData(newData);
            } else {
              toast.error(result.message || "Parsed data is null or undefined!");
              setUserLevelData([]);
              setInitialUserLevelData([]);
            }
        } else {
          setUserLevelData([]);
        }

      } catch (error) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate form submission success or failure
    const isFormValid = userLevelData.every(
      (field) => field.value !== "" && field.value !== null
    );

    // Prepare the data for submission
    const formData = userLevelData.reduce((acc, field) => {
      acc[field.nameID] = field.value;
      return acc;
    }, {});

    formData.userLevel = userLevel;

    if (isFormValid) {
      try {
        setLoading(true);
        const response = await editUserLevel(formData);

        if (response.logout) {
          toast.error(response.message);
          navigate('/login');
        } else if (response.success) {
          setModalState({
            isOpen: true,
            status: "success",
            message: response.StatusMessage,
          });
        } else {
          setModalState({
            isOpen: true,
            status: "error",
            message: response.StatusMessage,
          });
        }
        
      } catch (error) {
        setModalState({
            isOpen: true,
            status: "error",
            message: error.StatusMessage || t("modal_failed_to_edit_user_level"),
        });
      } finally {
        setLoading(false);
      }
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: t('modal_failed_to_edit_user_level'),
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      {loading && (<LoadingModal />)}

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
                  type="number"
                  name={item.nameID}
                  id={item.nameID}
                  value={item.value}
                  placeholder={item.label}
                  onChange={HandleChangeDigitsOnly2(setUserLevelData)}
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