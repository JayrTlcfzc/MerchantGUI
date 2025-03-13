import React, { useState, useEffect } from 'react';
import StatusModal from '../../components/Modals/statusModal';
import PasswordModal from '../../components/Modals/PasswordModal';
import OTPModal from '../../components/Modals/OTPModal';
import { FaBuildingColumns } from 'react-icons/fa6';
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../../components/Validations';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from "react-toastify";
import { walletToBank, allocateOtpRequest, bankCollection } from '../../api/walletToBank';
import LoadingModal from '../../components/Modals/loadingModal';

const WalletToBank = () => {

  const initialFormData = {
    bank: '',
    bankaccountfullname: '',
    bankaccountnumber: '',
    amount: '',
    remarks: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    const fetchUserLevels = async () => {
      try {
        setLoading(true);
        const result = await bankCollection();
        if (result.success) {
          const parsedBank = JSON.parse(result.bank);
          if (Array.isArray(parsedBank)) {
            setBanks(parsedBank); 
          } else {
            toast.error(result.message);
          }
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserLevels();
  }, []);

  // Check if all fields have values
  const isFormValid = formData.bank && formData.bankaccountfullname && formData.bankaccountnumber && formData.amount && formData.remarks;

  const handleAllocate = () => setPasswordModalOpen(true); // Open password modal on click


  const handleProceedPassword = async () => {
    setPasswordModalOpen(false); 

    try {
      setLoading(true);
        const res = await allocateOtpRequest();
        setOTPModalOpen(true);
      } catch (error) {
        setModalState({ isOpen: true, status: "error", message: error.message });
      } finally {
        ResetFormData(setFormData, initialFormData);
        setLoading(false);
      }

  };

  const handleProceedOTP = async (otp) => {
    setOtpValue(otp);
    const updatedFormData = { ...formData, otp }; // Include OTP in form data
    setFormData(updatedFormData);
    setOTPModalOpen(false);

    try {
      setLoading(true);
      const res = await walletToBank(updatedFormData);
      setModalState({ isOpen: true, status: res.success ? "success" : "error", message: res.message });
    } catch (error) {
      setModalState({ isOpen: true, status: "error", message: error.message });
    } finally {
      ResetFormData(setFormData, initialFormData);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {loading && (<LoadingModal />)}
      <ToastContainer />
      
      <h2 className="text-2xl font-bold mb-8 flex items-center text-center">
        <FaBuildingColumns className="text-[#D95F08] mr-2" />
        {t('wallet_to_bank')}
      </h2>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl border-2 border-[#23587C]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label 
              className="block text-sm font-medium mb-2 truncate" 
              title={t('bank')}
            >
              {t('bank')}
            </label>
            <select
              name="bank"
              value={formData.bank}
              onChange={HandleChange(setFormData)}
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            >
              <option value="">Select Bank</option>
                    {banks.map((bank) => (
                      <option key={bank.ID} value={bank.KEYNAME.toUpperCase()}>
                        {bank.BANKNAME}
                      </option>
                    ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label 
              className="block text-sm font-medium mb-2 truncate" 
              title={t('bank_account_full_name')}
            >
              {t('bank_account_full_name')}
            </label>
            <input
              type="text"
              name="bankaccountfullname"
              value={formData.bankaccountfullname}
              onChange={HandleChangeTextOnly(setFormData)}
              placeholder={t('bank_account_full_name')}
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div className="flex flex-col">
            <label 
              className="block text-sm font-medium mb-2 truncate" 
              title={t('bank_account_number')}
            >
              {t('bank_account_number')}
            </label>
            <input
              type="text"
              name="bankaccountnumber"
              value={formData.bankaccountnumber}
              onChange={HandleChangeDigitsOnly(setFormData)}
              placeholder={t('bank_account_number')}
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div className="flex flex-col">
            <label 
              className="block text-sm font-medium mb-2 truncate" 
              title={t('amount')}
            >
              {t('amount')}
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={HandleChangeDigitsOnly(setFormData)}
              placeholder={t('amount')}
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
          <div className="flex flex-col">
            <label 
              className="block text-sm font-medium mb-2 truncate" 
              title={t('remarks')}
            >
              {t('remarks')}
            </label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={HandleChange(setFormData)}
              placeholder={t('remarks')}
              className="p-3 border rounded-md shadow-sm w-full focus:outline-none focus:ring-1 focus:ring-[#23587C]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-6">
        <button
          className={`px-8 py-3 tracking-wide shadow-md rounded-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFormValid ? 'bg-[#23587C] hover:bg-[#2C75A6] focus:ring-[#2C75A6]/50' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleAllocate}
          disabled={!isFormValid}
        >
          {t('submit')}
        </button>
        <button 
          className="px-8 py-3 tracking-wide shadow-md rounded-lg font-bold bg-[#BFC3D2] text-gray-800 hover:bg-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2"
          onClick={ResetFormData(setFormData, initialFormData)}
        >
          {t('reset')}
        </button>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onProceed={handleProceedPassword}
          handleClose={() => setPasswordModalOpen(false)}
        />
      )}

      {/* OTP Modal */}
      {isOTPModalOpen && (
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setOTPModalOpen(false)}
          onProceed={handleProceedOTP}
          handleClose={() => setOTPModalOpen(false)}
        />
      )}

      {/* Status Modal */}
      {modalState.isOpen && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={() => {
            setModalState(prev => ({ ...prev, isOpen: false }));
            if (modalState.status === 'success') {
              ResetFormData(setFormData, initialFormData)(); // Resetting formData when modal closes on success
            }
          }}
          status={modalState.status}
          message={modalState.message}
        />
      )}
    </div>
  );
};

export default WalletToBank;
