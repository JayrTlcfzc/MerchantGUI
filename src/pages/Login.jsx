import React, { useState } from "react";
import LoginImage from '../assets/LoginImage.png';
import OTPModal from "../components/OTPModal";

// import PasswordModal from "../components/OTPModal";
// import PinModal from "../components/OTPModal";

const Login = () => {
  const [msisdn, setMsisdn] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState('');

  const handleMsisdnChange = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/\D/g, "");
    setMsisdn(sanitizedInput);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <div className="flex flex-row min-h-screen bg-white">

      <div className="w-full h-screen hidden md:block">
        <img src={LoginImage} className="max-content h-full object-cover" alt="Login Illustration"   />
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col min-h-screen items-center justify-center w-full">
        <div className="w-full max-w-sm p-6 sm:max-w-md lg:max-w-lg shadow-lg md:shadow-none">
          <h2 className="mb-6 text-5xl font-bold text-center text-gray-800 tracking-wider text-shadow-lg">
            LOGIN
          </h2>
          <form>
            <div className="flex flex-wrap gap-4 mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="msisdn"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                MSISDN
              </label>
              <input
                type="text"
                id="msisdn"
                value={msisdn}
                onChange={handleMsisdnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
                placeholder="Enter your MSISDN"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#23587C] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="mr-2 w-4 h-4 cursor-pointer rounded" />
              <label>Show Password</label>
            </div>

            <button
              type="button"
              onClick={() => setOpenModal('OTPModal')}
              className="w-1/2 mx-auto block items-center px-4 py-2 font-medium text-white bg-[#23587C] rounded hover:bg-[#2C75A6] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {openModal === 'OTPModal' && (
        <OTPModal openModal={Boolean(openModal)} handleClose={() => setOpenModal('')} />
      )}
      {/* <PasswordModal openModal={Boolean(openModal)} handleClose={() => setOpenModal('')} /> */}
      {/* <PinModal openModal={Boolean(openModal)} handleClose={() => setOpenModal('')} /> */}
    </div>
  );
};

export default Login;
