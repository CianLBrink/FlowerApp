"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentFlower, setCurrentFlower] = useState<string[]>(["default_flower"]);
  const [showDashboard, setShowDashboard] = useState(false);

  const flowerOptions = [
    "default_flower",
    "roses",
    "tulips",
    "lilies",
    "white_rose",
    "pink_rose",
  ];

  const comboOptions = [
    { label: "Roses + Tulips", value: ["roses", "tulips"] },
    { label: "Roses + Lilies", value: ["roses", "lilies"] },
    { label: "Roses + White Roses", value: ["roses", "white_rose"] },
    { label: "Roses + Pink Roses", value: ["roses", "pink_rose"] },
    { label: "Tulips + Lilies", value: ["tulips", "lilies"] },
    { label: "Tulips + White Roses", value: ["tulips", "white_rose"] },
    { label: "Tulips + Pink Roses", value: ["tulips", "pink_rose"] },
    { label: "Lilies + White Roses", value: ["lilies", "white_rose"] },
    { label: "Lilies + Pink Roses", value: ["lilies", "pink_rose"] },
    { label: "White Roses + Pink Roses", value: ["white_rose", "pink_rose"] },
  ];

  const allOptions = [
    ...flowerOptions.map((flower) => ({
      label: flower.replace(/_/g, " "),
      value: [flower],
    })),
    ...comboOptions,
  ];

  useEffect(() => {
    const handleFlowerBurst = () => {
      const body = document.querySelector("body")!;
      const flowers = currentFlower;
      const totalFlowers = 20;
      const flowersPerType = Math.floor(totalFlowers / flowers.length);

      flowers.forEach((flowerType) => {
        for (let i = 0; i < flowersPerType; i++) {
          const flower = document.createElement("div");

          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const size = Math.random() * 80 + 20;
          const rotation = Math.random() * 360;

          flower.style.width = `${size}px`;
          flower.style.height = `${size}px`;
          flower.style.transform = `rotate(${rotation}deg)`;
          flower.style.left = `${x}px`;
          flower.style.top = `${y}px`;

          if (styles[flowerType]) {
            flower.classList.add(styles.flower, styles[flowerType]);
          } else {
            console.warn(`Missing style for flower: ${flowerType}`);
          }

          body.appendChild(flower);
          setTimeout(() => {
            flower.remove();
          }, 5000);
        }
      });
    };

    const interval = setInterval(handleFlowerBurst, 400);
    return () => clearInterval(interval);
  }, [currentFlower]);

  return (
    <div>
      {/* "For You ❤️" Rainbow Text */}
      <h1 className={styles.rainbowText}>For You ❤️</h1>

      {/* Tap Area to Show Dashboard */}
      <div className={styles.tapArea} onClick={() => setShowDashboard(!showDashboard)}>
        🌸 Tap to Choose Flowers
      </div>

      {/* Flower Selection Dashboard */}
      {showDashboard && (
        <div className={styles.dashboard} onClick={(e) => e.stopPropagation()}>
          <h1 className={styles.title}>Choose Your Flower</h1>
          {allOptions.map((option) => (
            <button
              key={option.label}
              className={`${styles.button} ${
                JSON.stringify(currentFlower) === JSON.stringify(option.value) ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentFlower(option.value);
                setShowDashboard(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
