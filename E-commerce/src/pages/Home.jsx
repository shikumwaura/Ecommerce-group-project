import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css'; // New styles for Home page

function Home() {
    return (
        <div className={styles.homeContainer}>
        {/* Section 1: Discover Amazing Products */}
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
            <span className={styles.newCollection}>⭐ New Collection Available</span>
            <h1>Discover Amazing Products</h1>
            <p>
                Shop the latest trends and find everything you need in one place. Quality products,
                unbeatable prices, and exceptional service.
            </p>
            <div className={styles.heroButtons}>
                <Link to="/products" className={`${styles.shopNowBtn} btn-primary`}>
                <i className="fas fa-shopping-bag"></i> Shop Now
                </Link>
                <Link to="/about" className={`${styles.learnMoreBtn} btn-primary`}>
                Learn More
                </Link>
            </div>
            </div>
        </section>

        {/* Section 2: Features */}
        <section className={styles.featuresSection}>
            <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
                <i className="fas fa-truck"></i>
            </div>
            <h3>Free Shipping</h3>
            <p>Free shipping on orders over $50</p>
            </div>
            <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
                <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure Payment</h3>
            <p>100% secure payment processing</p>
            </div>
            <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
                <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Round the clock customer support</p>
            </div>
            <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
                <i className="fas fa-star"></i>
            </div>
            <h3>Quality Products</h3>
            <p>Only the best quality products</p>
            </div>
        </section>

        {/* Section 3: Ready to Start Shopping */}
        <section className={styles.ctaSection}>
            <h2>Ready to Start Shopping?</h2>
            <p>Join thousands of satisfied customers and discover why ShopVibe is the best place to shop online.</p>
            <Link to="/products" className={`${styles.browseAllBtn} btn-primary`}>
            Browse All Products
            </Link>
        </section>
        </div>
    );
}

export default Home;