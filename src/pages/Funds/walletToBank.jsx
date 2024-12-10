import React, { useState } from 'react';
import StatusModal from '../../components/statusModal';
import PasswordModal from '../../components/PasswordModal';
import OTPModal from '../../components/OTPModal';
import { FaBuildingColumns } from 'react-icons/fa6';

const WalletToBank = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false); // OTP modal state
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });

  const handleAllocate = () => setPasswordModalOpen(true); // Open password modal on click
  const handleProceedPassword = () => {
    setPasswordModalOpen(false); // Close password modal
    setOTPModalOpen(true); // Open OTP modal
  };

  const handleProceedOTP = () => {
    setOTPModalOpen(false); // Close OTP modal
    setModalState({ isOpen: true, status: 'success', message: 'Transaction Successful!' }); // Show status modal
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-8 flex items-center text-center">
        <FaBuildingColumns className="text-[#D95F08] mr-2" />
        WALLET TO BANK
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-3xl border-2 border-[#23587C]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Bank</label>
            <select
              className="p-3 border rounded-md shadow-sm w-full focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option>Select Bank</option>
              <option>Bank A</option>
              <option>Bank B</option>
              <option>Bank C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Account Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border rounded-md shadow-sm w-full focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Account Number</label>
            <input
              type="text"
              placeholder="Account Number"
              className="p-3 border rounded-md shadow-sm w-full focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              placeholder="Amount"
              className="p-3 border rounded-md shadow-sm w-full focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <input
              type="text"
              placeholder="Remarks"
              className="p-3 border rounded-md shadow-sm w-full focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#23587C] text-white hover:bg-[#2C75A6] focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2"
          onClick={handleAllocate}
        >
          SUBMIT
        </button>
        <button className="px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#BFC3D2] text-gray-800 hover:bg-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2">
          RESET
        </button>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onProceed={handleProceedPassword}
        />
      )}

      {/* OTP Modal */}
      {isOTPModalOpen && (
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setOTPModalOpen(false)}
          onProceed={handleProceedOTP}
        />
      )}

      {/* Status Modal */}
      {modalState.isOpen && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
          status={modalState.status}
          message={modalState.message}
        />
      )}
    </div>
  );
};

export default WalletToBank;
