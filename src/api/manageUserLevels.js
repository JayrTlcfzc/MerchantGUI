import axios from "axios";

const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
const sessionid = userData?.sessionId; // Get sessionId safely

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5000';

// export const addUserLevel = async (formData) => {

//   try {
//     const response = await axios.post(`${BASE_URL}/webuser/addUserLevel`, formData);

//     const responseData = response.data;
//     return response.data;

//   } catch (error) {
//     throw error;
//   }

// };

export const addUserLevel = async (formData) => {

  const data = {
    userslevel: formData.userLevel.toUpperCase(),
    sessiontimeout: formData.sessionTimeout,
    passwordexpiry: formData.passwordExpiry,
    minpassword: formData.minimumPassword,
    passwordhistory: formData.passwordHistory,
    maxallocuser: formData.maxAllocation
  };

  try {
    const response = await axios.post(`${BASE_URL}/web/manageuserlevel/add-user-level`, data, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.NEWUSERSLEVEL',
        'Language': 'EN',
        "token": `${sessionid}`,
      },
    });

    const responseData = response.data;
    return response.data;

  } catch (error) {
    throw error;
  }

};

// export const editUserLevel = async (formData) => {

//   try {
//     const response = await axios.post(`${BASE_URL}/webuser/editUserLevel`, formData);

//     const responseData = response.data;
//     return response.data;

//   } catch (error) {
//     throw error;
//   }

// };

export const editUserLevel = async (formData) => {

  const data = {
    userslevel: formData.userLevel,
    sessiontimeout: formData.sessionTimeout,
    passwordexpiry: formData.passwordExpiry,
    minpassword: formData.minimumPassword,
    passwordhistory: formData.passwordHistory,
    maxallocuser: formData.maxAllocation
  };

  try {
    const response = await axios.post(`${BASE_URL}/web/manageuserlevel/edit-user-level`, data, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.EDITUSERSLEVEL',
        'Language': 'EN',
        "token": `${sessionid}`,
      },
    });

    const responseData = response.data;
    return response.data;

  } catch (error) {
    throw error;
  }

};

// export const userLevelSearch = async (data) => {

//   try {
//     const response = await axios.post(`${BASE_URL}/webuser/userLevelSearch`, { userLevel: data });

//     const responseData = response.data;
    
//     if (responseData && responseData.StatusMessage === "Success") {
//       return { success: true, dataUserLevel: responseData.userLevelData, message : '' };
//     } else {
//       return { success: false, message: responseData?.message || "Unknown error" };
//     }
//   } catch (error) {
//     throw error;
//   }

// };

export const userLevelSearch = async (data) => {

  try {
    const response = await axios.post(`${BASE_URL}/web/getuserlevel`, { userslevel: data }, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.USERSLEVELSEARCH',
        'Language': 'EN',
        "token": `${sessionid}`,
      },
    });

    const responseData = response.data;
    
    if (responseData && responseData.StatusMessage === "Success") {
      const parsed = JSON.parse(responseData.Data);
      return { success: true, dataUserLevel: parsed, message : '' };
    } else {
      return { success: false, message: responseData?.message || "Unknown error" };
    }
  } catch (error) {
    throw error;
  }

};