import React, { useState } from 'react';
import styles from '../styles/AddProductForm.module.css';

function AddProductForm({ addProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '', // Assuming a direct image URL for simplicity
  });
  const [isAdding, setIsAdding] = useState(false); // To toggle form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

const newProduct = {
  ...formData,
  price: parseFloat(formData.price), // Ensure price is a number
  rating: { rate: 0, count: 0 } // Dummy rating for new products
};

const configObj = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct),
};

fetch('http://localhost:3001/products', configObj)
  .then((res) => res.json())
  .then((data) => {
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
  })
  .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div className={styles.addProductSection}>
      <button
        className={${styles.toggleFormBtn} btn-secondary}
        onClick={() => setIsAdding(!isAdding)}
      >
        {isAdding ? 'Cancel Add Product' : 'Add New Product'}
      </button>

  {isAdding && (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Add New Product</h2>
      <label htmlFor="title">Product Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
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
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <label htmlFor="image">Image URL:</label>
      <input
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn-primary">
        Submit Product
      </button>
    </form>
  )}
</div>
  );
}

export default AddProductForm;

