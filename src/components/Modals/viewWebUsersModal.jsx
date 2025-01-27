import React from 'react'
import { useState, useEffect } from 'react';
import { FaUser, FaUserPen } from 'react-icons/fa6'
import { X } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './confirmationModal';
import StatusModal from './statusModal';
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../Validations';
import { useTranslation } from 'react-i18next';
import {userLevelCol} from "../../api/webuser";
import { updateWebUser } from '../../api/apiWebUsers';
import LoadingModal from '../../components/Modals/loadingModal';

export default function viewWebUsersModal({ handleClose = () => {}, webUserData = {} }) {

  const { t, i18n } = useTranslation();
  const [onEdit, setOnEdit] = useState(false);
  const [locked, setLocked] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalUsername, setModalUsername] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserLevels = async () => {
        setLoading(true);
        try {
          const result = await userLevelCol();
          if (result.success) {
            const parsedLevels = JSON.parse(result.level);
            if (Array.isArray(parsedLevels)) {
              setLevels(parsedLevels); 
  
            } else {
              setError('Invalid user level data format');
            }
          } else {
            setError(result.message || 'Invalid data format');
          }
        } catch (err) {
          setError(err.message); // Handle fetch errors
        } finally {
          setLoading(false);
        }
      };
    
      fetchUserLevels();
    }, []);
  
    const initialFormData = {
      userId: '',
      username: '',
      msisdn: '',
      otp: '',
      company: '',
      email: '',
      firstname: '',
      lastname: '',
      department: '',
      status: '',
      locked: '',
      dateRegistered: '',
      dateModified: '',
      userslevel: '',
    };
  
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
      if (webUserData) {
        setFormData((prevData) => ({
          ...prevData,
          ...webUserData,
        }));
      }
    }, [webUserData]);

  const handleUseStateToggle = (result) => {
    console.log('HANDLE USE STATE TOGGLE ',result)
    if (modalMessage === `${t('modal_locked')}` || modalMessage === `${t('modal_unlocked')}`) {
      setLocked(!locked);
      
    } if (modalMessage === `${t('modal_deactivated')}` || modalMessage === `${t('modal_activated')}`) {
      setDeactivated(!deactivated);
    }
    handleConfirm();
  };

  const handleConfirm = (e) => {
    let formattedMessage = '';
    if (modalMessage === `${t('modal_reset_password')}`) {
      formattedMessage = `${t('modal_reset')}`;
    } else {
      formattedMessage = `${modalMessage}`;
    }

    setModalState({
      isOpen: true,
        status: 'successul',
        message: modalMessage === `${t('modal_reset_password')}`
        ? `${t('modal_successfully_reset')}`
        : `${t('modal_the_user_has_been_successfully')} ${formattedMessage.toLowerCase()}!`
    });
  };

  const handleOpenModal = (modalMessage, modalUsername) => {
    console.log(modalUsername);
    setModalMessage(modalMessage);
    setModalUsername(modalUsername);
    setOpenModal('confirmationModal');
  };
  

  const handleCloseModal = () => {
    setOpenModal('');
    setModalMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    const requiredFields = [
      formData.userId,
      formData.username,
      formData.msisdn,
      formData.otp,
      formData.company,
      formData.email,
      formData.firstname,
      formData.lastname,
      formData.department,
      formData.status,
      formData.locked,
      formData.userslevel
    ];
  
    const isFormValid = requiredFields.every(field => field && field.trim() !== "");
  
    if (isFormValid) {
      setLoading(true);
      try {
        const result = await updateWebUser(formData);
        console.log('Update result:', result);
        
        if(result.success){
        setModalState({
          isOpen: true,
          status: "successul",
          message: result.message,
        });
        } else{
          setModalState({
            isOpen: true,
            status: "error",
            message: result.message,
          });
        }
      } catch (error) {
        console.error('Error updating user:', error);
  
        setModalState({
          isOpen: true,
          status: "error",
          message: t('modal_failed_to_edit_user_level'),
        });
      } finally {
        setLoading(false);
      }
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: t('modal_failed_to_edit_user_level'),
      });
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {loading && (<LoadingModal />)}
      
          <div className="bg-white rounded-lg shadow-lg max-w-full pb-6 border-2 border-[#D95F08]">

            <div className='flex justify-between flex-row items-center bg-[#D95F08] rounded-t-sx p-2'>
              <div className='flex flex-row'>
                <FaUserPen className='text-2xl text-white ml-2 mr-2' />
                <h2 className="text-xl font-semibold text-white">
                {t('modal_edit_user')}
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
                <label className="block text-sm font-medium text-gray-700" htmlFor="userId">{t('user_id')}</label>
                <input
                  disabled={!onEdit}
                  type="text"
                  name="userId"
                  id="userId"
                  value={formData.userId}
                  onChange={HandleChangeDigitsOnly(setFormData)}
                  placeholder={t('user_id')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">{t('username')}</label>
                <input
                  disabled={!onEdit}
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={HandleChange(setFormData)}
                  placeholder={t('username')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="msisdn">{t('msisdn')}</label>
                <input
                  disabled={!onEdit}
                  name="msisdn"
                  id="msisdn"
                  value={formData.msisdn}
                  onChange={HandleChangeDigitsOnly(setFormData)}
                  placeholder={t('msisdn')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="otp">{t('otp_msisdn')}</label>
                <input
                  disabled={!onEdit}
                  name="otp"
                  id="otp"
                  value={formData.otp}
                  onChange={HandleChangeDigitsOnly(setFormData)}
                  placeholder={t('otp_msisdn')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="company">{t('company')}</label>
                <input
                  disabled={!onEdit}
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={HandleChange(setFormData)}
                  placeholder={t('company')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">{t('email')}</label>
                <input
                  disabled={!onEdit}
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={HandleChange(setFormData)}
                  placeholder={t('email')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="firstname">{t('first_name')}</label>
                <input
                  disabled={!onEdit}
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={HandleChangeTextOnly(setFormData)}
                  placeholder={t('first_name')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="lastname">{t('last_name')}</label>
                <input
                  disabled={!onEdit}
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={HandleChangeTextOnly(setFormData)}
                  placeholder={t('last_name')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="department">{t('department')}</label>
                <input
                  disabled={!onEdit}
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={HandleChange(setFormData)}
                  placeholder={t('department')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="userslevel">{t('user_level')}</label>
                <select
                  disabled={!onEdit}
                  name="userslevel"
                  id="userslevel"
                  value={formData.userslevel}
                  onChange={HandleChange(setFormData)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                >
                 <option value="">Select User Level</option>
                {levels.map((level) => (
                  <option key={level.USERSLEVEL} value={level.USERSLEVEL.toUpperCase()}>
                    {level.USERSLEVEL}
                  </option>
                ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="status">{t('status')}</label>
                <select
                  disabled={onEdit}
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={HandleChange(setFormData)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                >
                  <option value="">Select Status</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="locked">{t('locked')}</label>
                <select
                  disabled={onEdit}
                  name="locked"
                  id="locked"
                  value={formData.locked}
                  onChange={HandleChange(setFormData)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dateRegistered">{t('date_created')}</label>
                <input
                  disabled
                  name="dateRegistered"
                  id="dateRegistered"
                  value={formData.dateRegistered}
                  onChange={HandleChange(setFormData)}
                  placeholder="2023-11-19 14:35:00"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dateModified">{t('date_modified')}</label>
                <input
                  disabled
                  name="dateModified"
                  id="dateModified"
                  value={formData.dateModified}
                  onChange={HandleChange(setFormData)}
                  placeholder="2024-04-19 21:45:00"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23587C]"
                />
              </div>
            </div>

            <div className="flex justify-between gap-10 mx-6">
              <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(t('modal_reset'), formData.username)}
                className="px-4 py-2 text-white bg-[#E88B00] rounded hover:bg-[#FFA51E] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={onEdit} // Disable when editing
              >
                {t('modal_reset_password')}
              </button>


                {formData.locked === 'NO' ? (
                  <button
                  onClick={() => handleOpenModal(t('modal_locked'), formData.username)}
                    className="px-4 py-2 text-white bg-[#C80202] rounded hover:bg-[#F71010] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={onEdit} // Disable when editing
                  >
                    {t('modal_lock')}
                  </button>
                ) : (
                  <button
                  onClick={() => handleOpenModal(t('modal_unlocked'), formData.username)}
                    className="px-4 py-2 text-white bg-[#0FBA00] rounded hover:bg-[#0C9500] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={onEdit} // Disable when editing
                  >
                    {t('modal_unlock')}
                  </button>
                )}

                {formData.status === 'ACTIVE' ? (
                  <button
                    onClick={() => handleOpenModal(t('modal_deactivated'), formData.username)}
                    className="px-4 py-2 text-white bg-[#3F3F3F] rounded hover:bg-[#4D4D4D] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={onEdit} // Disable when editing
                  >
                    {t('modal_deactivate')}
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenModal(t('modal_activated'), formData.username)}
                    className="px-4 py-2 text-white bg-[#CDC600] rounded hover:bg-[#F2EA06] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={onEdit} // Disable when editing
                  >
                    {t('modal_activate')}
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {!onEdit ? (
                  <button
                    onClick={() => setOnEdit(true)}
                    className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold"
                  >
                    {t('modal_edit')}
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-[#D95F08] rounded hover:bg-[#D95F08] font-bold"
                  >
                    {t('modal_save')}
                  </button>
                )}

                <button
                  className="px-4 py-2 text-black bg-[#DCDCDC] rounded hover:bg-[#9D9D9D] font-bold"
                  onClick={() => {
                    setOnEdit(false); // Exit edit mode when cancel is clicked
                    handleClose();
                  }}
                >
                  {t('modal_cancel')}
                </button>
              </div>
            </div>


          </div>
          {openModal === 'confirmationModal' && (
            <ConfirmationModal
            
              openModal={Boolean(openModal)}
              modalMessage={modalMessage}
              modalUsername={modalUsername}
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