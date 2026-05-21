import axios from 'axios';

const API_URL = '/api/internships';

export const fetchInternships = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("API Fetch Error from backend:", error);
    // If backend is down, return empty array
    return [];
  }
};
