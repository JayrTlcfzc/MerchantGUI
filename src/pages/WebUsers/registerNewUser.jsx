import React, { useState, useEffect } from "react";
import StatusModal from "../../components/Modals/statusModal";
import { FaUserPlus } from "react-icons/fa6";
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../../components/Validations'; 
import { useTranslation } from 'react-i18next';
import { userLevelCol, registerWebUser } from "../../api/webuser";

const RegisterNewUser = () => {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const initialFormData = {
    username: '',
    msisdn: '',
    otpMsisdn: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    department: '',
    userLevel: '',
    status: '',
  };

  const { t, i18n } = useTranslation();
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
      formData.username &&
      formData.msisdn &&
      formData.otpMsisdn &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.company &&
      formData.department &&
      formData.userLevel &&
      formData.status;
      console.log('register account',formData)
      if (isFormValid) {
        console.log('FormData:', formData);
        const response = await registerWebUser(formData);
        console.log(response);
        if(response.success){
          setModalState({
            isOpen: true,
            status: "success",
            message: response.message,
          });
          ResetFormData(setFormData, initialFormData)();
        } else{
          setModalState({
            isOpen: true,
            status: "error",
            message: response.message,
          });
        }
      } else {
        setModalState({
          isOpen: true,
          status: "error",
          message: "Failed to Add User. Please try again.",
        });
      }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Register New User Title outside of the border */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <FaUserPlus className="text-[#D95F08] mr-2" />
            {t('register_new_user')}
          </h2>

          <p className="text-gray-600">
            {t('register_new_user_instruction')}
          </p>
        </div>

        {/* Form container with border and new border color */}
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
    </div>
  );
};

export default RegisterNewUser;
