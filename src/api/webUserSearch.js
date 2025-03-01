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
      const response = await axios.post(`${BASE_URL}/web/usersearch/search-user`, data, {
        headers: {
          'Content-Type': 'application/json',
          'method': 'USERS.SEARCHUSER',
          'Language': 'EN',
        },
      });
    
      const responseData = response.data;
    
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, webusers: responseData.Data };
      } else {
        return { success: false, message: responseData?.message || "Unknown error" };
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
      const response = await axios.post(`${BASE_URL}/web/usersearch/view-user`, username, {
        headers: {
          'Content-Type': 'application/json',
          'method': 'USERS.GETUSERSLIST',
          'Language': 'EN',
        },
      });
      
      const responseData = response.data;
    
      if (responseData && responseData.StatusMessage === "Success") {
        return { success: true, webusers: responseData.Data[0] };
      } else {
        return { success: false, message: responseData?.message || "Unknown error" };
      }
    } catch (error) {
      throw error;
    }
  };

  // export const lockWebUser = async (username) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/webuser/lockWebUser`, { username });
    
  //     const responseData = response.data

  //     if (responseData && responseData.success) {
  //       return { success: true, message: responseData?.message };
  //     } else {
  //       return { success: false, message: responseData?.message || "Unknown error" };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // export const unlockWebUser = async (username) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/webuser/unlockWebUser`, { username });
    
  //     const responseData = response.data

  //     if (responseData && responseData.success) {
  //       return { success: true, message: responseData?.message };
  //     } else {
  //       return { success: false, message: responseData?.message || "Unknown error" };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // export const activeWebUser = async (username) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/webuser/activeWebUser`, { username });
    
  //     const responseData = response.data

  //     if (responseData && responseData.success) {
  //       return { success: true, message: responseData?.message };
  //     } else {
  //       return { success: false, message: responseData?.message || "Unknown error" };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // export const deactiveWebUser = async (username) => {
  //   try {

  //     const response = await axios.post(`${BASE_URL}/webuser/deactiveWebUser`, { username });
    
  //     const responseData = response.data

  //     if (responseData && responseData.success) {
  //       return { success: true, message: responseData?.message };
  //     } else {
  //       return { success: false, message: responseData?.message || "Unknown error" };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // export const resetWebUser = async (username) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/webuser/resetWebUser`, { username });
    
  //     const responseData = response.data

  //     if (responseData && responseData.success) {
  //       return { success: true, message: responseData?.message };
  //     } else {
  //       return { success: false, message: responseData?.message || "Unknown error" };
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };



