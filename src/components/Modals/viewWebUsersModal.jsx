import React from 'react'
import { useState } from 'react';
import { FaUser, FaUserPen } from 'react-icons/fa6'
import { X } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './confirmationModal';
import StatusModal from './statusModal';
import { handleChange, handleChangeDigitsOnly, handleChangeTextOnly, resetFormData } from '../Validations';

export default function viewWebUsersModal({handleClose=()=>{}}) {

  const [onEdit, setOnEdit] = useState(false);
  const [locked, setLocked] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });
  
  const initialFormData = {
    userId: '',
    username: '',
    msisdn: '',
    otpMsisdn: '',
    company: '',
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    userLevel: '',
    status: '',
    locked: '',
    dateCreated: '',
    dateModified: '',
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleUseStateToggle = () => {
    if (modalMessage === "LOCK" || modalMessage === "UNLOCK") {
      setLocked(!locked);
      
    } if (modalMessage === "DEACTIVATE" || modalMessage === "ACTIVATE") {
      setDeactivated(!deactivated);
    }
    handleConfirm();
  };

  const handleConfirm = (e) => {
    let formattedMessage = '';
    if (modalMessage === "LOCK" || modalMessage === "UNLOCK") {
      formattedMessage = `${modalMessage}ED`;
    } else if (modalMessage === "ACTIVATE" || modalMessage === "DEACTIVATE") {
      formattedMessage = `${modalMessage}D`;
    } else if (modalMessage === "RESET PASSWORD") {
      formattedMessage = "RESET";
    }

    setModalState({
      isOpen: true,
        status: 'success',
        message: modalMessage === "RESET PASSWORD"
        ? `The user's password has been successfully reset!`
        : `The user has been successfully ${formattedMessage.toLowerCase()}!`
    });
  };

  const handleOpenModal = (modalMessage) => {
    setModalMessage(modalMessage);
    setOpenModal('confirmationModal');
  };

  const handleCloseModal = () => {
    setOpenModal('');
    setModalMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission success or failure
    const isFormValid = formData.userId && formData.username && formData.msisdn && formData.otpMsisdn && formData.company && formData.email && formData.firstName && formData.lastName && formData.department && formData.userLevel && formData.status && formData.locked;
    // && formData.dateCreated && formData.dateModified;
    
    if (isFormValid) {
      setModalState({
        isOpen: true,
        status: "success",
        message: "Edited User Successfully!",
      });

      resetFormData(setFormData, initialFormData)();
      setOnEdit(false)
      
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: "Failed to Edit User. Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

          <div className="bg-white rounded-lg shadow-lg max-w-full pb-6 border-2 border-[#D95F08]">

            <div className='flex justify-between flex-row items-center bg-[#D95F08] rounded-t-sx p-2'>
              <div className='flex flex-row'>
                <FaUserPen className='text-2xl text-white ml-2 mr-2' />
                <h2 className="text-xl font-semibold text-white">
                  EDIT USER
                </h2>
              </div>
                
              <div>
                <X 
                  className='cursor-pointer text-white'
                  onClick={handleClose}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-6 mx-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="userId">USER ID</label>
                <input
                  disabled={!onEdit}
                  type="text"
                  name="userId"
                  id="userId"
                  value={formData.userId}
                  onChange={handleChangeDigitsOnly(setFormData)}
                  placeholder="User ID"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">USERNAME</label>
                <input
                  disabled={!onEdit}
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange(setFormData)}
                  placeholder="Username"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="msisdn">MSISDN</label>
                <input
                  disabled={!onEdit}
                  name="msisdn"
                  id="msisdn"
                  value={formData.msisdn}
                  onChange={handleChangeDigitsOnly(setFormData)}
                  placeholder="MSISDN"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="otpMsisdn">OTP MSISDN</label>
                <input
                  disabled={!onEdit}
                  name="otpMsisdn"
                  id="otpMsisdn"
                  value={formData.otpMsisdn}
                  onChange={handleChangeDigitsOnly(setFormData)}
                  placeholder="OTP MSISDN"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="company">COMPANY</label>
                <input
                  disabled={!onEdit}
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange(setFormData)}
                  placeholder="Company"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">EMAIL</label>
                <input
                  disabled={!onEdit}
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange(setFormData)}
                  placeholder="Email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">FIRST NAME</label>
                <input
                  disabled={!onEdit}
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChangeTextOnly(setFormData)}
                  placeholder="First Name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">LAST NAME</label>
                <input
                  disabled={!onEdit}
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChangeTextOnly(setFormData)}
                  placeholder="Last Name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="department">DEPARTMENT</label>
                <input
                  disabled={!onEdit}
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange(setFormData)}
                  placeholder="Department"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="userLevel">USER LEVEL</label>
                <select
                  disabled={!onEdit}
                  name="userLevel"
                  id="userLevel"
                  value={formData.userLevel}
                  onChange={handleChange(setFormData)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                >
                  <option value="">Select User Level</option>
                  <option value="IT_ADMIN_MERCHANT">IT_ADMIN_MERCHANT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="status">STATUS</label>
                <select
                  disabled={!onEdit}
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange(setFormData)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="locked">LOCKED</label>
                <select
                  disabled={!onEdit}
                  name="locked"
                  id="locked"
                  value={formData.locked}
                  onChange={handleChange(setFormData)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dateCreated">DATE CREATED</label>
                <input
                  disabled
                  name="dateCreated"
                  id="dateCreated"
                  value={formData.dateCreated}
                  onChange={handleChange(setFormData)}
                  placeholder="2023-11-19 14:35:00"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dateModified">DATE MODIFIED</label>
                <input
                  disabled
                  name="dateModified"
                  id="dateModified"
                  value={formData.dateModified}
                  onChange={handleChange(setFormData)}
                  placeholder="2024-04-19 21:45:00"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
            </div>

            <div className="flex justify-between gap-10 mx-6">
              <div className='flex gap-2'>
                <button
                    onClick={() => handleOpenModal('RESET PASSWORD')}
                    className="px-4 py-2 text-white bg-[#E88B00] rounded hover:bg-[#FFA51E] font-bold"
                >
                    RESET PASSWORD
                </button>

                {!locked ? (
                  <button
                  onClick={() => handleOpenModal('LOCK')}
                  className="px-4 py-2 text-white bg-[#C80202] rounded hover:bg-[#F71010] font-bold"
                  >
                      LOCK
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenModal('UNLOCK')}
                    className="px-4 py-2 text-white bg-[#0FBA00] rounded hover:bg-[#0C9500] font-bold"
                    >
                        UNLOCK
                    </button>
                )}

                {!deactivated ? (
                  <button
                  onClick={() => handleOpenModal('DEACTIVATE')}
                  className="px-4 py-2 text-white bg-[#3F3F3F] rounded hover:bg-[#4D4D4D] font-bold"
                  >
                      DEACTIVATE
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenModal('ACTIVATE')}
                    className="px-4 py-2 text-white bg-[#CDC600] rounded hover:bg-[#F2EA06] font-bold"
                    >
                        ACTIVATE
                    </button>
                )}

              </div>
              
              <div className='flex gap-2'>
                {!onEdit ? (
                  <button
                    onClick={() => {setOnEdit(true)}}
                    className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold"
                    >
                      EDIT
                  </button>) : (
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 text-white bg-[#D95F08] rounded hover:bg-[#D95F08] font-bold"
                    >
                      SAVE
                  </button>
                  )
                }
                
                <button
                    className="px-4 py-2 text-black bg-[#DCDCDC] rounded hover:bg-[#9D9D9D] font-bold"
                    onClick={handleClose}
                >
                    CANCEL
                </button>
              </div>

            </div>
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
              onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
              status={modalState.status}
              message={modalState.message}
            />
        </div>
  )
}