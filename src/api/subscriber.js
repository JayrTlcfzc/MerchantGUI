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
