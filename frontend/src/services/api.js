// services/api.js
import axios from 'axios';

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;  // You may want to handle errors differently depending on your needs
  }
};
