import React, { useState, useRef, useEffect } from "react";
import { FaUserLock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';

export default function PasswordModal({ onProceed = () => {}, handleClose = () => {} }) {

  const { t, i18n } = useTranslation();
  const [password, setPassword] = useState('');
  const inputRef = useRef(null); // Reference for the password input field

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value); // Update the password state
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <div className="flex flex-row justify-center items-center">
          <FaUserLock className="text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800 ml-2">{t('modal_authentication')}</h2>
        </div>

        <p className="text-gray-600 mb-6">
        {t('modal_please_enter_your')} <span className="font-bold">{t('modal_password')}</span>
        </p>

        {/* Controlled input for password */}
        <input
          type="password"
          ref={inputRef} // Attach the ref to the input
          className="mb-6 rounded shadow-outline border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
          placeholder="Password"
          value={password} 
          onChange={handleChange} 
        />

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6]"
            onClick={() => {
              if (password) {
                onProceed(); 
                handleClose(); 
              } else {
                toast.error('Please enter your password');
              }
            }}
          >
            {t('modal_proceed')}
          </button>
          <button
            className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010]"
            onClick={handleClose}
          >
            {t('modal_cancel')}
          </button>
        </div>
      </div>

      <ToastContainer />

    </div>
  );
}
