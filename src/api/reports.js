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
    console.log("RESPONSE . DATA: ",response.data)

    const responseData = response.data;
    console.log("RESPONSEDATA: ", responseData.data);

    if (responseData && responseData.message === "Successfully fetch data") {
      return { success: true, data: responseData.Data, dataFile: responseData.data};
    } else {
      console.log(responseData?.StatusMessage || "No message");
      return { success: false, message: responseData?.StatusMessage || "Unknown error" };
    }

  } catch (error) {
    console.error('Error requesting report:', error);
    throw error;
  }
};

export const downloadPDF = async (pdfData, reportName) => {

  console.log("REPORT NAME: ", reportName);
  console.log("PDF DATA: ", pdfData);

  const payload = {
    data: pdfData,
    reportName: reportName,
  }

  try {
    const response = await axios.post(`${BASE_URL}/reports/downloadPDF`,
      payload,
      { responseType: 'blob' });

      // Create a URL for the PDF blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfURL = URL.createObjectURL(pdfBlob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = pdfURL;
      link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
};