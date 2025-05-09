import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update this with your actual backend URL

// Configure axios defaults
axios.defaults.withCredentials = true;

const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/projects`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch projects"
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response from server. Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
      throw new Error("Failed to set up request");
    }
  }
};

export default fetchProjects;
