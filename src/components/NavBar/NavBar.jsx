import React, { useState, useEffect, useRef, useCallback } from "react";
import "./NavBar.css";
import mylogo from "../../image/smlogo.png";

const NavBar = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const [intervalId, setIntervalId] = useState(null);
  const pRef = useRef(null);

  const startHackerEffect = useCallback(() => {
    let iteration = 0;

    clearInterval(intervalId);

    const newIntervalId = setInterval(() => {
      pRef.current.innerText = pRef.current.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return pRef.current.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= pRef.current.dataset.value.length) {
        clearInterval(newIntervalId);
      }

      iteration += 1 / 3;
    }, 30);

    setIntervalId(newIntervalId);
  }, [letters, intervalId]);

  useEffect(() => {
    // Start the hacker effect when the component mounts
    startHackerEffect();

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="navbar">
      <div className="navbarComponent">
        <div className="logo">
          <img src={mylogo} alt="logo" />
        </div>
        <div className="navLogo">
          <p ref={pRef} data-value="albums collection">
            albums collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
