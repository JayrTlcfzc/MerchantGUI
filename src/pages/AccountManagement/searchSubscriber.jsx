import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMagnifyingGlass, FaAddressCard } from 'react-icons/fa6'

const SearchSubscriber = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const accountDetails = [
    { label: "ACCOUNT ID", value: "231789031" },
    { label: "NICKNAME", value: "ABDUL" },
    { label: "MSISDN", value: "23456789" },
    { label: "MAIN ACCOUNT", value: "150 500" },
    { label: "COMMISSION AMOUNT", value: "100 550" },
    { label: "ACCOUNT TYPE", value: "MCOM" },
    { label: "DATE REGISTERED", value: "04/19/2024" },
    { label: "DATE MODIFIED", value: "04/19/2024" },
    { label: "KYC", value: "APPROVED" },
    { label: "REFERENCE ACCOUNT", value: "0,76534" },
    { label: "ACCOUNT STATUS", value: "ACTIVE" },
    { label: "USER ID", value: "234567812" },
    { label: "LOCKED", value: "NO" },
    { label: "CONTROL REFERENCE", value: "0" },
  ];

  const personalDetails = [
    { label: "FIRST NAME", value: "ABDUL" },
    { label: "SECOND NAME", value: "MOHAMMAD" },
    { label: "LAST NAME", value: "JAFAR" },
    { label: "ID NUMBER", value: "234567812" },
    { label: "ID DESCRIPTION", value: "CARTE DESOUR" },
    { label: "ID EXPIRY DATE", value: "12/24/2030" },
    { label: "NATIONALITY", value: "AFRICAN" },
    { label: "GENDER", value: "MALE" },
    { label: "DATE OF BIRTH", value: "06/14/1992" },
    { label: "PLACE OF BIRTH", value: "AFRICA" },
    { label: "COMPANY", value: "QNATEL" },
    { label: "PROFESSION", value: "DEVELOPER" },
    { label: "CITY / VILLAGE", value: "BURKINA" },
    { label: "STREET NAME", value: "BURKINA" },
    { label: "BUILDING NUMBER", value: "1209" },
    { label: "REGION", value: "DRO" },
    { label: "COUNTRY", value: "AFRICA" },
    { label: "EMAIL", value: "qwerty@gmail.com" },
    { label: "ALT NUMBER", value: "123456377" },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {/* Search Bar */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center mb-4">
          <FaMagnifyingGlass className="text-[#D95F08] mr-2" />
          SEARCH SUBSCRIBER
        </h2>

      {/* First row - MSISDN dropdown and input */}
      <div className="flex gap-4 mb-4">
        <select
          className="w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
          defaultValue="MSISDN"
        >
          <option value="MSISDN">MSISDN</option>
        </select>

        <input
          type="text"
          placeholder="MSISDN"
          className="w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
        />

        <button className="w-1/3 px-6 py-2 bg-[#D95F08] text-white rounded-md shadow-md hover:bg-[#FC8937]">
          SEARCH
        </button>
      </div>

      {/* Second row - Date Inputs */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/3 relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Date From"
            className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
            wrapperClassName="w-full"
            popperClassName="react-datepicker-left"
          />
        </div>

        <div className="w-1/3 relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Date To"
            className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
            wrapperClassName="w-full"
            popperClassName="react-datepicker-right"
          />
        </div>

        <button className="w-1/3 px-6 py-2 bg-[#D95F08] text-white rounded-md shadow-md hover:bg-[#FC8937]">
          DOWNLOAD LIST
        </button>
      </div>
    </div>



      {/* Subscriber Details */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        {/* Account Details */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center justify-center">
          <FaAddressCard className="text-[#D95F08] mr-2"/>
          VIEW SUBSCRIBER DETAILS
        </h2>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Account Details
        </h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
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
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Personal Details
        </h3>
        <div className="grid grid-cols-4 gap-4">
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