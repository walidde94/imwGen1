import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

// Fetch items from the backend
export const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Return the list of items
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Add a new item to the backend
export const createItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;  // Return the newly created item
  } catch (error) {
    console.error('Error creating item:', error);
  }
};
