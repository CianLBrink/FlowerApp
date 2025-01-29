"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentFlower, setCurrentFlower] = useState<string[]>(["default_flower"]); // Default flower as an array

  // Individual flower options
  const flowerOptions = [
    "default_flower",
    "roses",
    "tulips",
    "lilies",
    "white_rose",
    "pink_rose",
  ];

  // Manually define all two-flower combos
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

  // Combine all options (individual flowers + combos)
  const allOptions = [
    ...flowerOptions.map((flower) => ({
      label: flower.replace(/_/g, " "), // Replace underscores for display
      value: [flower], // Single flower as an array
    })),
    ...comboOptions, // Include predefined combos
  ];

  useEffect(() => {
    const handleFlowerBurst = () => {
      const body = document.querySelector("body")!;
      const flowers = currentFlower; // Always an array of flower types (even for combos)

      // Total flowers per burst
      const totalFlowers = 20;
      const flowersPerType = Math.floor(totalFlowers / flowers.length);

      flowers.forEach((flowerType) => {
        for (let i = 0; i < flowersPerType; i++) {
          const flower = document.createElement("div");

          // Randomize position
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;

          // Randomize size
          const size = Math.random() * 80 + 20; // Flowers range between 20px and 100px
          flower.style.width = `${size}px`;
          flower.style.height = `${size}px`;

          // Randomize rotation
          const rotation = Math.random() * 360;
          flower.style.transform = `rotate(${rotation}deg)`;

          // Position the flower
          flower.style.left = `${x}px`;
          flower.style.top = `${y}px`;

          // Add the flower class
          if (styles[flowerType]) {
            flower.classList.add(styles.flower, styles[flowerType]);
          } else {
            console.warn(`Missing style for flower: ${flowerType}`);
          }

          // Add the flower to the body
          body.appendChild(flower);

          // Remove flower after 5 seconds
          setTimeout(() => {
            flower.remove();
          }, 5000);
        }
      });
    };

    // Trigger a burst every 400ms
    const interval = setInterval(handleFlowerBurst, 400);

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, [currentFlower]);

  return (
    <div>
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Choose Your Flower</h1>
        {allOptions.map((option) => (
          <button
            key={option.label}
            className={`${styles.button} ${
              JSON.stringify(currentFlower) === JSON.stringify(option.value) ? styles.active : ""
            }`}
            onClick={() => {
              console.log("Selected flower option:", option.value); // Debugging output
              setCurrentFlower(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
