import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your API's base URL

// API call for verifying credentials
export const verifyCredentials = async (msisdn, username, password) => {
  try {
    // const response = await axios.post(`${BASE_URL}/auth/verify-credentials`, {
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
      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('pow', JSON.stringify(password));
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
