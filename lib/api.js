import axios from "axios";

const API_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
const APP_ID = "0a6676d1";  // Make sure this is correct
const API_KEY = "8a0d5fe7281bc2567fa8c55ccd575c28";  // Make sure this is correct

export async function fetchCalories(query) {
  try {
    const response = await axios.post(
      API_URL,
      { query },
      {
        headers: {
          "x-app-id": APP_ID,
          "x-app-key": API_KEY,
          "x-remote-user-id": "0",  // This is required
          "Content-Type": "application/json",
        },
      }
    );
    console.log("The data: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching data:", error.response?.data || error);
    return null;
  }
}
