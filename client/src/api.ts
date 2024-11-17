import axios from 'axios';

const API_URL = 'http://localhost:5002/predict';

export const getPrediction = async (symptoms: string) => {
  try {
    const response = await axios.post(API_URL, { symptoms });
    return response.data.prediction;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};
