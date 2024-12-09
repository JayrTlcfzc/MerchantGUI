import React, { useState } from 'react';
import { X } from "lucide-react";
import ConfirmationModal from './confirmationModal';
import StatusModal from './statusModal';

export default function RequestReportsModal({ handleClose = () => {} }) {
    // State to manage form data
    const [formData, setFormData] = useState({
        reportType: '',
        msisdn: '',
        dateFrom: '',
        dateTo: ''
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

    // Placeholder for toggle logic (add your logic here)
    const handleUseStateToggle = () => {
        // Your toggle logic here
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = formData.reportType && formData.msisdn && formData.dateFrom && formData.dateTo;
        if (isFormValid) {
            console.log('Form Submitted', formData);
            setModalState({
                isOpen: true,
                status: 'success',
                message: 'Report request submitted successfully!'
            });
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
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full pb-6 border border-2 border-[#D95F08]">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8 mt-6 mx-6">
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="reportType">Types of Report</label>
                        <select
                            name="reportType"
                            id="reportType"
                            value={formData.reportType}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            onChange={handleChange}
                            placeholder="MSISDN"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="dateFrom">Date From</label>
                        <input
                            type="date"
                            name="dateFrom"
                            id="dateFrom"
                            value={formData.dateFrom}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="w-auto text-sm font-medium text-gray-700" htmlFor="dateTo">Date To</label>
                        <input
                            type="date"
                            name="dateTo"
                            id="dateTo"
                            value={formData.dateTo}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='flex justify-center gap-2'>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010] font-bold"
                            onClick={handleClose}
                        >
                            Cancel
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
