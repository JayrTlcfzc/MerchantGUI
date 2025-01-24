import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const transactionTypeCol = async () => {
    const data = JSON.stringify({ "": "" });
  
    try {
      const response = await axios.post(`${BASE_URL}/reports/transactionTypeCollection`, data);
  
      const responseData = response.data;
      
      if (responseData && responseData.StatusMessage === "Successfully fetch data") {
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

export const generateReview = async () => {
  const data = JSON.stringify({ "": "" });

  try {
    const response = await axios.post(`${BASE_URL}/reports/generateReview`, data);

    const responseData = response.data;
    const param = JSON.parse(responseData.Data);
  
    // Extract all DATEFROM values into an array
    const dateFromArray = param.map((item) => {
      const parameters = JSON.parse(item.PARAMETERS);
      return parameters.DATEFROM;
    });

    // Extract all DATETO values into an array
    const dateToArray = param.map((item) => {
      const parameters = JSON.parse(item.PARAMETERS);
      return parameters.DATETO;
    });

    // Extract all DATETO values into an array
    const transTypeArray = param.map((item) => {
      const parameters = JSON.parse(item.PARAMETERS);
      return parameters.TRANSTYPE;
    });
    
    if (responseData && responseData.StatusMessage === "Successfully fetch data") {
      return { success: true, rowData: responseData.Data, dateFrom: dateFromArray, dateTo: dateToArray, transType: transTypeArray};
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
}

export const generateDataPDF = async (id) => {

  const payload = {
    ID: id,
  }

  try {
    const response = await axios.post(`${BASE_URL}/reports/generateDataPDF`, payload);
    return response.data;
  } catch (error) {
    console.error('Error requesting report:', error);
    throw error;
  }
};