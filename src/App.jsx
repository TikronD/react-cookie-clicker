// Import functions and hooks from 'react' library
import React, { useState, useEffect } from "react";

// Define main component for 'App'
export default function App() {
  // create an object
  let obj = JSON.parse(localStorage.getItem("myObject"));

  if (obj === null) {
    obj = { cookies: 0, cps: 0, cookieStart: false };
  }
  // State variables for cookies + cookies per second (cps)
  const [cookies, setCookies] = useState(obj.cookies);
  const [cps, setCps] = useState(obj.cps);
  const [cookieStart, startCount] = useState(obj.cookieStart);

  // inbuild function renders - anything in this function happens when the screen loads
  useEffect(
    function () {
      // creates object with all relevant variables to be saved
      const myObjects = {
        // key:value pair
        cookies: cookies,
        cps: cps,
        cookieStart: cookieStart,
      };
      // saving the objects as a string into local storage
      localStorage.setItem("myObject", JSON.stringify(myObjects));
    },
    [cookies]
  );

  // Image URL for the cookie image - haven't managed from local
  const cookieImg =
    "https://static.wikia.nocookie.net/cookieclicker/images/5/55/ImperfectCookie.png";

  // useEffect hook -> cookies being generated every second based on cps
  useEffect(() => {
    if (cookieStart === true) {
      // Interval increases cookies every second based on cps
      const cookieInterval = setInterval(() => {
        setCookies((currentCookies) => currentCookies + 1);
      }, 1000 / cps);

      // Clean up the interval when cps changes
      return () => {
        clearInterval(cookieInterval);
      };
    }
  }, [cps]); // IMPORTANT: any time variable of cps is changed the useEffect runs again (e.g. if [cookie] it would run every time cookie changes)

  // onClick image incrementing cookies by 1
  function handleImageClick() {
    setCookies(cookies + 1);
    startCount(true);
  }

  // onClick button incrementing cps by 1
  function increaseCps() {
    if (cookies >= 10) {
      setCps(cps + 1);
      setCookies(cookies - 10);
    } else {
      alert("You need at least 10 cookies to buy this upgrade!");
    }
  }

  // onClick button incrementing cps by 1 and deducts 100 cookies when the button is clicked
  function increaseCps10() {
    if (cookies >= 50) {
      setCps(cps + 2);
      setCookies(cookies - 100);
    } else {
      alert("You need at least 100 cookies to buy this upgrade!");
    }
  }

  // Reset the game, setting cookies to 0 and cps to 1
  function resetGame() {
    setCookies(0);
    setCps(0);
    startCount(false);
  }

  // JSX code rendering the component
  return (
    <div>
      <div className="container">
        <div className="item top"></div>
        <div className="item top">
          <h1>Play the worlds prettiest cookie clicker</h1>
        </div>
        <div className="item top"></div>
        <div className="item main"></div>
        <div className="item main">
          {" "}
          {/* Cookie image with onClick event to handle clicks */}
          <img
            src={cookieImg}
            alt="cookie image with face"
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
          {/* Display current cookies and cookies per second */}
          <p>Cookies: {cookies}</p>
          <p>Cookies per second: {cps}</p>
          {/* Buttons to upgrade cookies per second or reset the game */}
          <button onClick={increaseCps}>Buy +1 CPM (10c)</button>
          {cookies > 100 && (
            <div className="showDisplay">
              <button onClick={increaseCps10}>Buy +2 CPM (100c)</button>
            </div>
          )}
        </div>
        <div className="item main"></div>
        <div className="item bottom"></div>
        <div className="item bottom">
          {" "}
          {/* Display a message if the player can buy an upgrade */}
          <p className={cookies >= 100 ? "" : "hidden"}>
            Woop, woop... Upgrades upgraded!!
          </p>
        </div>
        <div className="item bottom">
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
    </div>
  );
}
