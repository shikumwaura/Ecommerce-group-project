import React from 'react';
import styles from '../styles/ProductCard.module.css';

function ProductCard({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <div className={styles.productRating}>
          {/* Simple star rating, can be enhanced */}
          <span>⭐ {product.rating ? product.rating.rate : 'N/A'}</span>
          <span>({product.rating ? product.rating.count : 0} reviews)</span>
        </div>
        <button onClick={handleAddToCart} className={`${styles.addToCartBtn} btn-primary`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;