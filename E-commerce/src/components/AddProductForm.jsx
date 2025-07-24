import React, { useState } from 'react';
import styles from '../styles/AddProductForm.module.css';

function AddProductForm({ addProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Determine the base URL for your JSON server backend
  const JSON_SERVER_BASE_URL = window.location.origin.includes('localhost')
    ? 'http://localhost:3001'
    : 'https://ecommerce-group-project.vercel.app'; //DIRECTLY USE YOUR VERCEL URL HERE

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

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

    const newProduct = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      thumbnail: formData.image,
      images: [formData.image],
      brand: "Custom Brand",
      rating: { rate: (Math.random() * 4 + 1).toFixed(1), count: Math.floor(Math.random() * 500) + 10 },
      stock: Math.floor(Math.random() * 1000) + 1,
    };

    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    };

    try {
      const response = await fetch(`${JSON_SERVER_BASE_URL}/backend/products`, configObj); // <--- Uses the specific Vercel URL
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      addProduct(data);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
      });
      setIsAdding(false);
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      setError(`Failed to add product: ${err.message}. Check network or backend.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addProductSection}>
      <button
        className={`${styles.toggleFormBtn} btn-secondary`}
        onClick={() => setIsAdding(!isAdding)}
        disabled={loading}
      >
        {isAdding ? 'Cancel Add Product' : 'Add New Product'}
      </button>

      {isAdding && (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>Add New Product</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}

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