	
import React, { useState } from 'react';
import styles from '../styles/OrderForm.module.css';

function OrderForm({ placeOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.zip) {
      alert('Please fill in all order details.');
      return;
    }
    placeOrder(formData); // This triggers the POST request in App.jsx
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
    }); // Clear form
  };

  return (
    <div className={styles.orderFormContainer}>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

    <label htmlFor="address">Address:</label>
    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

    <div className={styles.cityZip}>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="zip">ZIP Code:</label>
        <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
      </div>
    </div>

    <button type="submit" className={`${styles.placeOrderBtn} btn-primary`}>
      Place Order
    </button>
  </form>
</div>
  );
}

export default OrderForm;