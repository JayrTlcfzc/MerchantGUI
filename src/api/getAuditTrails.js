import axios from "axios";
import moment from "moment";

const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
const sessionid = userData?.sessionId; // Get sessionId safely

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5000';

export const GetAuditTrail = async (data) => {
  const { userinput, datefrom, dateto } = data.formData;

// // Function to format date as YYYY/MM/DD
// const formatDate = (date) => {
//   const [year, month, day] = date.split("-"); // Split the date into components
//   return `${year}/${month}/${day}`;  // Return formatted date
// };

// // Format the dates from YYYY-MM-DD to YYYY/MM/DD
// const formattedDateFrom = formatDate(datefrom);
// const formattedDateTo = formatDate(dateto);

// try {
//   const response = await axios.post(`${BASE_URL}/audit/getAuditTrails`, {
//     USERID: userinput,
//     DATEFROM: formattedDateFrom,
//     DATETO: formattedDateTo,
//   });

//   const data = response.data;

//   if (data.StatusMessage === "Success") {
//     return { success: true, audit: data.Audit.logs };
//   } else {
//     return { success: false, message: data.message };
//   }
//   } catch (error) {
//     return Promise.reject({
//       success: false,
//       message: error.response?.data?.message || error.message,
//     });
//   }


try {
  const response = await axios.post(`${BASE_URL}/audit/get-audit-trail`, {
    userid: userinput,
    datefrom: datefrom,
    dateto: dateto,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'method': 'USERS.GETAUDITTRAILS',
      'Language': 'EN',
      "token": `${sessionid}`,
    },
  });

  const result = response.data;
  // console.log("AUDIT TRAIL: ", result.Data)

  if (result.StatusMessage === "Success") {
    return { success: true, audit: result.Data };
  } else {
    return { success: false, message: result.StatusMessage };
  }
  } catch (error) {
    return Promise.reject({
      success: false,
      message: error.response?.result?.StatusMessage || error.message,
    });
  }
};
