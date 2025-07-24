import React from 'react';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
// import styles from '../styles/Pages.module.css'; // General page styles

function ProductPage({ products, addProduct, addToCart }) {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Featured Products</h1>
      <p className={styles.pageDescription}>
        Discover our handpicked selection of the best products across all categories
      </p>

  <AddProductForm addProduct={addProduct} />

  {/* Search and Filter UI from screenshot */}
  <div className={styles.filterSection}>
    <input type="text" placeholder="Search products..." className={styles.searchInput} />
    <select className={styles.filterSelect}>
      <option>All Categories</option>
    </select>
    <select className={styles.filterSelect}>
      <option>Default</option>
    </select>
    <div className={styles.displayToggle}>
      <button className={styles.gridBtn}><i className="fas fa-th-large"></i></button>
      <button className={styles.listBtn}><i className="fas fa-list"></i></button>
    </div>
  </div>

  <ProductList products={products} addToCart={addToCart} />
</div>
  );
}
export default ProductPage;