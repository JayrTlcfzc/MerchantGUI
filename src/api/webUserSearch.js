import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const viewWebUser = async (params) => {
    

    try {
      const response = await axios.post(`${BASE_URL}/webuser/viewWebUser`, params);
    
      const responseData = response.data
     
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, webusers: responseData.Accounts };
      } else {
        
        return { success: false, message: responseData?.message || "Unknown error" };
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


  export const searchWebUser = async (username) => {
    

    try {
      const response = await axios.post(`${BASE_URL}/webuser/searchWebUser`, username);
    
      const responseData = response.data
    
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, webusers: responseData.Accounts };
      } else {
     
        return { success: false, message: responseData?.message || "Unknown error" };
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

