import React, { useState, useRef, useEffect } from "react";
import LoginImage from "../assets/LoginImage.png";
import OTPModal from "../components/Modals/OTPModal";
import { handleChange, handleChangeDigitsOnly } from "../components/Validations";
import { toast, ToastContainer } from "react-toastify";
import { Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { verifyCredentials, verifyOTP } from "../api/login";
import { Navigate, useNavigate } from 'react-router-dom';


// import PasswordModal from "../components/Modals/PasswordModal";
// import PinModal from "../components/Modals/PinModal";

const Login = () => {

  const initialFormData = {
    msisdn: '',
    username: '',
    password: ''
  };


  const [otpFromServer, setOtpFromServer] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const { t, i18n } = useTranslation(); // Access i18n instance
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = formData.msisdn && formData.username && formData.password;
  
    if (isFormValid) {
      try {
        const { success, message, otp } = await verifyCredentials(
          formData.msisdn,
          formData.username,
          formData.password
        );
  
        if (success) {
          setOtpFromServer(otp); // Store OTP sent by mock server
          setOpenModal("OTPModal"); // Open OTP modal
        }else{
          console.log("Error message: ", message);
          toast.error(message);
        
        }
      } catch (error) {
        toast.error(error.message || "Login Error");
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };  

  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Handle language change
  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Update language globally
    setIsLanguageDropdownOpen(false); // Close dropdown after selection
  };

  // Handle clicks inside language dropdown
  const handleClickInsideLanguageDropdown = (event) => {
    event.stopPropagation();
  };

  // Dropdown closing state handler
  const handleClickOutside = (event) => {
    if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
      setIsLanguageDropdownOpen(false);
    }
  };

  // Event Listener to detect clicks outside dropdowns
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-row min-h-screen bg-white">
      <ToastContainer />
      <div className="w-full h-screen hidden md:block">
        <img
          src={LoginImage}
          className="max-content h-full object-cover"
          alt="Login Illustration"
        />
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col min-h-screen items-center justify-center w-full">
        <div className="w-full max-w-sm p-6 sm:max-w-md lg:max-w-lg shadow-lg md:shadow-none">
          <h2 className="mb-6 text-5xl font-bold text-center text-gray-800 tracking-wider">
            {t('login')}
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="msisdn"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                {t('msisdn')}
              </label>
              <input
                type="text"
                id="msisdn"
                name="msisdn"
                value={formData.msisdn}
                onKeyDown={handleEnterPress}
                onChange={handleChangeDigitsOnly(setFormData)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
                placeholder={t('Enter your MSISDN')}
                required
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                {t('username')}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onKeyDown={handleEnterPress}
                onChange={handleChange(setFormData)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
                placeholder={t('Enter your username')}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                {t('login_password')}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange(setFormData)}
                onKeyDown={handleEnterPress}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
                placeholder={t('********************')}
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="mr-2 w-4 h-4 cursor-pointer rounded"
              />
              <label>{t('login_show_password')}</label>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-80 px-4 py-2 font-medium text-white bg-[#23587C] rounded hover:bg-[#2C75A6] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                {t('login')}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 cursor-pointer">
        <Globe
          size={34}
          color={isLanguageDropdownOpen ? "#2C75A6" : "#215376"}
          onClick={toggleLanguageDropdown}
        />
        {isLanguageDropdownOpen && (
          <div
            className="absolute bottom-full right-0 mb-2 w-40 bg-[#23587C] rounded-tl-lg rounded-tr-2xl rounded-bl-2xl border border-gray-100"
            ref={languageDropdownRef}
            onClick={handleClickInsideLanguageDropdown}
          >
            <div className="p-4">
              <button
                onClick={() => {changeLanguage('en');}}
                className="block mt-2 w-full text-left px-4 text-white hover:text-[#FCAD74]"
              >
                English
              </button>
              <button
                onClick={() => {changeLanguage('fr');}}
                className="block mt-2 w-full text-left px-4 text-white hover:text-[#FCAD74]"
              >
                Français
              </button>
            </div>
          </div>
        )}
      </div>

      
     

      {openModal === "OTPModal" && (
          <OTPModal
            onProceed={async (enteredOtp) => {
              try {
                const { success, message } = await verifyOTP(enteredOtp, formData.msisdn);
                if (success) {
                  toast.success(message);
                  setOpenModal(""); 
                  navigate('/dashboard');
                }
              } catch (error) {
                toast.error(error.message || "Invalid OTP");
              }
            }}
            handleClose={() => setOpenModal("")}
          />
        )}

      {/* <PasswordModal openModal={Boolean(openModal)} handleClose={() => setOpenModal('')} /> */}
      {/* <PinModal openModal={Boolean(openModal)} handleClose={() to setOpenModal('')} /> */}
    </div>
  );
};

export default Login;
