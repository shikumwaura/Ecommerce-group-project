
const JSON_SERVER_BASE_URL = 'http://localhost:3001'; // Your json-server URL
const DUMMYJSON_PRODUCTS_URL = 'https://dummyjson.com/products';

export const fetchInitialProducts = async () => {
  try {
    const response = await fetch(DUMMYJSON_PRODUCTS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.products; // DummyJSON returns products inside a 'products' array
  } catch (error) {
    console.error("Error fetching initial products from DummyJSON:", error);
    return []; // Return empty array on error
  }
};

export const addProductToJsonServer = async (productData) => {
  const configObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  };
  try {
    const response = await fetch(`${JSON_SERVER_BASE_URL}/products`, configObj);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error("Error adding product to json-server:", error);
    throw error; // Re-throw to handle in component
  }
};

export const fetchOrdersFromJsonServer = async () => {
    try {
        const response = await fetch(`${JSON_SERVER_BASE_URL}/orders`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error("Error fetching orders from json-server:", error);
        return [];
    }
};

export const placeOrderToJsonServer = async (orderDetails) => {
    const configObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
    };
    try {
        const response = await fetch(`${JSON_SERVER_BASE_URL}/orders`, configObj);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newOrder = await response.json();
        return newOrder;
    } catch (error) {
        console.error("Error placing order to json-server:", error);
        throw error;
    }
};