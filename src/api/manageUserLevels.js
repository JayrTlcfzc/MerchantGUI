import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5000';

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

    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language).toUpperCase() || "EN";

    const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
    const sessionid = userData?.sessionId;

    const response = await axios.post(`${BASE_URL}/web/manageuserlevel/add-user-level`, data, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.NEWUSERSLEVEL',
        'Language': `${language}`,
        "token": `${sessionid}`,
      },
    });

    if (response.StatusCode === 97 || response.StatusCode === 93 || response.StatusCode === 98) {
      return { logout: true, message: response?.StatusMessage };
    } else {
      return response.data;
    }

  } catch (error) {
    throw error;
  }

};

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

    const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
    const sessionid = userData?.sessionId;

    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language).toUpperCase() || "EN";

    const response = await axios.post(`${BASE_URL}/web/manageuserlevel/edit-user-level`, data, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.EDITUSERSLEVEL',
        'Language': `${language}`,
        "token": `${sessionid}`,
      },
    });

    if (response.StatusCode === 97 || response.StatusCode === 93  || response.StatusCode === 98) {
      return { logout: true, message: response?.StatusMessage };
    } else {
      return response.data;
    }

  } catch (error) {
    throw error;
  }

};

export const userLevelSearch = async (data) => {

  try {

    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language).toUpperCase() || "EN";

    const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
    const sessionid = userData?.sessionId;

    const response = await axios.post(`${BASE_URL}/web/getuserlevel`, { userslevel: data }, {
      headers: {
        'Content-Type': 'application/json',
        'method': 'USERS.USERSLEVELSEARCH',
        'Language': `${language}`,
        "token": `${sessionid}`,
      },
    });

    const responseData = response.data;
    console.log(responseData);
    
    if (responseData.StatusCode === 97 || responseData.StatusCode === 93 || responseData.StatusCode === 98) {
      return { logout: true, message: responseData?.StatusMessage };
    } else if (responseData && responseData.StatusCode === 0) {
      const parsed = JSON.parse(responseData.Data);
      return { success: true, dataUserLevel: parsed, message : parsed.StatusMessage };
    } else {
      return { success: false, message: responseData?.StatusMessage || "Unknown error" };
    }
  } catch (error) {
    throw error;
  }

};