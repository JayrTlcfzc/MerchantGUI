import React, { useState } from 'react';
import StatusModal from '../../components/Modals/statusModal';
import PasswordModal from '../../components/Modals/PasswordModal';
import OTPModal from '../../components/Modals/OTPModal';
import { FaBuildingColumns } from 'react-icons/fa6';
import { handleChange, handleChangeDigitsOnly, handleChangeTextOnly, resetFormData } from '../../components/Validations'; // Import validation and reset functions

const WalletToBank = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false); // OTP modal state
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });

  // Setting initial input
  const initialFormData = {
    bank: '',
    bankaccountfullname: '',
    bankaccountnumber: '',
    amount: '',
    remarks: '',
  };

  // Passing input
  const [formData, setFormData] = useState(initialFormData);

  // Check if all fields have values
  const isFormValid = formData.bank && formData.bankaccountfullname && formData.bankaccountnumber && formData.amount && formData.remarks;

  const handleAllocate = () => setPasswordModalOpen(true); // Open password modal on click
  const handleProceedPassword = () => {
    setPasswordModalOpen(false); // Close password modal
    setOTPModalOpen(true); // Open OTP modal
  };

  const handleProceedOTP = () => {
    setOTPModalOpen(false); // Close OTP modal
    setModalState({ isOpen: true, status: 'success', message: 'Transaction Successful!' }); // Show status modal
    resetFormData(setFormData, initialFormData)(); // Resetting formData on success
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-center">
        <FaBuildingColumns className="text-[#D95F08] mr-2" />
        WALLET TO BANK
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-3xl border-2 border-[#23587C]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Bank</label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange(setFormData)}
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            >
              <option value="">Select Bank</option>
              <option value="Bank A">Bank A</option>
              <option value="Bank B">Bank B</option>
              <option value="Bank C">Bank C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Account Full Name</label>
            <input
              type="text"
              name="bankaccountfullname"
              value={formData.bankaccountfullname}
              onChange={handleChangeTextOnly(setFormData)}
              placeholder="Full Name"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Account Number</label>
            <input
              type="text"
              name="bankaccountnumber"
              value={formData.bankaccountnumber}
              onChange={handleChangeDigitsOnly(setFormData)}
              placeholder="Account Number"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChangeDigitsOnly(setFormData)}
              placeholder="Amount"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange(setFormData)} // Using general handleChange for remarks
              placeholder="Remarks"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className={`px-6 py-2 tracking-wide shadow-md rounded font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFormValid ? 'bg-[#23587C] hover:bg-[#2C75A6] focus:ring-[#2C75A6]/50' : 'bg-gray-300 cursor-not-allowed'}`}
          onClick={handleAllocate}
          disabled={!isFormValid}
        >
          SUBMIT
        </button>
        <button 
          className="px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#BFC3D2] text-gray-800 hover:bg-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2"
          onClick={resetFormData(setFormData, initialFormData)} // Resetting form
        >
          RESET
        </button>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onProceed={handleProceedPassword}
          handleClose={() => setPasswordModalOpen(false)}
        />
      )}

      {/* OTP Modal */}
      {isOTPModalOpen && (
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setOTPModalOpen(false)}
          onProceed={handleProceedOTP}
          handleClose={() => setOTPModalOpen(false)}
        />
      )}

      {/* Status Modal */}
      {modalState.isOpen && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={() => {
            setModalState(prev => ({ ...prev, isOpen: false }));
            if (modalState.status === 'success') {
              resetFormData(setFormData, initialFormData)(); // Resetting formData when modal closes on success
            }
          }}
          status={modalState.status}
          message={modalState.message}
        />
      )}
    </div>
  );
};

export default WalletToBank;
