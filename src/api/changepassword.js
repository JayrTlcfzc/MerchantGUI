import axios from "axios";


// Base URL for your API
const BASE_URL = "http://localhost:3000"; 


const changePassword = async (oldPassword, newPassword) => {
   
    const data = {
        OLDPASSWORD: oldPassword, 
        PASSWORD: newPassword   
    };

    try {
        
        const response = await axios.post(`${BASE_URL}/changepassword/changePasswordReq`, data);
        console.log('response' , response.data.StatusCode);
        if (response.data.StatusCode === 0) {
            return {
                success: true,
                message: response.data.message || "Password changed successfully",
            };
        } else {
            return {
                success: false,
                message: response.data.StatusMessage || "Password change failed",
            };
        }
    } catch (error) {
        return Promise.reject({
            success: false,
            message: error.response?.data?.message || "An unexpected error occurred",
        });
    }
};

// Export the function as default
export default changePassword;
