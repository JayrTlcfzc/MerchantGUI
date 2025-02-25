import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * 
 * @param {string} endpoint 
 * @param {object} payload 
 * @returns {Promise<object>} 
 */
const makeApiRequest = async (endpoint, payload) => {
  try {
    console.log("payload: ", payload)
    // const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
    const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
    const responseData = response.data;

    if (responseData && (responseData.StatusMessage === "Success" || responseData.success) ) {
      return { success: true, webusers: responseData.Accounts || null, message: responseData?.message || null };
    } else {
      return { success: false, message: responseData?.message || "Unknown error" };
    }
  } catch (error) {
    throw error;
  }
};

// Define API functions
export const viewWebUser = (params) => makeApiRequest("/webuser/viewWebUser", params);
export const searchWebUser = (username) => makeApiRequest("/webuser/searchWebUser", { username });

export const lockWebUser = (username) => makeApiRequest("/webuser/lockWebUser", { username });
export const unlockWebUser = (username) => makeApiRequest("/webuser/unlockWebUser", { username });
export const activeWebUser = (username) => makeApiRequest("/webuser/activeWebUser", { username });
export const deactiveWebUser = (username) => makeApiRequest("/webuser/deactiveWebUser", { username });
export const resetWebUser = (username) => makeApiRequest("/webuser/resetWebUser", { username });
// export const updateWebUser = (formData) => makeApiRequest("/webuser/updateWebUser", { formData });
export const updateWebUser = (formData) => makeApiRequest("/web/userupdate/update-user", { 
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
  msisdn: formData.msisdn,
  msisdnotp: formData.otp,
  locked: formData.locked
 });