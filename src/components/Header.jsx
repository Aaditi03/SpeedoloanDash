import React, { useState, useEffect } from "react";
import "../css/Common.css";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { getStorage } from "../Utils/common";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists in storage
  useEffect(() => {
    const token = getStorage("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function showNavbar() {
    let navbar = document.querySelector(".header_wrapper");
    let navList = document.querySelector(".nav_list");
    navList.classList.toggle("v-class");
    navbar.classList.toggle("h-nav");
  }

  return (
    <>
      <div className="header_wrapper h-nav">
        <nav>
          <div className="logo_wrapper ">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul className="nav_list v-class">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {/* Conditionally render Apply Now or Dashboard based on token */}
            <li>
              {isLoggedIn ? (
                <NavLink to="/apply-now" className="apply_now_button_link">
                  Dashboard
                </NavLink>
              ) : (
                <NavLink to="/apply-now" className="apply_now_button_link">
                  Apply Now
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to="/repayloan" className="apply_now_button_link repay_loan_button">
                Repay Loan
              </NavLink>
            </li>
          </ul>
          <div className="burger" onClick={showNavbar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
