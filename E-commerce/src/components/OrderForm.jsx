	
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


}

export default OrderForm;