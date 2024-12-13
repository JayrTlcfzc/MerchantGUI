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
  