import React from 'react';
// import styles from '../styles/Pages.module.css';
// import orderStyles from '../styles/Orders.module.css'; // Specific styles for Orders page

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
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Your Orders</h1>
      <div className={orderStyles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={orderStyles.orderCard}>
            <h3>Order ID: {order.id}</h3>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Recipient:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}, {order.zip}</p>
            <h4>Items:</h4>
            <ul className={orderStyles.orderItems}>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.title} x {item.quantity} - ${item.price.toFixed(2)} each
                </li>
              ))}
            </ul>
            <p className={orderStyles.total}>
              <strong>Total:</strong> $
              {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;