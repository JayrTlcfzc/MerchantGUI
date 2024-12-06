import React from 'react'
import { useState } from 'react';
import { FaUser, FaUserPen } from 'react-icons/fa6'

export default function viewWebUsersModal({handleClose=()=>{}}) {
  
  const [formData, setFormData] = useState({
    nickname: '',
    mobileNumber: '',
    accountType: '',
    accountStatus: '',
    firstName: '',
    secondName: '',
    lastName: '',
    nationality: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    idNumber: '',
    idDescription: '',
    idExpiry: '',
    company: '',
    profession: '',
    email: '',
    alternateNumber: '',
    buildingNumber: '',
    streetName: '',
    cityVillage: '',
    region: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission success or failure
    const isFormValid = formData.nickname && formData.mobileNumber && formData.accountType && formData.accountStatus && formData.firstName && formData.lastName;
    
    if (isFormValid) {
      toast.success("Registration successful!");
      console.log('Form Submitted', formData);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

          <div className="bg-white rounded-lg shadow-lg p-6 max-w-full">

            <div className='flex flex-row justify-center items-center bg-[#D95F08]'>
                <FaUserPen className='text-2xl text-white' />
                <h2 className="text-2xl font-semibold text-white ml-2">
                  EDIT USER
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="nickname">Nickname</label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Nickname"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="mobileNumber">Authorized Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="accountType">Account Type</label>
              <select
                name="accountType"
                id="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Account Type</option>
                <option value="MCOM">MCOM</option>
                <option value="DISTRIBUTOR">DISTRIBUTOR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="accountStatus">Account Status</label>
              <select
                name="accountStatus"
                id="accountStatus"
                value={formData.accountStatus}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Account Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

            <div className="flex justify-center gap-4">
                <button
                    className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6]"
                    onClick={handleClose}
                >
                    Proceed
                </button>
                <button
                    className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010]"
                    onClick={handleClose}
                >
                    Cancel
                </button>
            </div>
          </div>

        </div>
  )
}