import React from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';

function ProductList({ products, addToCart }) {
  if (products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <p>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={styles.productListGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductList;