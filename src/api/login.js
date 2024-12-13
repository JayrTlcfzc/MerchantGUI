// login.js

const mockUsers = [
    {
      msisdn: "1234567890",
      username: "testuser",
      password: "password123",
      otp: "234567" // Mock OTP
    }
  ];
  
  // Mock API for verifying credentials
  export const verifyCredentials = async (msisdn, username, password) => {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find(
        (u) => u.msisdn === msisdn && u.username === username && u.password === password
      );
  
      setTimeout(() => {
        if (user) {
          resolve({ success: true, message: "OTP sent", otp: user.otp });
        } else {
          reject({ success: false, message: "Invalid credentials" });
        }
      }, 300); // Simulate network delay
    });
  };
  
  // Mock API for verifying OTP
  export const verifyOTP = async (otp, msisdn) => {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find((u) => u.msisdn === msisdn && u.otp === otp);
  
      setTimeout(() => {
        if (user) {
          resolve({ success: true, message: "Login successful" });
        } else {
          reject({ success: false, message: "Invalid OTP" });
        }
      }, 300); // Simulate network delay
    });
  };
  


// for actual API call
//   import axios from "axios";

// const BASE_URL = "https://your-api-endpoint.com"; // Replace with your API's base URL

// // API call for verifying credentials
// export const verifyCredentials = async (msisdn, username, password) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/verify-credentials`, {
//       msisdn,
//       username,
//       password,
//     });

//     if (response.data.success) {
//       return {
//         success: true,
//         message: response.data.message,
//         otp: response.data.otp, // Assuming OTP is included in the response
//       };
//     } else {
//       throw new Error(response.data.message || "Invalid credentials");
//     }
//   } catch (error) {
//     return Promise.reject({
//       success: false,
//       message: error.response?.data?.message || error.message,
//     });
//   }
// };

// // API call for verifying OTP
// export const verifyOTP = async (otp, msisdn) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
//       otp,
//       msisdn,
//     });

//     if (response.data.success) {
//       return {
//         success: true,
//         message: response.data.message,
//       };
//     } else {
//       throw new Error(response.data.message || "Invalid OTP");
//     }
//   } catch (error) {
//     return Promise.reject({
//       success: false,
//       message: error.response?.data?.message || error.message,
//     });
//   }
// };
