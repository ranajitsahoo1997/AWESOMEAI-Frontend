import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onComplete }) => {
  const message = "Welcome To Awesome AI";
  const letters = message.split("");
  const [showLetters, setShowLetters] = useState([]);
  const [finalPosition, setFinalPosition] = useState(false);

  useEffect(() => {
    // Show each letter one at a time
    letters.forEach((_, index) => {
      setTimeout(() => {
        setShowLetters((prev) => [...prev, letters[index]]);
      }, index * 100);
    });

    // After animation completes, move to final position
    const totalDuration = letters.length * 100 + 1000;
    const timeout = setTimeout(() => {
      setFinalPosition(true);
      if (onComplete) onComplete(); // Callback to move to main app
    }, totalDuration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-4xl font-bold overflow-hidden">
      <motion.div
        className="flex space-x-1"
        animate={finalPosition ? { y: -200, scale: 0.8 } : {}}
        transition={{ duration: 1 }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: showLetters.includes(letter) ? 1 : 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default SplashScreen;
