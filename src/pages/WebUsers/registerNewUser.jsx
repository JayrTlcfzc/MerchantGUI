import React, { useState, useEffect } from "react";
import StatusModal from "../../components/Modals/statusModal";
import { FaUserPlus } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../../components/Validations'; 
import { useTranslation } from 'react-i18next';
import { userLevelCol, registerWebUser } from "../../api/webuser";
import LoadingModal from '../../components/Modals/loadingModal';
import { useNavigate } from 'react-router-dom';

const RegisterNewUser = () => {

  const initialFormData = {
    username: '',
    msisdn: '',
    otpMsisdn: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    department: '',
    userLevel: 'ADMIN',
    status: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const { t, i18n } = useTranslation();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
              toast.error(t('invalid_userlevel_data_format'));
            }
        } else {
          toast.error(result.message || t('invalid_userlevel_data_format'));
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserLevels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert necessary fields to uppercase
    const formattedData = {
      ...formData,
      username: formData.username.toUpperCase(),
      firstName: formData.firstName.toUpperCase(),
      lastName: formData.lastName.toUpperCase(),
      email: formData.email.toUpperCase(),
      company: formData.company.toUpperCase(),
      department: formData.department.toUpperCase(),
      userLevel: formData.userLevel?.toUpperCase(), // Ensure optional fields don't cause errors
      status: formData.status.toUpperCase(),
    };
  
    // Validate form fields
    const isFormValid = Object.values(formattedData).every(value => value !== "");
  
    if (!isFormValid) {
      setModalState({
        isOpen: true,
        status: "error",
        message: t('modal_failed_to_add_user'),
      });
      return;
    }
  
    setLoading(true);
    try {
      const response = await registerWebUser(formattedData);
  
      if (response.logout) {
        toast.error(response.message);
        navigate('/login');
        return;
      }
  
      if (response.StatusCode === 0) {
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
          message: response.StatusMessage,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center p-4">
      {loading && (<LoadingModal />)}

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <FaUserPlus className="text-[#D95F08] mr-2" />
            {t('register_new_user')}
          </h2>

          <p className="text-gray-600">
            {t('register_new_user_instruction')}
          </p>
        </div>

        <div className="border-2 border-[#23587C] rounded-2xl p-8 bg-white shadow-lg">
          <span className="font-bold text-2xl text-[#23587C] mb-10">
          {t('account_details')}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('username')}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder="Enter username"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"  
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('msisdn')}
              </label>
              <input
                type="text"
                name="msisdn"
                id="msisdn"
                value={formData.msisdn}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder="Enter MSISDN"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                maxLength={15}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('otp_msisdn')}
              </label>
              <input
                type="text"
                name="otpMsisdn"
                id="otpMsisdn"
                value={formData.otpMsisdn}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder="Enter OTP MSISDN"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                maxLength={15}
              />
            </div>

            {/* Additional fields */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('first_name')}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName.toUpperCase()}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder="Enter first name"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('last_name')}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName.toUpperCase()}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder="Enter last name"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('company')}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder="Enter company"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('department')}
              </label>
              <input
                type="text"
                name="department"
                id="department"
                value={formData.department.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder="Enter department"
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('user_level')}
              </label>
              <select
                name="userLevel"
                id="userLevel"
                value={formData.userLevel}
                onChange={HandleChange(setFormData)}
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                required
              >
                <option value="">Select User Level</option>
                {levels.map((level) => (
                  <option key={level.USERSLEVEL} value={level.USERSLEVEL.toUpperCase()}>
                    {level.USERSLEVEL}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
              {t('status')}
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={HandleChange(setFormData)}
                className="w-full px-4 py-2 rounded-lg border border-[#23587C] focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                required
              >
                <option value="">Select status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="DEACTIVE">DEACTIVE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit button outside the border */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 tracking-wide shadow-md rounded font-bold bg-[#23587C] text-white hover:bg-[#2C75A6] focus:outline-none focus:ring-2 focus:ring-[#1e4f6a]/50 focus:ring-offset-2"
          >
            {t('submit')}
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

      <ToastContainer />
      
    </div>
  );
};

export default RegisterNewUser;
