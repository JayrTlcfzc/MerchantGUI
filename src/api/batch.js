import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const batchUploadedFiles = async () => {
  const data = JSON.stringify({ "": "" });

  try {
    const response = await axios.post(`${BASE_URL}/funds/batchUploadedFiles`, data);

    const responseData = response.data;
    console.log("responseData.Data: "+ responseData.Data);
    
    if (responseData && responseData.StatusMessage === "Successfully fetch data") {
      return { success: true, batchData: responseData.Data };
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