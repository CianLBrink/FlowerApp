import React from "react";
import styles from "../app/page.module.css"; // Make sure this path matches your setup

interface FlowerProps {
  type?: string; // Optional, currently unused
  animationStyle?: string; // Optional animation style
}

const Flower: React.FC<FlowerProps> = () => {
  return (
    <div className={styles.flower}>
      <div className={styles.petals}>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
        <div className={styles.petal}></div>
      </div>
      <div className={styles.center}></div>
    </div>
  );
};

export default Flower;
