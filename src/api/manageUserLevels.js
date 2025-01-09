import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const addUserLevel = async (formData) => {

  try {
    const response = await axios.post(`${BASE_URL}/webuser/addUserLevel`, formData);

    const responseData = response.data;
    console.log("RESPONSE DATA: "+ responseData)
    return response.data;

  } catch (error) {
    console.error('Error adding user level:', error);
    throw error;
  }

};

export const editUserLevel = async (formData) => {

  try {
    const response = await axios.post(`${BASE_URL}/webuser/editUserLevel`, formData);

    const responseData = response.data;
    console.log("RESPONSE DATA: "+ responseData)
    return response.data;

  } catch (error) {
    console.error('Error adding user level:', error);
    throw error;
  }

};

export const userLevelSearch = async (data) => {

  console.log("USER LEVEL: " + data);

  try {
    const response = await axios.post(`${BASE_URL}/webuser/userLevelSearch`, { userLevel: data });

    const responseData = response.data;
    console.log("check  ",responseData.userLevelData);
    
    if (responseData && responseData.StatusMessage === "Success") {
      console.log("SUCCESS HERE!");
      return { success: true, dataUserLevel: responseData.userLevelData, message : '' };
    } else {
      console.log("FAILED HERE!");
      return { success: false, message: responseData?.message || "Unknown error" };
    }

  } catch (error) {
    console.error('Error adding user level:', error);
    throw error;
  }

};