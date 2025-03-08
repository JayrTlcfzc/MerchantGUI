import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL_NODE;
const BASE_URL = 'http://localhost:5000';

// API call for verifying credentials
export const verifyLogout = async () => {
  try {

    const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
    const sessionid = userData?.sessionId;

    const response = await axios.post(`${BASE_URL}/web/auth/logout`, {sessionid},
    {
      headers: {
          'Content-Type': 'application/json',
        //   'method': 'LOGINOTPREQ',
          'Language': 'EN',
          "token": `${sessionid}`,
      }
  });

  console.log(response);

    if (response.data.StatusCode === 0) {
      return {
        success: true,
        message: response.data.StatusMessage,
      };
    } else {
      return {
        message: response.data.StatusMessage,
      };
    }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: response?.data?.StatusMessage || error,
    });
  }
};