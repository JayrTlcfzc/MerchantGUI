import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const viewWebUser = async (params) => {
    console.log(params);

    try {
      const response = await axios.post(`${BASE_URL}/webuser/viewWebUser`, params);
    
      const responseData = response.data
      console.log("search res", responseData.Accounts)
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, webusers: responseData.Accounts };
      } else {
        console.log(responseData?.StatusMessage || "No message");
        return { success: false, message: responseData?.StatusMessage || "Unknown error" };
      }

      return responseData;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };