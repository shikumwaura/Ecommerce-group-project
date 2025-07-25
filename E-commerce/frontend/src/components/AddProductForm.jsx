import React, { useState } from 'react';
import styles from '../styles/AddProductForm.module.css';

function AddProductForm({ addProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '', // Will be used for both thumbnail and main image
  });
  const [isAdding, setIsAdding] = useState(false); // To toggle form visibility
  const [loading, setLoading] = useState(false); // For showing loading state
  const [error, setError] = useState(null);     // For displaying errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { // Made it async for better error handling
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

// Basic validation
if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.image) {
  setError("Please fill in all product details.");
  setLoading(false);
  return;
}
if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
  setError("Price must be a positive number.");
  setLoading(false);
  return;
}

// Prepare new product data to be consistent with DummyJSON structure as much as possible,
// so it displays well alongside fetched DummyJSON products.
const newProduct = {
  title: formData.title,
  description: formData.description,
  price: parseFloat(formData.price),
  category: formData.category,
  image: formData.image, // Use this as the main display image in ProductCard
  thumbnail: formData.image, // DummyJSON often uses 'thumbnail'
  images: [formData.image], // DummyJSON has an 'images' array
  brand: "Custom Brand", // Default brand for added products
  rating: { rate: (Math.random() * 4 + 1).toFixed(1), count: Math.floor(Math.random() * 500) + 10 }, // Random realistic rating
  stock: Math.floor(Math.random() * 1000) + 1, // Random stock
};

const configObj = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct),
};

try {
  const response = await fetch('http://localhost:3001/products', configObj); // TARGETING JSON SERVER
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  addProduct(data); // THIS STATE UPDATE IS REQUIRED!!!
  setFormData({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  }); // Clear form
  setIsAdding(false); // Hide form after submission
  alert('Product added successfully!');
} catch (err) {
  console.error('Error adding product:', err);
  setError(`Failed to add product: ${err.message}. Is the backend server running?`);
} finally {
  setLoading(false); // End loading state
}
  };

  return (
    <div className={styles.addProductSection}>
      <button
        className={`${styles.toggleFormBtn} btn-secondary`}
        onClick={() => setIsAdding(!isAdding)}
        disabled={loading} // Disable toggle button while loading
      >
        {isAdding ? 'Cancel Add Product' : 'Add New Product'}
      </button>

  {isAdding && (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Add New Product</h2>
      {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}

      <label htmlFor="title">Product Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        disabled={loading}
      ></textarea>

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="0"
        step="0.01"
        required
        disabled={loading}
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <label htmlFor="image">Image URL:</label>
      <input
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Adding Product...' : 'Submit Product'}
      </button>
    </form>
  )}
</div>
  );
}

export default AddProductForm;