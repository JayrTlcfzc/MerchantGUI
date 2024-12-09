import React, { useState } from 'react';
import StatusModal from '../../components/statusModal';

const Modal = ({ isOpen, onClose, title, children, onProceed, proceedLabel, cancelLabel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          {title}
        </h2>
        <div className="mb-6 text-center">{children}</div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {cancelLabel || 'Cancel'}
          </button>
          <button
            onClick={onProceed}
            className="px-4 py-2 bg-[#23587C] text-white rounded hover:bg-blue-600"
          >
            {proceedLabel || 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WalletToBank = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });

  const handleAllocate = () => setPasswordModalOpen(true);
  const handleProceedPassword = () => {
    setPasswordModalOpen(false);
    setPinModalOpen(true);
  };
  const handleProceedPin = () => {
    setPinModalOpen(false);
    setModalState({ isOpen: true, status: 'success', message: 'Transaction Successful!' });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-center">
        Wallet To Bank
      </h1>
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
          className="px-6 py-2 bg-[#23587C] text-white rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
          onClick={handleAllocate}
        >
          Submit
        </button>
        <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:ring focus:ring-gray-300">
          Reset
        </button>
      </div>

      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Authentication"
        proceedLabel="Proceed"
        cancelLabel="Cancel"
        onProceed={handleProceedPassword}
      >
        <p className="mb-4 text-center">Please enter your <strong>Password</strong></p>
        <input
          type="password"
          className="p-3 border rounded-md shadow-sm w-full focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Password"
        />
      </Modal>

      {/* PIN Modal */}
      <Modal
        isOpen={isPinModalOpen}
        onClose={() => setPinModalOpen(false)}
        title="Authentication"
        proceedLabel="Proceed"
        cancelLabel="Cancel"
        onProceed={handleProceedPin}
      >
        <p className="mb-4 text-center">Please enter your <strong>PIN</strong></p>
        <div className="flex justify-center gap-2">
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="p-3 border rounded-md shadow-sm w-12 text-center focus:ring focus:ring-blue-300 focus:outline-none"
            />
          ))}
        </div>
      </Modal>

      {/* Status Modal */}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        status={modalState.status}
        message={modalState.message}
      />
    </div>
  );
};

export default WalletToBank;
