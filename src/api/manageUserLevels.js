import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const addUserLevel = async (formData) => {

  try {
    const response = await axios.post(`${BASE_URL}/webuser/addUserLevel`, formData);

    const responseData = response.data;
    return response.data;

  } catch (error) {
    throw error;
  }

};

export const editUserLevel = async (formData) => {

  try {
    const response = await axios.post(`${BASE_URL}/webuser/editUserLevel`, formData);

    const responseData = response.data;
    return response.data;

  } catch (error) {
    throw error;
  }

};

export const userLevelSearch = async (data) => {

  try {
    const response = await axios.post(`${BASE_URL}/webuser/userLevelSearch`, { userLevel: data });

    const responseData = response.data;
    
    if (responseData && responseData.StatusMessage === "Success") {
      return { success: true, dataUserLevel: responseData.userLevelData, message : '' };
    } else {
      return { success: false, message: responseData?.message || "Unknown error" };
    }
  } catch (error) {
    throw error;
  }

};