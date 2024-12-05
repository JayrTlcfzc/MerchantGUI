import React from 'react'
import { useState } from 'react';
import { FaUserLock } from 'react-icons/fa'

export default function OTP ({handleClose=()=>{}}) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        // If the value is not a number, do not update
        if (isNaN(value) && value!=="") return;

        // Update the OTP value at the corresponding index
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input if the current field is filled
        if(value !== "" && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace to move to the previous input
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <div className='flex flex-row justify-center items-center'>
                <FaUserLock className='text-2xl' />
                <h2 className="text-2xl font-semibold text-gray-800 ml-2">
                AUTHENTICATION
                </h2>
            </div>

            <p className="text-gray-600 mb-6">
              Please enter your <span className='font-bold'>One-Time Password</span>
            </p>

            <div className="flex justify-center space-x-2 mb-4">
                {otp.map((digit, index) => (
                    <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6]"
                    onClick={handleClose}
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
  )
}
