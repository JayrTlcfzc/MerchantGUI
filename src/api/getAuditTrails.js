import axios from "axios";
import moment from "moment";  // Import moment

const BASE_URL = "http://localhost:3000";

export const GetAuditTrail = async (data) => {
  console.log(data); 

  const { userinput, datefrom, dateto } = data.formData;

// Function to format date as YYYY/MM/DD
const formatDate = (date) => {
  const [year, month, day] = date.split("-"); // Split the date into components
  return `${year}/${month}/${day}`;  // Return formatted date
};

// Format the dates from YYYY-MM-DD to YYYY/MM/DD
const formattedDateFrom = formatDate(datefrom);
const formattedDateTo = formatDate(dateto);

console.log("User ID:", userinput);
console.log("Formatted Date From:", formattedDateFrom);
console.log("Formatted Date To:", formattedDateTo);

try {
  const response = await axios.post(`${BASE_URL}/audit/getAuditTrails`, {
    USERID: userinput,
    DATEFROM: formattedDateFrom,
    DATETO: formattedDateTo,
  });

  const data = response.data;
  console.log('logs ' ,data.Audit.logs);


  if (data.StatusMessage === "Success") {
    return { success: true, audit: data.Audit.logs };
  } else {
    console.log(data.message)
    return { success: false, message: data.message };
  }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};
