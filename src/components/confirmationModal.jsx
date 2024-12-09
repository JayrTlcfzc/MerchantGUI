import React from 'react'
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa'


export default function confirmationModal ({openModal, handleCloseModal, message, locked, setLocked, deactivated, setDeactivated}) {

  if (!openModal) return null;

return (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

    <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
      <div className='flex flex-row justify-center items-center'>
          <FaExclamationCircle className='text-5xl' />
          <h2 className="text-3xl font-semibold text-gray-800 ml-2">
          CONFIRMATION
          </h2>
      </div>

      <p className="text-gray-600 mt-4 mb-6">
        Are you sure you want to <span className='font-bold'>{message}</span> this user
      </p>

      <div className="flex justify-center gap-4">
          <button
              className="px-4 py-2 text-white bg-[#0FBA00] rounded hover:bg-[#0E8804]"
              onClick={handleCloseModal}
          >
              YES
          </button>
          <button
              className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010]"
              onClick={handleCloseModal}
          >
              NO
          </button>
      </div>
    </div>
  </div>
)
}