import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Orders from './pages/Orders';
import About from './pages/About';
import './styles/App.module.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Determine the base URL for your JSON server backend
  // Use http://localhost:3001 for local development
  // Use your specific Vercel URL for production
  const JSON_SERVER_BASE_URL = window.location.origin.includes('localhost')
    ? 'http://localhost:3001'
    : 'https://ecommerce-group-project.vercel.app'; // <--- DIRECTLY USE YOUR VERCEL URL HERE

  // Fetch initial products from DummyJSON and orders from json-server
  useEffect(() => {
    // --- Fetch initial products from DummyJSON ---
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        const dummyProducts = data.products.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            category: p.category,
            image: p.thumbnail || p.images[0],
            rating: p.rating ? { rate: p.rating, count: Math.floor(Math.random() * 1000) } : { rate: 0, count: 0 }
        }));
        setProducts(dummyProducts);
      })
      .catch(error => console.error("Error fetching products from DummyJSON:", error));

    // --- Fetch orders from your deployed json-server backend ---
    fetch(`${JSON_SERVER_BASE_URL}/backend/orders`) // <--- Uses the specific Vercel URL
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(error => console.error("Error fetching orders from backend:", error));
  }, []); // Dependency array is empty as JSON_SERVER_BASE_URL is effectively constant per environment load

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
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const placeOrder = (orderDetails) => {
    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...orderDetails,
        items: cartItems,
        date: new Date().toISOString(),
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
      })
    };

    fetch(`${JSON_SERVER_BASE_URL}/backend/orders`, configObj) // <--- Uses the specific Vercel URL
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setOrders((prevOrders) => [...prevOrders, data]);
        setCartItems([]);
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
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;