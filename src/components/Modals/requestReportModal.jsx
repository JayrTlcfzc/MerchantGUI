import React, { useState } from 'react';
import { X } from "lucide-react";
import ConfirmationModal from './confirmationModal';
import StatusModal from './statusModal';
import { handleChange, handleChangeDigitsOnly, handleChangeTextOnly, resetFormData } from '../Validations';

export default function RequestReportsModal({ handleClose = () => {} }) {

    const initialFormData = {
        reportType: '',
        msisdn: '',
        dateFrom: '',
        dateTo: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);

    // State to manage modals and messages
    const [openModal, setOpenModal] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalState, setModalState] = useState({
        isOpen: false,
        status: '',
        message: ''
    });

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
        const isFormValid = formData.reportType && formData.msisdn && formData.dateFrom && formData.dateTo;

        if (isFormValid) {
            setModalState({
                isOpen: true,
                status: 'success',
                message: 'Report request submitted successfully!'
            });
            resetFormData(setFormData, initialFormData)();

        } else {
            setModalState({
                isOpen: true,
                status: 'error',
                message: 'Please fill in all required fields.'
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full pb-6 border-2 border-[#D95F08]">
                <div className='flex justify-between flex-row items-center bg-[#D95F08] rounded-t-sx p-2'>
                    <div className='flex flex-row'>
                        <h2 className="text-xl font-semibold text-white">
                            REQUEST REPORTS
                        </h2>
                    </div>
                    <div>
                        <X className='cursor-pointer text-white' onClick={handleClose} />
                    </div>
                </div>

                {/* Input fields */}
                <form className="flex flex-col gap-6 mb-8 mt-6 mx-6">
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="reportType">Types of Report</label>
                        <select
                            name="reportType"
                            id="reportType"
                            value={formData.reportType}
                            onChange={handleChange(setFormData)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        >
                            <option>Select Type of Report</option>
                            <option value="Transaction Money">Transaction Money</option>
                            <option value="User Registration">User Registration</option>
                            <option value="Wallet To Bank">Wallet To Bank</option>
                        </select>
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="msisdn">MSISDN</label>
                        <input
                            name="msisdn"
                            id="msisdn"
                            value={formData.msisdn}
                            onChange={handleChangeDigitsOnly(setFormData)}
                            placeholder="MSISDN"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        />
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="dateFrom">Date From</label>
                        <input
                            type="date"
                            name="dateFrom"
                            id="dateFrom"
                            value={formData.dateFrom}
                            onChange={handleChange(setFormData)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        />
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="dateTo">Date To</label>
                        <input
                            type="date"
                            name="dateTo"
                            id="dateTo"
                            value={formData.dateTo}
                            onChange={handleChange(setFormData)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                        />
                    </div>
                    <div className='flex justify-center gap-2'>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2"
                        >
                            SUBMIT
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#F71010]/50 focus:ring-offset-2"
                            onClick={handleClose}
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
            {openModal === 'confirmationModal' && (
                <ConfirmationModal
                    openModal={Boolean(openModal)}
                    modalMessage={modalMessage}
                    locked={locked} 
                    setLocked={setLocked} 
                    deactivated={deactivated} 
                    setDeactivated={setDeactivated}
                    handleCloseModal={handleCloseModal}
                    onProceed={handleUseStateToggle}
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
