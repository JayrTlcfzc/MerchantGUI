import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const getRolesConfigTable = async (data) => {

  console.log("USER LEVEL: " + data)

  try {
    const response = await axios.post(`${BASE_URL}/webuser/rolesConfiguration`, { userLevel: data });

    const responseData = response.data;
    console.log("RESPONSE DATA (Roles): " + responseData.roles);

    if (responseData.message === "Success") {
      return { success: true, roles: responseData.roles };
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

export const updateRoles = async (userlevel, id, module, actionStatus) => {

  try {
    const response = await axios.post(`${BASE_URL}/webuser/updateRoles`, {
      userlevel,
      id,
      module,
      actionStatus
    });

    const responseData = response.data;

    if (responseData.message === "Role successfully updated") {
      return { success: true, newRole: responseData.newRole };
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