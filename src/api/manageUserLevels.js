import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const addUserLevel = async (formData) => {

  console.log("FORM DATA: " + formData)

  try {
    const response = await axios.post(`${BASE_URL}/webusers/addUserLevel`, formData);

    const responseData = response.data;
    console.log("RESPONSE DATA: "+ responseData)
    return response.data;

  } catch (error) {
    console.error('Error adding user level:', error);
    throw error;
  }

};