import React, { useState } from "react";
import StatusModal from "../../../components/Modals/statusModal";
import { HandleChange, ResetFormData } from "../../../components/Validations";
import { useTranslation } from "react-i18next";
import { addUsersModuleRel } from "../../../api/manageUserLevels";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from '../../../components/Modals/loadingModal';
import { useNavigate } from 'react-router-dom';

const AddUsersModuleRel = () => {
  const initialFormData = {
    description: "",
    module: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = formData.description && formData.module;

    if (isFormValid) {
      try {
        setLoading(true);
        const response = await addUsersModuleRel(formData);

        if (response.logout) {
          toast.error(response.message);
          navigate('/login');
        } else if (response.StatusCode === 0) {
          setModalState({
            isOpen: true,
            status: "success",
            message: response.StatusMessage,
          });
          ResetFormData(setFormData, initialFormData)();
        } else {
          setModalState({
            isOpen: true,
            status: "error",
            message: response.StatusMessage || t('modal_failed_to_add_user_level'),
          });
        }
      } catch (error) {
        setModalState({
          isOpen: true,
          status: "error",
          message: error.StatusMessage || t('modal_failed_to_add_user_level'),
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill up the form');
      setModalState({
        isOpen: true,
        status: "error",
        message: t('modal_failed_to_add_user_level'),
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      {loading && (<LoadingModal />)}

      <form className="p-6 w-full max-w-md space-y-4 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {t('add_users_module_rel')}
        </h2>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">
            {t("description")}
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={HandleChange(setFormData)}
            className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            placeholder={t("enter_description")}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">
            {t("module")}
          </label>
          <input
            type="text"
            name="module"
            value={formData.module}
            onChange={HandleChange(setFormData)}
            className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            placeholder={t("enter_module")}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#23587C] text-white font-bold py-2 rounded-md hover:bg-[#1e4d6b] focus:outline-none focus:ring-2 focus:ring-[#1e4d6b]/50"
          >
            {t("add")}
          </button>
        </div>
      </form>

      <ToastContainer />

      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        status={modalState.status}
        message={modalState.message}
      />
    </div>
  );
};

export default AddUsersModuleRel;
