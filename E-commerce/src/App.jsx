import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import About from './pages/About';
import Orders from './pages/Orders';
import './styles/App.module.css'; // Specific App component styling

// If you used the optional api/products.js, uncomment these:
import { fetchInitialProducts, fetchOrdersFromJsonServer, placeOrderToJsonServer } from './api/products';


function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch initial products from DummyJSON and orders from json-server
  useEffect(() => {
    // --- Fetch initial products from DummyJSON ---
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        // DummyJSON returns products in a 'products' array
        // We'll map them to ensure they have an 'id' which json-server expects if adding later
        const dummyProducts = data.products.map(p => ({
            id: p.id, // DummyJSON provides good IDs
            title: p.title,
            description: p.description,
            price: p.price,
            category: p.category,
            image: p.thumbnail || p.images[0], // Use thumbnail or first image
            rating: p.rating ? { rate: p.rating, count: Math.floor(Math.random() * 1000) } : { rate: 0, count: 0 } // DummyJSON rating is just a number
        }));
        setProducts(dummyProducts);
      })
      .catch(error => console.error("Error fetching products from DummyJSON:", error));

    // --- Fetch orders from your json-server ---
    fetch('http://localhost:3001/orders') // Adjust if you deploy json-server elsewhere
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(error => console.error("Error fetching orders from json-server:", error));
  }, []); // Empty dependency array means this runs once on mount

  // REQUIRED: Add product function (for POST request to json-server)
  // This will be called from AddProductForm.jsx
  const addProduct = (newProduct) => {
    // We already fetch initial products from DummyJSON, but new products
    // added by the form go to our json-server. We display them together.
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
    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...orderDetails,
        items: cartItems, // Include cart items in the order
        date: new Date().toISOString(),
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
      })
    };

    fetch('http://localhost:3001/orders', configObj) // POST to your json-server for orders
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
          <Route path="/about" element={<About />} /> {/* <--- ADD THIS NEW ROUTE */}
          {/* You could also add a fallback for unmatched routes (e.g., a 404 page) */}
          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;