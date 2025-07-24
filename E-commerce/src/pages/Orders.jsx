import React from 'react';
import styles from '../styles/Pages.module.css';
import orderStyles from '../styles/Orders.module.css'; // Specific styles for Orders page

function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Your Orders</h1>
        <p className={styles.emptyCartMessage}>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
 
  );
}

export default Orders;