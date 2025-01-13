import React, { useState } from 'react';
import StatusModal from '../../components/Modals/statusModal';
import OTPModal from '../../components/Modals/OTPModal';
import PasswordModal from '../../components/Modals/PasswordModal';
import PinModal from '../../components/Modals/PinModal';
import { FaMoneyBills } from 'react-icons/fa6';
import { HandleChange, HandleChangeDigitsOnly, ResetFormData } from '../../components/Validations';
import { useTranslation } from 'react-i18next';
import { allocateCash, allocateOtpRequest } from '../../api/allocateCash'

const AllocateCash = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });
  const [pinValue, setPinValue] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const { t } = useTranslation();

  // Initial input state
  const initialFormData = {
    destmsisdn: '',
    amount: '',
    remarks: '',
    pin: '',
    otp: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleAllocate = () => setPasswordModalOpen(true); // Open password modal on click

  const handleProceedPassword = () => {
    setPasswordModalOpen(false); // Close password modal
    setPinModalOpen(true); // Open pin modal
  };

  const handleProceedPin = async (pin) => {
    setPinValue(pin);
    setFormData((prevData) => ({ ...prevData, pin })); // Store the PIN in formData
    setPinModalOpen(false);
    setOTPModalOpen(true);

    try {
      const res = await allocateOtpRequest();
      console.log("Allocate otp Response:", res);
    } catch (error) {
      console.error("Error in allocation:", error);
      setModalState({ isOpen: true, status: "error", message: error.message });
    } finally {
      ResetFormData(setFormData, initialFormData);
    }

  };
  

  const handleProceedOTP = async (otp) => {
    setOtpValue(otp);
    const updatedFormData = { ...formData, otp }; // Include OTP in form data
    setFormData(updatedFormData);
    setOTPModalOpen(false);
  
    try {
      const res = await allocateCash(updatedFormData);
      console.log("Allocate Cash Response:", res);
      setModalState({ isOpen: true, status: res.success ? "success" : "error", message: res.message });
    } catch (error) {
      console.error("Error in allocation:", error);
      setModalState({ isOpen: true, status: "error", message: error.message });
    } finally {
      ResetFormData(setFormData, initialFormData);
    }
  };
  
  

  // Check if all required fields have values
  const isFormValid = formData.destmsisdn && formData.amount && formData.remarks;


  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center text-center">
        <FaMoneyBills className="text-[#D95F08] mr-2" />
        {t('allocate_cash')}
      </h2>

      {/* Form Inputs */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl border-2 border-[#23587C]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2">{t('recipient_mobile_number')}</label>
            <input
              type="text"
              name="destmsisdn"
              value={formData.destmsisdn}
              onChange={HandleChangeDigitsOnly(setFormData)}
              maxLength="15"
              placeholder={t('recipient_mobile_number')}
              className="p-3 border rounded-md shadow-sm w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2">{t('amount')}</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={HandleChangeDigitsOnly(setFormData)}
              placeholder={t('amount')}
              className="p-3 border rounded-md shadow-sm w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-2">{t('remarks')}</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={HandleChange(setFormData)}
              placeholder={t('remarks')}
              className="p-3 border rounded-md shadow-sm w-full"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          className={`px-8 py-3 rounded-lg font-bold text-white ${
            isFormValid ? 'bg-[#23587C]' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleAllocate}
          disabled={!isFormValid}
        >
          {t('allocate')}
        </button>
        <button
          className="px-8 py-3 rounded-lg bg-[#BFC3D2]"
          onClick={ResetFormData(setFormData, initialFormData)}
        >
          {t('reset')}
        </button>
      </div>

      {/* Modals */}
      {isPasswordModalOpen && (
        <PasswordModal isOpen onClose={() => setPasswordModalOpen(false)} onProceed={handleProceedPassword} />
      )}
      {isPinModalOpen && (
  <PinModal
    isOpen={isPinModalOpen}
    onClose={() => setPinModalOpen(false)}
    onProceed={handleProceedPin} // Capture the entered PIN
  />
)}

{isOTPModalOpen && (
  <OTPModal
  isOpen={isOTPModalOpen}
  handleClose={() => setOTPModalOpen(false)}
  onProceed={handleProceedOTP} // Capture the entered OTP
/>
)}
      {modalState.isOpen && (
        <StatusModal
          isOpen
          status={modalState.status}
          message={modalState.message}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
};

export default AllocateCash;
