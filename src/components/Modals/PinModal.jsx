import React, { useState } from 'react';
import { FaUserLock } from 'react-icons/fa';

export default function PinModal({ onProceed = () => {}, handleClose = () => {} }) {
  const [pin, setPin] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // If the value is not a number, do not update
    if (isNaN(value) && value !== "") return;

    // Update the PIN value at the corresponding index
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to the next input if the current field is filled
    if (value !== "" && index < pin.length - 1) {
        document.getElementById(`pin-input-${index + 1}`).focus();
    }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <div className="flex flex-row justify-center items-center">
          <FaUserLock className="text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800 ml-2">AUTHENTICATION</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Please enter your <span className="font-bold">Pin</span>
        </p>

        <div className="flex justify-center space-x-2 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => {
                const value = e.target.value;
                if (isNaN(value) && value !== '') return;
                const newPin = [...pin];
                newPin[index] = value;
                setPin(newPin);
                if (value !== '' && index < pin.length - 1) {
                  document.getElementById(`pin-input-${index + 1}`).focus();
                }
              }}
              maxLength="1"
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6]"
            onClick={() => {
              onProceed();
              handleClose();
            }}
          >
            Proceed
          </button>
          <button
            className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010]"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
