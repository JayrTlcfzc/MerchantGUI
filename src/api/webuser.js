import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const userLevelCol = async () => {
    const data = JSON.stringify({ "": "" });
  
    try {
      const response = await axios.post(`${BASE_URL}/webuser/userLevel`, data);
  
      const responseData = response.data;
     
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, level: responseData.Data };
      } else {
        console.log(responseData?.message || "No message");
        return { success: false, message: responseData?.message || "Unknown error" };
      }
    } catch (error) {
      console.error("Error in React:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      return { success: false, message: error.response?.data?.StatusMessage || error.message };
    }
};

export const registerWebUser = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/webuser/registerWebUser`, formData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };