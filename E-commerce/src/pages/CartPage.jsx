import React from 'react';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import styles from '../styles/Pages.module.css';

function CartPage({ cartItems, updateCartQuantity, removeCartItem, placeOrder }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

  {cartItems.length === 0 ? (
    <p className={styles.emptyCartMessage}>Your cart is empty. Start shopping!</p>
  ) : (
    <>
      <Cart
        cartItems={cartItems}
        updateCartQuantity={updateCartQuantity}
        removeCartItem={removeCartItem}
      />
      <div className={styles.cartSummary}>
        <h2>Order Summary</h2>
        <p>Total: ${calculateTotal().toFixed(2)}</p>
      </div>
      <OrderForm placeOrder={placeOrder} />
    </>
  )}
</div>
  );
}

export default CartPage;