import React from 'react'
import { useState } from 'react';
import { FaUser, FaUserPen } from 'react-icons/fa6'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function viewWebUsersModal({handleClose=()=>{}}) {
  
  const [formData, setFormData] = useState({
    userid: '',
    username: '',
    msisdn: '',
    otpmsisdn: '',
    company: '',
    email: '',
    firstname: '',
    lastname: '',
    department: '',
    userlevel: '',
    status: '',
    locked: '',
    datacreated: '',
    datemodified: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission success or failure
    const isFormValid = formData.userid && formData.username && formData.msisdn && formData.otpmsisdn && formData.company && formData.email && formData.firstname && formData.lastname && formData.department && formData.userlevel && formData.status && formData.locked && formData.datacreated && formData.datemodified;
    
    if (isFormValid) {
      toast.success("Registration successful!");
      console.log('Form Submitted', formData);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

          <div className="bg-white rounded-lg shadow-lg max-w-full pb-6">

            <div className='flex flex-row items-center bg-[#D95F08] rounded-t-lg p-2'>
                <FaUserPen className='text-2xl text-white ml-2 mr-2' />
                <h2 className="text-xl font-semibold text-white">
                  EDIT USER
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-6 mx-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="nickname">USER ID</label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  value={formData.userid}
                  onChange={handleChange}
                  placeholder="User ID"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="mobileNumber">USERNAME</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
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