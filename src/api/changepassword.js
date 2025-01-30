import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const changePassword = async (oldPassword, newPassword) => {
   
    const data = {
        OLDPASSWORD: oldPassword, 
        PASSWORD: newPassword   
    };

    try {
        
        const response = await axios.post(`${BASE_URL}/changepassword/changePasswordReq`, data);
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

export default changePassword;