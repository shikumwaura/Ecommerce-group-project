import React from 'react';
import styles from '../styles/Cart.module.css';

function Cart({ cartItems, updateCartQuantity, removeCartItem }) {
  return (
    <div className={styles.cartContainer}>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <img src={item.image} alt={item.title} className={styles.itemImage} />
          <div className={styles.itemDetails}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            <div className={styles.quantityControl}>
              <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={() => removeCartItem(item.id)} className={styles.removeButton}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;