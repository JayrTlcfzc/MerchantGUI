import axios from "axios";

const BASE_URL = 'http://localhost:5000';

const changePassword = async (oldPassword, newPassword) => {
   
    const data = {
        oldPassword: oldPassword, 
        newPassword: newPassword   
    };

    try {

        const storedLang = JSON.parse(localStorage.getItem("lang"));
        const language = (storedLang?.language).toUpperCase() || "Unknown Language";

        const userData = JSON.parse(localStorage.getItem("userData") || "{}"); 
        const sessionid = userData?.sessionId;
        
        const response = await axios.post(`${BASE_URL}/web/user/change-password`, data,{headers: {
            'Content-Type': 'application/json',
            'method': 'USERS.CHANGEPASSWORD',
            'Language': `${language}`,
            "token": `${sessionid}`,
          }});



        if (response.data.StatusCode === 0) {
            return {
                success: true,
                message: response.data.StatusMessage || "Password changed successfully",
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
            message: error.response?.data?.StatusMessage || "An unexpected error occurred",
        });
    }
};

export default changePassword;