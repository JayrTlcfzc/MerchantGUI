import React from 'react'
import { useState } from 'react';
import { FaUserLock } from 'react-icons/fa'

export default function PasswordModal ({handleClose=()=>{}}) {
    const [password, setPassword] = useState("");

    const handleChange = (e, index) => {
        const value = e.target.value;
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
              Please enter your <span className='font-bold'>Password</span>
            </p>

            <input type='password' className='mb-6 rounded shadow-outline border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent' placeholder='Password' />

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
