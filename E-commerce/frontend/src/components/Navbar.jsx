import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

function Navbar({ cartItemCount }) {
    return (
        <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link to="/">ShopVibe</Link>
        </div>
        <ul className={styles.navLinks}>
            <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
                Home
            </NavLink>
            </li>
            <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? styles.active : '')}>
                Products
            </NavLink>
            </li>
            <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? styles.active : '')}>
                Orders
            </NavLink>
            </li>
        </ul>
        <div className={styles.navIcons}>
            <Link to="/profile">
            <i className="fas fa-user"></i> {/* Placeholder for user icon */}
            </Link>
            <Link to="/cart" className={styles.cartIcon}>
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className={styles.cartCount}>{cartItemCount}</span>}
            </Link>
        </div>
        </nav>
    );
}

export default Navbar;