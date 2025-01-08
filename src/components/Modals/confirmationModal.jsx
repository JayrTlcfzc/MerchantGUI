import React, { useEffect, useRef } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { lockWebUser, unlockWebUser } from "../../api/webUserSearch";
import StatusModal from './statusModal';

export default function ConfirmationModal({
  handleCloseModal,
  modalMessage,
  modalUsername,
  locked,
  setLocked,
  deactivated,
  setDeactivated,
  onProceed = () => {},
}) {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Focus on the modal container when it opens
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const closeAllModals = () => {
    handleCloseModal(); // Close the modal
  };
  
  
  const handleSubmit = async () => {
    if (modalMessage === "LOCKED") {
      try {
        const result = await lockWebUser(modalUsername);
        console.log('result', result);

        if (result.success) {
          console.log('yes')
          // toast.success(result.message);
          setLocked(true);

          onProceed(result); 
          setTimeout(() => {
            closeAllModals();
          }, 1000)
        } else {
          toast.error(result.message || t('lock_failed'));
        }
      } catch (error) {
        toast.error(t('lock_failed'));
        console.error('Error locking user:', error);
      }
    }

    if (modalMessage === "UNLOCKED") {
      try {
        const result = await unlockWebUser(modalUsername);

        console.log('result', result);

        if (result.success) {
          console.log('yes')
          // toast.success(result.message);
          setLocked(false);

          onProceed(result); 
  
          setTimeout(() => {
            closeAllModals();
          }, 1000)
        } else {
          toast.error(result.message || t('lock_failed'));
        }
      } catch (error) {
        toast.error(t('lock_failed'));
        console.error('Error locking user:', error);
      }
    }


  };
  

  return (
    <div
      tabIndex={-1} // Makes the div focusable
      ref={modalRef} // Ref for focusing
      onKeyDown={handleEnterPress}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >

      <ToastContainer />
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
            onClick={handleSubmit}
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
  );
}
