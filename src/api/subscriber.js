import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your API's base URL

// API call for verifying credentials
export const searchSubs = async (msisdn, option) => {
  try {
    // const response = await axios.post(`${BASE_URL}/auth/verify-credentials`, {
      const response = await axios.post(`${BASE_URL}/subscriber/searchSubscriber`, {
      msisdn,
      option
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