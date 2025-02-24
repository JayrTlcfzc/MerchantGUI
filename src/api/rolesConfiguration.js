import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// export const getRolesConfigTable = async (data) => {

//   try {
//     const response = await axios.post(`${BASE_URL}/webuser/rolesConfiguration`, { userLevel: data });

//     const responseData = response.data;

//     if (responseData.message === "Success") {
//       return { success: true, roles: responseData.roles };
//     } else {
//       return { success: false, message: responseData?.StatusMessage || "Unknown error" };
//     }
//   } catch (error) {
//     return { success: false, message: error.response?.data?.StatusMessage || error.message };
//   }

// }

export const getRolesConfigTable = async (data) => {

  try {
    const response = await axios.post(`http://localhost:5000/web/rolesconfig/get-roles`, { userslevel: data });

    const responseData = response.data;
    if (responseData.StatusMessage === "Success") {
      return { success: true, roles: responseData.Data };
    } else {
      return { success: false, message: responseData?.message || "Unknown error" };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }

}

// export const updateRoles = async (userlevel, id, module, actionStatus) => {

//   try {
//     const response = await axios.post(`${BASE_URL}/webuser/updateRoles`, {
//       userlevel,
//       id,
//       module,
//       actionStatus
//     });

//     const responseData = response.data;

//     if (responseData.message === "Role successfully updated") {
//       return { success: true, newRole: responseData.newRole };
//     } else {
//       return { success: false, message: responseData?.StatusMessage || "Unknown error" };
//     }
//   } catch (error) {
//     return { success: false, message: error.response?.data?.StatusMessage || error.message };
//   }

// }

export const updateRoles = async (userlevel, id, module, actionStatus) => {

  try {
    const response = await axios.post(`http://localhost:5000/web/rolesconfig/update-roles`, {
      userslevel: userlevel,
      id: id,
      module: module,
      actionstatus: actionStatus
    });

    const responseData = response.data;
    
    if (responseData.StatusMessage === "Success") {
      return { success: true, newRole: responseData.Data };
    } else {
      return { success: false, message: responseData?.StatusMessage || "Unknown error" };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.StatusMessage || error.message };
  }

}