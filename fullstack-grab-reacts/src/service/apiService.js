import axios from "axios";

const API_URL = "http://localhost:8080/";
const API_ORDER = API_URL + "api/orders/";
const API_CART = API_URL + "api/foods/cart";
const API_FOODS = API_URL + "api/foods";
const API_ADD_CART = API_URL + "api/foods/cart/";

export const fetchStatisticsData = async () => {
  try {
    const response = await axios.get(`${API_ORDER}statistics`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching statistics data:", error);
    throw error;
  }
};

export const fetchOngoingOrders = async (paxId) => {
  try {
    const response = await axios.get(`${API_ORDER}ongoing/${paxId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching ongoing orders data:", error);
    throw error;
  }
};

export const fetchHistoricalOrders = async (paxIdGsi, state) => {
  try {
    let url = `${API_ORDER}historical?paxIdGsi=${paxIdGsi}`;
    if (state) {
      url += `&state=${state}`;
    }
    const response = await axios.get(url);
    return response.data.data.orders;
  } catch (error) {
    console.error("Error fetching historical orders data:", error);
    throw error;
  }
};

export const fetchFoodLists = async () => {
  try {
    const response = await axios.get(API_FOODS);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching food lists:", error);
    throw error;
  }
};

export const addToCart = async (foodId) => {
  try {
    const response = await axios.post(API_ADD_CART, { foodId });
    console.log(
      `Makanan dengan ID ${foodId} ditambahkan ke keranjang:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding item with ID ${foodId} to cart:`, error);
    throw error;
  }
};

export const fetchOrderData = async () => {
  try {
    const response = await axios.get(API_ORDER);
    return response.data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;
  }
};

export const completeOrder = async () => {
  try {
    await axios.put(`${API_ORDER}updated/`);
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Fetch cart lists
export const fetchCartLists = async () => {
  try {
    const response = await axios.get(`${API_CART}/data`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cart lists:", error);
    throw error;
  }
};

// Handle checkout
export const handleCheckout = async () => {
  try {
    const response = await axios.post(`${API_ORDER}create`, {});
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (foodId) => {
  try {
    const response = await axios.delete(`${API_CART}/${foodId}`);
    console.log("Item with ID " + foodId + " removed from cart:");
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error removing item with ID ${foodId} from cart:`, error);
    throw error;
  }
};
