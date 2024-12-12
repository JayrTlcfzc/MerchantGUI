import React from 'react'
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa'
import StatusModal from './statusModal';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';


export default function ConfirmationModal ({ handleCloseModal, modalMessage, locked, setLocked, deactivated, setDeactivated, onProceed = () => {} }) {

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
          <div className="flex flex-row justify-center items-center">
            <FaExclamationCircle className="text-5xl" />
            <h2 className="text-3xl font-semibold text-gray-800 ml-2">
            {t('modal_confirmation')}
            </h2>
          </div>

          <p className="text-gray-600 mt-4 mb-6">
            {`${t('modal_are_you_sure_you_want_to')} `} 
            <span className="font-bold">{modalMessage}</span> {t('modal_this_user')}
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 text-white bg-[#0FBA00] rounded hover:bg-[#0E88004]"
              onClick={() => {
                onProceed(); 
                handleCloseModal();
              }}
            >
              {t('modal_yes')}
            </button>
            <button
              className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010]"
              onClick={handleCloseModal}
            >
              {t('modal_no')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}