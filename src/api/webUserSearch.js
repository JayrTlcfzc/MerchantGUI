import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = 'http://localhost:5000';

// export const viewWebUser = async (params) => {
    
//     try {
//       const response = await axios.post(`${BASE_URL}/webuser/viewWebUser`, params);
    
//       const responseData = response.data
     
//       if (responseData && responseData.StatusMessage === "Success") {
//         return { success: true, webusers: responseData.Accounts };
//       } else {
//         return { success: false, message: responseData?.message || "Unknown error" };
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

  export const viewWebUser = async (params) => {

    const data = {
      // email: params.USER,
      username: params.USER
    }
      
    try {

      const storedLang = JSON.parse(localStorage.getItem("lang"));
      const language = (storedLang?.language).toUpperCase() || "Unknown Language";

      const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
      const sessionid = userData?.sessionId;

      const response = await axios.post(`${BASE_URL}/web/usersearch/search-user`, data, {
        headers: {
          'Content-Type': 'application/json',
          'method': 'USERS.SEARCHUSER',
          'Language': `${language}`,
          "token": `${sessionid}`,
        },
      });
    
      const responseData = response.data;
    
      if (responseData && responseData.StatusCode === 0) {
        return { success: true, webusers: responseData.Data };
      } else {
        return { success: false, message: responseData?.StatusMessage || "Unknown error" };
      }
    } catch (error) {
      throw error;
    }
  };

  // export const searchWebUser = async (username) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/webuser/searchWebUser`, username);
    
  //     const responseData = response.data
    
  //     if (responseData && responseData.StatusMessage === "Success") {
  //       return { success: true, webusers: responseData.Accounts };
  //     } else {
  //       return { success: false, message: responseData?.message || "Unknown error" };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  export const searchWebUser = async (username) => {

    try {

      const storedLang = JSON.parse(localStorage.getItem("lang"));
      const language = (storedLang?.language).toUpperCase() || "Unknown Language";

      const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
      const sessionid = userData?.sessionId;
    
      const response = await axios.post(`${BASE_URL}/web/usersearch/view-user`, username, {
        headers: {
          'Content-Type': 'application/json',
          'method': 'USERS.GETUSERSLIST',
          'Language': `${language}`,
          "token": `${sessionid}`,
        },
      });
      
      const responseData = response.data;
      console.log("responseData.StatusCode: ", responseData.StatusCode);
    
      if (responseData && responseData.StatusCode === 0) {
        return { success: true, webusers: responseData.Data[0] };
      } else {
        return { success: false, message: responseData?.StatusMessage || "Unknown error" };
      }
    } catch (error) {
      throw error;
    }
  };