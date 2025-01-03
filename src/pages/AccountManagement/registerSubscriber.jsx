import React, { useState,useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import StatusModal from "../../components/Modals/statusModal";
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../../components/Validations'; 
import { useTranslation } from 'react-i18next';
import { accountTypeCol, registerSubscriber } from "../../api/subscriber";

const RegisterSubscriber = () => {

  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      setLoading(true);
      try {
        const result = await accountTypeCol();
        if (result.success) {
          const parsedAccounts = JSON.parse(result.account);
          console.log(parsedAccounts)
          if (Array.isArray(parsedAccounts)) {
            setAccounts(parsedAccounts); 

          } else {
            setError('Invalid account data format');
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
  
    fetchAccountTypes();
  }, []);
  
  

  const initialFormData = {
    nickname: "",
    mobileNumber: "",
    accountType: "",
    accountStatus: "",
    firstName: "",
    secondName: "",
    lastName: "",
    nationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    idNumber: "",
    idDescription: "",
    idExpiry: "",
    company: "",
    profession: "",
    email: "",
    alternateNumber: "",
    buildingNumber: "",
    streetName: "",
    cityVillage: "",
    region: "",
    country: "",
  };
  
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);

  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate form submission success or failure
    const isFormValid =
      formData.nickname &&
      formData.mobileNumber &&
      formData.accountType &&
      formData.accountStatus &&
      formData.firstName &&
      formData.lastName;
      console.log('register account',formData)
      if (isFormValid) {
        const response = await registerSubscriber(formData);
        console.log(response);
        if(response.success){
          setModalState({
            isOpen: true,
            status: "success",
            message: "Added User Successfully!",
          });
          ResetFormData(setFormData, initialFormData)();
       }else{
          setModalState({
            isOpen: true,
            status: "error",
            message: "Failed to Add User. Please try again.",
          });
       }
        
      } else {
        setModalState({
          isOpen: true,
          status: "error",
          message: "Failed to Add User. Please try again.",
        });
      }
    };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center">
          <FaMagnifyingGlass className="text-[#D95F08] mr-2" />
          {t('registration_form')}
        </h2>

        {/* Account Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#23587C]">
          {t('account_information')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="nickname"
              >
                {t('nickname')}
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                value={formData.nickname}
                onChange={HandleChange(setFormData)}
                placeholder={t('nickname')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="mobileNumber"
              >
                {t('authorized_mobile_number')}
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder={t('authorized_mobile_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                maxLength={15}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="accountType"
              >
                {t('account_type')}
              </label>
              <select
                name="accountType"
                id="accountType"
                value={formData.accountType}
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option value="">Select Account Type</option>
                {accounts.map((account) => (
                  <option key={account.ACCOUNTTYPEID} value={account.ACCOUNTTYPE}>
                    {account.ACCOUNTTYPE === 'TEMP1' ? 'TEMPORARY_NEW' : account.DESCRIPTION}
                  </option>
                ))}
              </select>


            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="accountStatus"
              >
                {t('account_status')}
              </label>
              <select
                name="accountStatus"
                id="accountStatus"
                value={formData.accountStatus}
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option className="hover:bg-black" value="">
                  Select Account Status
                </option>
                <option className="hover:bg-black" value="ACTIVE">
                  Active
                </option>
                <option className="hover:bg-black" value="">
                  Deactive
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#23587C]">
          {t('personal_information')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="firstName"
              >
                {t('first_name')}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('first_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="secondName"
              >
                {t('second_name')}
              </label>
              <input
                type="text"
                name="secondName"
                id="secondName"
                value={formData.secondName}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('second_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                {t('last_name')}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('last_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="nationality"
              >
                {t('nationality')}
              </label>
              <input
                type="text"
                name="nationality"
                id="nationality"
                value={formData.nationality}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('nationality')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="dateOfBirth"
              >
                {t('date_of_birth')}
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={
                  formData.dateOfBirth
                    ? formData.dateOfBirth.split('/').reverse().join('-') // Convert DD/MM/YYYY to YYYY-MM-DD
                    : ''
                }
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="placeOfBirth"
              >
                {t('place_of_birth')}
              </label>
              <input
                type="text"
                name="placeOfBirth"
                id="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={HandleChange(setFormData)}
                placeholder={t('place_of_birth')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="gender"
              >
                {t('gender')}
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idNumber"
              >
                {t('id_number')}
              </label>
              <input
                type="text"
                name="idNumber"
                id="idNumber"
                value={formData.idNumber}
                onChange={HandleChange(setFormData)}
                placeholder={t('id_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idDescription"
              >
                {t('id_description')}
              </label>
              <input
                type="text"
                name="idDescription"
                id="idDescription"
                value={formData.idDescription}
                onChange={HandleChange(setFormData)}
                placeholder={t('id_description')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idExpiry"
              >
                {t('id_expiry_date')}
              </label>
              <input
                type="date"
                name="idExpiry"
                id="idExpiry"
                value={
                  formData.idExpiry
                    ? formData.idExpiry.split('/').reverse().join('-') // Convert DD/MM/YYYY to YYYY-MM-DD
                    : ''
                }
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="country"
              >
                {t('country')}
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={HandleChange(setFormData)}
                placeholder={t('country')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#23587C]">
          {t('contact_information')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="company"
              >
                {t('company')}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={HandleChange(setFormData)}
                placeholder={t('company')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="profession"
              >
                {t('profession')}
              </label>
              <input
                type="text"
                name="profession"
                id="profession"
                value={formData.profession}
                onChange={HandleChange(setFormData)}
                placeholder={t('profession')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={HandleChange(setFormData)}
                placeholder={t('email')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="alternateNumber"
              >
                {t('alternate_number')}
              </label>
              <input
                type="text"
                name="alternateNumber"
                id="alternateNumber"
                value={formData.alternateNumber}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder={t('alternate_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                maxLength={15}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="buildingNumber"
              >
                {t('building_number')}
              </label>
              <input
                type="text"
                name="buildingNumber"
                id="buildingNumber"
                value={formData.buildingNumber}
                onChange={HandleChange(setFormData)}
                placeholder={t('building_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="streetName"
              >
                {t('street_name')}
              </label>
              <input
                type="text"
                name="streetName"
                id="streetName"
                value={formData.streetName}
                onChange={HandleChange(setFormData)}
                placeholder={t('street_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cityVillage"
              >
                {t('city_village')}
              </label>
              <input
                type="text"
                name="cityVillage"
                id="cityVillage"
                value={formData.cityVillage}
                onChange={HandleChange(setFormData)}
                placeholder={t('city_village')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="region"
              >
                {t('region')}
              </label>
              <input
                type="text"
                name="region"
                id="region"
                value={formData.region}
                onChange={HandleChange(setFormData)}
                placeholder={t('region')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 tracking-wide shadow-md rounded font-bold text-white bg-[#D95F08] hover:bg-[#FC8937] focus:outline-none focus:ring-2 focus:ring-[#FC8937]/50 focus:ring-offset-2"
          >
            {t('register')}
          </button>
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        status={modalState.status}
        message={modalState.message}
      />

    </div>
  );
};

export default RegisterSubscriber;
