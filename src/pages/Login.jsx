import React, { useState } from "react";

const Login = () => {
  const [msisdn, setMsisdn] = useState("");

  const handleMsisdnChange = (e) => {
    const input = e.target.value;
    // Allow only numbers
    const sanitizedInput = input.replace(/\D/g, "");
    setMsisdn(sanitizedInput);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md sm:max-w-md lg:max-w-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <form>
          
          <div className="flex flex-wrap gap-4 mb-4">
           
            <div className="flex-1">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

           
            <div className="flex-1">
              <label
                htmlFor="msisdn"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                MSISDN
              </label>
              <input
                type="text"
                id="msisdn"
                value={msisdn}
                onChange={handleMsisdnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your MSISDN"
                required
              />
            </div>
          </div>

        
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

         
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
