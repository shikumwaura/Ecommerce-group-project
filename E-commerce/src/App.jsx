import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Orders from './pages/Orders';
import './styles/App.module.css'; // Specific App component styling

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch initial products from json-server or DummyJSON
  useEffect(() => {
    // For json-server:
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products from json-server:", error));

    // For DummyJSON (uncomment and replace json-server fetch if preferred)
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products)) // DummyJSON returns products
      .catch(error => console.error("Error fetching products from DummyJSON:", error));

    // Fetch orders (assuming json-server handles them)
  //   fetch('http://localhost:3001/orders')
  //     .then(res => res.json())
  //     .then(data => setOrders(data))
  //     .catch(error => console.error("Error fetching orders:", error));
  // }, []);

  // REQUIRED: Add product function (for POST request)
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === productId ? { ...item, quantity: quantity } : item))
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0
    );
  };

  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const placeOrder = (orderDetails) => {
    // This will be a POST request to json-server for orders
    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...orderDetails, items: cartItems, date: new Date().toISOString() })
    };

    fetch('http://localhost:3001/orders', configObj)
      .then(res => res.json())
      .then(data => {
        setOrders((prevOrders) => [...prevOrders, data]); // REQUIRED STATE UPDATE
        setCartItems([]); // Clear cart after successful order
        alert('Order placed successfully!');
      })
      .catch(error => console.error("Error placing order:", error));
  };


  return (
    <>
      <Navbar cartItemCount={cartItems.length} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<ProductPage products={products} addProduct={addProduct} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateCartQuantity={updateCartQuantity}
                removeCartItem={removeCartItem}
                placeOrder={placeOrder}
              />
            }
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;