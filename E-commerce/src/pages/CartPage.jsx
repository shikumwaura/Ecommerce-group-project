import React from 'react';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import styles from '../styles/Pages.module.css';

function CartPage({ cartItems, updateCartQuantity, removeCartItem, placeOrder }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return ;
}

export default CartPage;