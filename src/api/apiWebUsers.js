import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "http://localhost:5000";

/**
 * 
 * @param {string} endpoint 
 * @param {object} payload 
 * @param {object} extraHeaders 
 * @returns {Promise<object>} 
 */
const makeApiRequest = async (endpoint, payload, extraHeaders = {}) => {
  try {

    const storedLang = JSON.parse(localStorage.getItem("lang"));
    const language = (storedLang?.language).toUpperCase() || "Unknown Language";

    // Fetch the latest sessionId before each request
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const sessionid = userData?.sessionId; // Ensure it's always up-to-date

    console.log("Updated sessionId: ", sessionid);

    const headers = {
      "Content-Type": "application/json",
      "Language": `${language}`,
      "token": sessionid,  
      ...extraHeaders, 
    };

    const response = await axios.post(`${BASE_URL}${endpoint}`, payload, { headers });
    const responseData = response.data;
    console.log("DATA: ", responseData);

    if (responseData && (responseData.StatusCode === 0)) {
      return { success: true, webusers: responseData.Accounts || null, message: responseData?.StatusMessage || null };
    } else {
      return { success: false, message: responseData?.StatusMessage || "Unknown error" };
    }
  } catch (error) {
    throw error;
  }
};

// Define API functions
export const lockWebUser = (username) =>
  makeApiRequest("/web/userupdate/update-lock", { username }, { method: "USERS.LOCKUSER" });

export const unlockWebUser = (username) =>
  makeApiRequest("/web/userupdate/update-unlock", { username }, { method: "USERS.UNLOCKUSER" });

export const activeWebUser = (username) =>
  makeApiRequest("/web/userupdate/update-active", { username }, { method: "USERS.ACTIVATEUSER" });

export const deactiveWebUser = (username) =>
  makeApiRequest("/web/userupdate/update-deactive", { username }, { method: "USERS.DEACTIVATEUSER" });

export const resetWebUser = (username) =>
  makeApiRequest("/web/userupdate/reset-user", { username }, { method: "USERS.RESETPASSWORD" });

export const updateWebUser = (formData) =>
  makeApiRequest(
    "/web/userupdate/update-user",
    {
      id: formData.userId,
      email: formData.email,
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      msisdn: formData.msisdn,
      userslevel: formData.userslevel,
      department: formData.department,
      company: formData.company,
      status: formData.status,
      msisdnotp: formData.otp,
      locked: formData.locked,
    },
    { method: "USERS.UPDATEUSER" }
  );
