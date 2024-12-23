import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMagnifyingGlass, FaAddressCard } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next';
import { searchSubs } from "../../api/subscriber";
import { toast, ToastContainer } from "react-toastify";

const SearchSubscriber = () => {

  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


   const handleSubmit = async (e) => {
      e.preventDefault();
      // const isFormValid = formData.msisdn && formData.username && formData.password;
      console.log('submit')
      // if (isFormValid) {
        try {
          const { success, message} = await searchSubs(
            msisdn
          );
    
          if (success) {
            login();
            setOtpFromServer(otp); // Store OTP sent by mock server
            setOpenModal("OTPModal"); // Open OTP modal
          }else{
            console.log("Error message: ", message);
            toast.error(message);
          
          }
        } catch (error) {
          toast.error(error.message || "Login Error");
        }
      // } else {
      //   toast.error("Please fill in all fields");
      // }
    };

  const accountDetails = [
    { label: t('account_id') , value: "231789031" },
    { label: t('nickname') , value: "ABDUL" },
    { label: t('msisdn'), value: "23456789" },
    { label: t('main_account'), value: "150 500" },
    { label: t('commission_amount'), value: "100 550" },
    { label: t('account_type'), value: "MCOM" },
    { label: t('date_registered'), value: "04/19/2024" },
    { label: t('date_modified'), value: "04/19/2024" },
    { label: t('kyc'), value: "APPROVED" },
    { label: t('reference_account'), value: "0,76534" },
    { label: t('account_status'), value: "ACTIVE" },
    { label: t('user_id'), value: "234567812" },
    { label: t('locked'), value: "NO" },
    { label: t('control_reference'), value: "0" },
  ];

  const personalDetails = [
    { label: t('first_name'), value: "ABDUL" },
    { label: t('second_name'), value: "MOHAMMAD" },
    { label: t('last_name'), value: "JAFAR" },
    { label: t('id_number'), value: "234567812" },
    { label: t('id_description'), value: "CARTE DESOUR" },
    { label: t('id_expiry_date'), value: "12/24/2030" },
    { label: t('nationality'), value: "AFRICAN" },
    { label: t('gender'), value: "MALE" },
    { label: t('date_of_birth'), value: "06/14/1992" },
    { label: t('place_of_birth'), value: "AFRICA" },
    { label: t('company'), value: "QNATEL" },
    { label: t('profession'), value: "DEVELOPER" },
    { label: t('city_village'), value: "BURKINA" },
    { label: t('street_name'), value: "BURKINA" },
    { label: t('building_number'), value: "1209" },
    { label: t('region'), value: "DRO" },
    { label: t('country'), value: "AFRICA" },
    { label: t('email'), value: "qwerty@gmail.com" },
    { label: t('alt_number'), value: "123456377" },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {/* Search Bar */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-8">
          <FaMagnifyingGlass className="text-[#D95F08] mr-2" />
          {t('search_subscriber')}
        </h2>

        {/* First row - MSISDN dropdown and input */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            className="md:w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
            defaultValue="MSISDN"
          >
            <option value="MSISDN"> {t('msisdn')}</option>
          </select>

          <input
            type="text"
            placeholder="MSISDN"
            className="md:w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
          />

          <button
           type="button"
           onClick={handleSubmit}
           className="md:w-1/3 px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#D95F08] text-white hover:bg-[#FC8937]">
           {t('search')}
          </button>
        </div>

        {/* Second row - Date Inputs */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="md:w-1/3 relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText={t('date_from')}
              className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
              wrapperClassName="w-full"
              popperClassName="react-datepicker-left"
            />
          </div>

          <div className="md:w-1/3 relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText={t('date_to')}
              className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
              wrapperClassName="w-full"
              popperClassName="react-datepicker-right"
            />
          </div>

          <button className="md:w-1/3 px-6 tracking-wide shadow-md rounded font-bold py-2 bg-[#D95F08] text-white hover:bg-[#FC8937]">
            {t('download_list')}
          </button>
        </div>
      </div>

      {/* Subscriber Details */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        {/* Account Details */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center">
          <FaAddressCard className="text-[#D95F08] mr-2"/>
          {t('view_subscriber_details')}
        </h2>
        <h3 className="text-lg font-semibold mb-4 text-[#23587C]">
        {t('account_details')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {accountDetails.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-md text-center shadow-sm bg-gray-50"
            >
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Personal Details */}
        <h3 className="text-lg font-semibold mb-4 text-[#23587C]">
         {t('personal_details')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {personalDetails.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-md text-center shadow-sm bg-gray-50"
            >
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SearchSubscriber