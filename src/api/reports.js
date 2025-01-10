import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const transactionTypeCol = async () => {
    const data = JSON.stringify({ "": "" });
  
    try {
      const response = await axios.post(`${BASE_URL}/reports/transactionTypeCollection`, data);
  
      const responseData = response.data;
      console.log("RESPONSE DATA: " + responseData.StatusMessage);
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, transactType: responseData.Data };
      } else {
        console.log(responseData?.StatusMessage || "No message");
        return { success: false, message: responseData?.StatusMessage || "Unknown error" };
      }
    } catch (error) {
      console.error("Error in React:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      return { success: false, message: error.response?.data?.StatusMessage || error.message };
    }
};

export const requestReport = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/reports/requestReport`, formData);
      return response.data;
    } catch (error) {
      console.error('Error requesting report:', error);
      throw error;
    }
  };

 