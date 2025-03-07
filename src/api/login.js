import axios from "axios";
import CryptoJS from 'crypto-js';

// const BASE_URL = import.meta.env.VITE_API_URL_NODE;
const BASE_URL = 'http://localhost:5000';

// API call for verifying credentials
export const verifyCredentials = async (msisdn, username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/web/auth/loginotpreq`, {
      msisdn,
      username,
      password,
  }, {
      headers: {
          'Content-Type': 'application/json',
          'method': 'LOGINOTPREQ',
          'Language': 'EN',
          "token": ``,
      }
  });

  console.log(response.data.StatusCode);

    if (response.data.StatusCode === 0) {
      return {
        success: true,
        message: response.data.StatusMessage,
        otp: response.data.otp,
      };
    } else {
      return {
        message: response.data.StatusMessage,
      };
    }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error.response?.data?.StatusMessage || error.message,
    });
  }
};

// API call for verifying OTP
export const verifyOTP = async (otp, msisdn, username,password) => {
  try {
    const response = await axios.post(`${BASE_URL}/web/auth/loginotpres`, {
      otp,
      msisdn,
      username,
      password,
    },{
      headers: {
          'Content-Type': 'application/json',
          'method': 'LOGINOTPRES',
          'Language': 'EN',
          "token": ``,
      }
  });

    console.log("Full response:", response.data);
    
    if (response.data.StatusCode === 0) {
      const data = response.data.data;
      console.log("dataaa", data);
      const encryptedPassword = encryptPassword(password);

      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("pow", JSON.stringify(encryptedPassword));
      
      // ✅ Retrieve and parse userData
      const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}"); 
      
      // ✅ Access sessionId safely
      console.log("Stored sessionId:", storedUserData.sessionId);
      

     
      return {
        success: true,
        message: response.data.StatusMessage,
        data,
      };
    } else if(response.data.StatusCode !== 0) {
      console.log("ditoooooo");
      return {
        success: false,
        message: response.data.StatusMessage,
      };
    }
  } catch (error) {
    console.error("Error caught:", error);
    return Promise.reject({
      success: false,
      message: error.response?.data?.StatusMessage || error.message,
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