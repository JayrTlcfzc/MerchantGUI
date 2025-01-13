import axios from "axios";

import CryptoJS from 'crypto-js';

const BASE_URL = "http://localhost:3000"; // Replace with your API's base URL

// API call for verifying credentials
export const verifyCredentials = async (msisdn, username, password) => {
  try {
   
      const response = await axios.post(`${BASE_URL}/auth/otpreq`, {
      msisdn,
      username,
      password,
    });
    console.log(response.data);
    if (response.data.StatusMessage === "Success") {
      return {
        success: true,
        message: response.data.StatusMessage,
        otp: response.data.otp, // Assuming OTP is included in the response
      };
    } else {
      return {
        message: response.data.StatusMessage,
      };
    }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

// API call for verifying OTP
export const verifyOTP = async (otp, msisdn, username,password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/otpres`, {
      otp,
      msisdn,
      username,
      password,
    });

    console.log(response.data);


    if (response.data.StatusCode === 0) {
      const data = JSON.parse(response.data.Data);

      const encryptedPassword = encryptPassword(password);

      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('pow', JSON.stringify(encryptedPassword));


      return {
        success: true,
        message: response.data.StatusMessage,
        data,
      };
    } else if(response.data.StatusCode !== 0) {
      return {
        success: false,
        message: response.data.StatusMessage,
      };
    }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};


export const encryptPassword = (password) => {
  const encryptionKey = 'KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZ';  
  const iv = CryptoJS.enc.Hex.parse('AES-256-CBC'); 

  const encryptedPassword = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(encryptionKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encryptedPassword.toString();
};