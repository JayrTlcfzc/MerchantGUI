import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const searchSubs = async (msisdn, optINP) => {
  const params = { msisdn, optINP };
  console.log(params)
  const storedData = JSON.parse(localStorage.getItem('userData'));

  console.log('stored',storedData.msisdn )

  try {
    const response = await axios.post(`${BASE_URL}/subscriber/searchSubscriber`, params);
    const data = response.data;

    console.log("search subs:", data);

    if (data.StatusMessage === "Success") {
      return { success: true, account: data.Account };
    } else {
      console.log(data.message)
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.StatusMessage || error.message };
  }
};


export const accountTypeCol = async () => {
  const data = JSON.stringify({ "": "" });

  try {
    const response = await axios.post(`${BASE_URL}/subscriber/accountTypeCollection`, data);

   
    const responseData = response.data;
   

    if (responseData && responseData.StatusMessage === "Success") {
      return { success: true, account: responseData.Data };
    } else {
      console.log(responseData?.message || "No message");
      return { success: false, message: responseData?.message || "Unknown error" };
    }
  } catch (error) {
    console.error("Error in React:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }
    return { success: false, message: error.response?.data?.StatusMessage || error.message };
  }
};


export const registerSubscriber = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/subscriber/registerSubscriber`, formData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};