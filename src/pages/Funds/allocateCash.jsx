import React, { useState } from 'react';
import StatusModal from '../../components/Modals/statusModal';
import OTPModal from '../../components/Modals/OTPModal';
import PasswordModal from '../../components/Modals/PasswordModal';
import PinModal from '../../components/Modals/PinModal';
import { FaMoneyBills } from 'react-icons/fa6';
import { handleChange, handleChangeDigitsOnly, resetFormData } from '../../components/Validations';
import { useTranslation } from 'react-i18next';


const AllocateCash = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });

  const { t, i18n } = useTranslation();

  // Setting initial input
  const initialFormData = {
    recipientmobilenum: '',
    amount: '',
    remarks: '',
  };
  
  // Passing input
  const [formData, setFormData] = useState(initialFormData);

  const handleAllocate = () => setPasswordModalOpen(true); // Open password modal on click
  const handleProceedPassword = () => {
    setPasswordModalOpen(false); // Close password modal
    setPinModalOpen(true); // Open pin modal
  };

  const handleProceedPin = () => {
    setPinModalOpen(false); // Close pin modal
    setOTPModalOpen(true); // Open OTP modal if needed
  };
  
  const handleProceedOTP = () => {
    setOTPModalOpen(false); // Close OTP modal
    setModalState({ isOpen: true, status: 'success', message: 'Cash Allocated Successfully!' }); // Show status modal
    resetFormData(setFormData, initialFormData)(); // Reset inputfields on success
  };

  // Check if all fields have values
  const isFormValid = formData.recipientmobilenum && formData.amount && formData.remarks;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center text-center">
    <FaMoneyBills className="text-[#D95F08] mr-2" />
    {t('allocate_cash')}
  </h2>
  <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl border-2 border-[#23587C]">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="flex flex-col">
        <label 
          className="block text-sm font-medium mb-2 truncate" 
          title={t('recipient_mobile_number')} // Tooltip for full label
        >
          {t('recipient_mobile_number')}
        </label>
        <input
          type="text"
          name="recipientmobilenum"
          value={formData.recipientmobilenum}
          onChange={handleChangeDigitsOnly(setFormData)}
          maxLength="15"
          placeholder={t('recipient_mobile_number')}
          className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
        />
      </div>
      <div className="flex flex-col">
        <label 
          className="block text-sm font-medium mb-2 truncate" 
          title={t('amount')} // Tooltip for full label
        >
          {t('amount')}
        </label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChangeDigitsOnly(setFormData)}
          placeholder={t('amount')}
          className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
        />
      </div>
      <div className="flex flex-col">
        <label 
          className="block text-sm font-medium mb-2 truncate" 
          title={t('remarks')} // Tooltip for full label
        >
          {t('remarks')}
        </label>
        <input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange(setFormData)} // Using general handleChange for remarks
          placeholder={t('remarks')}
          className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
        />
      </div>
    </div>
  </div>
  <div className="flex justify-center gap-6 mt-6">
    <button
      className={`px-8 py-3 tracking-wide shadow-md rounded-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isFormValid ? 'bg-[#23587C] hover:bg-[#2C75A6] focus:ring-[#2C75A6]/50' : 'bg-gray-300 cursor-not-allowed'
      }`}
      onClick={handleAllocate}
      disabled={!isFormValid}
    >
      {t('allocate')}
    </button>
    <button 
      className="px-8 py-3 tracking-wide shadow-md rounded-lg font-bold bg-[#BFC3D2] hover:bg-[#9D9D9D] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2"
      onClick={resetFormData(setFormData, initialFormData)} // Reset inputfields
    >
      {t('reset')}
    </button>
  </div>

      {/* Conditionally render modals based on isOpen state */}
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onProceed={handleProceedPassword}
          handleClose={() => setPasswordModalOpen(false)}
        />
      )}

      {isPinModalOpen && (
        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setPinModalOpen(false)}
          onProceed={handleProceedPin}
          handleClose={() => setPinModalOpen(false)}
        />
      )}

      {isOTPModalOpen && (
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setOTPModalOpen(false)}
          onProceed={handleProceedOTP}
          handleClose={() => setOTPModalOpen(false)}
        />
      )}

      {modalState.isOpen && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={() => {
            setModalState(prev => ({ ...prev, isOpen: false }));
            if (modalState.status === 'success') {
              resetFormData(setFormData, initialFormData)(); // Reset inputfields when success modal closes
            }
          }}
          status={modalState.status}
          message={modalState.message}
        />
      )}
    </div>
  );
};

export default AllocateCash;
