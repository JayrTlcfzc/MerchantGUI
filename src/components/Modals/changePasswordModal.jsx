import React, { useState } from 'react';
import { X } from "lucide-react";
import ConfirmationModal from './confirmationModal';
import StatusModal from './statusModal';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordModal({ handleClose = () => {} }) {

    const { t, i18n } = useTranslation();
    
    // State to manage form data
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // State to manage modals and messages
    const [openModal, setOpenModal] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalState, setModalState] = useState({
        isOpen: false,
        status: '',
        message: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Open confirmation modal with a specific message
    const handleOpenModal = (modalMessage) => {
        setModalMessage(modalMessage);
        setOpenModal('confirmationModal');
    };

    // Close confirmation modal
    const handleCloseModal = () => {
        setOpenModal('');
        setModalMessage('');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = formData.oldPassword && formData.newPassword && formData.confirmPassword;
        if (isFormValid) {
            console.log('Form Submitted', formData);
            setModalState({
                isOpen: true,
                status: 'success',
                message: `${t('modal_password_changed_successfully')}`
            });
        } else {
            setModalState({
                isOpen: true,
                status: 'error',
                message: `${t('modal_changing_password_failed')}`
            });
        }
    };

    return (
        <div className="fixed -inset-2 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full pb-6 border-2 border-[#D95F08]">
                <div className='flex justify-between flex-row items-center bg-[#D95F08] rounded-t-sx p-2'>
                    <div className='flex flex-row'>
                        <h2 className="text-xl font-semibold text-white">
                        {t('modal_change_password')}
                        </h2>
                    </div>
                    <div>
                        <X className='cursor-pointer text-white' onClick={handleClose} />
                    </div>
                </div>

                {/* Input fields */}
                <form className="flex flex-col gap-6 mb-8 mt-6 mx-6">
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="oldPassword">{t('modal_old_password')}</label>
                        <input
                            type='password'
                            name="oldPassword"
                            id="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="Enter old password"
                            className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        />
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="newPassword">{t('modal_new_password')}</label>
                        <input
                            type='password'
                            name="newPassword"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        />
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="confirmPassword">{t('modal_confirm_password')}</label>
                        <input
                            type='password'
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter new password"
                            className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        />
                    </div>
                    <div className='flex justify-center gap-2'>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2"
                        >
                            {t('submit')}
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#F71010]/50 focus:ring-offset-2"
                            onClick={handleClose}
                        >
                            {t('modal_cancel')}
                        </button>
                    </div>
                </form>
            </div>
            {openModal === 'confirmationModal' && (
                <ConfirmationModal
                    openModal={Boolean(openModal)}
                    modalMessage={modalMessage}
                    handleCloseModal={handleCloseModal}
                    onClose={() => {
                        handleSubmit()
                    }}
                />
            )}
            <StatusModal
                isOpen={modalState.isOpen}
                onClose={() => {
                    setModalState((prev) => ({ ...prev, isOpen: false }));
                    if (modalState.status === 'success') {
                        handleClose();
                    }
                }}
                status={modalState.status}
                message={modalState.message}
            />
        </div>
    );
}
