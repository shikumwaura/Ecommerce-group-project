import React from 'react';
import styles from '../styles/About.module.css'; // Create this CSS module too!

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>About ShopVibe</h1>
      <p>Welcome to ShopVibe, your premier destination for high-quality products and an unparalleled shopping experience. We are dedicated to bringing you the best in [mention your niche, e.g., electronics, fashion, home goods] with a focus on customer satisfaction, unique selection, and reliable service.</p>
      <p>Our mission is to simplify your shopping journey, offering a user-friendly platform where you can discover amazing deals, explore new trends, and find exactly what you're looking for, all from the comfort of your home.</p>
      <p>Thank you for choosing ShopVibe!</p>
    </div>
  );
}

export default About;