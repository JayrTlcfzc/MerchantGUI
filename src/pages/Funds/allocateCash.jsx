import React, { useState } from 'react';
import StatusModal from '../../components/Modals/statusModal';
import OTPModal from '../../components/Modals/OTPModal';
import PasswordModal from '../../components/Modals/PasswordModal';
import PinModal from '../../components/Modals/PinModal';
import { FaMoneyBills } from 'react-icons/fa6';

const AllocateCash = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false); // For OTP modal, if needed
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });

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
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center text-center">
        <FaMoneyBills className="text-[#D95F08] mr-2" />
        ALLOCATE CASH
      </h2>
      <div className="bg-white p-6 rounded-2xl shadow-md w-11/12 max-w-3xl border-2 border-[#23587C]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Recipient Mobile Number</label>
            <input
              type="text"
              placeholder="Recipient Mobile Number"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              placeholder="Amount"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <input
              type="text"
              placeholder="Remarks"
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#23587C] hover:bg-[#2C75A6] text-white focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2"
          onClick={handleAllocate}
        >
          ALLOCATE
        </button>
        <button className="px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#BFC3D2] hover:bg-[#9D9D9D] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2">
          RESET
        </button>
      </div>

      {/* Conditionally render modals based on isOpen state */}

      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onProceed={handleProceedPassword}
        />
      )}

      {isPinModalOpen && (
        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setPinModalOpen(false)}
          onProceed={handleProceedPin}
        />
      )}

      {isOTPModalOpen && (
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setOTPModalOpen(false)}
          onProceed={handleProceedOTP}
        />
      )}

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

export default AllocateCash;
