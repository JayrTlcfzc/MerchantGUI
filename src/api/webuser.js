import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5000';

// export const userLevelCol = async () => {
//     const data = JSON.stringify({ "": "" });
  
//     try {
//       const response = await axios.post(`${BASE_URL}/webuser/userLevel`, data);
  
//       const responseData = response.data;
     
//       if (responseData && responseData.StatusMessage === "Success") {
//         return { success: true, level: responseData.Data };
//       } else {
//         return { success: false, message: responseData?.StatusMessage || "Unknown error" };
//       }
//     } catch (error) {
//       return { success: false, message: error.response?.data?.StatusMessage || error.message };
//     }
// };

export const userLevelCol = async () => {
  const data = JSON.stringify({ "": "" });

  try {

    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language).toUpperCase() || "Unknown Language";

    const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
    const sessionid = userData?.sessionId;

    const response = await axios.post(`${BASE_URL}/web/getuserlevels`, data, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.GETUSERSLEVELS',
        'Language': `${language}`,
        "token": `${sessionid}`,
      },
    });

    const responseData = response.data;

    if (responseData.StatusCode === 97 || responseData.StatusCode === 93) {
      return { logout: true, message: responseData?.StatusMessage };
    } else if (responseData && responseData.StatusCode === 0) {
      return { success: true, level: responseData.Data };
    } else {
      return { success: false, message: responseData?.StatusMessage || "Unknown error" };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.StatusMessage || error.message };
  }
};

// export const registerWebUser = async (formData) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/webuser/registerWebUser`, formData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

 export const registerWebUser = async (formData) => {

  const data = {
      username: formData.username,
      msisdn: formData.msisdn,
      msisdnotp: formData.otpMsisdn,
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      company: formData.company,
      department: formData.department,
      userslevel: formData.userLevel || 'admin',
      status: formData.status
  }

  try {

    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language).toUpperCase() || "Unknown Language";

    const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
    const sessionid = userData?.sessionId; // Get sessionId safely

    const response = await axios.post(
      `${BASE_URL}/web/registeruser`,

      data,
      {
        headers: {
          "Content-Type": "application/json",
          "method": "USERS.REGISTER",
          "Language": `${language}`,
          "token": `${sessionid}`, // ✅ Set Cookie header manually
        },
        withCredentials: true,
      }
    );

      if (response.StatusCode === 97 || response.StatusCode === 93) {
        return { logout: true, message: response?.StatusMessage };
      } else {
        return response.data;
      }

    } catch (error) {
      throw error;
    }
  };