import React, { useState, useEffect } from "react";
import "../css/Common.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { getStorage } from "../Utils/common";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eligibility, setEligibility] = useState(null); // To store eligibility status
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = getStorage("token");
    const eligibilityStatus = getStorage("eligibility");

    if (token) {
      setIsLoggedIn(true);
    }

    if (eligibilityStatus) {
      setEligibility(eligibilityStatus);
    }
  }, []);

  function showNavbar(e) {
    let navbar = document.querySelector(".header_wrapper");
    let navList = document.querySelector(".nav_list");
    navList.classList.toggle("v-class");
    navbar.classList.toggle("h-nav");
    if (navbar.classList.contains("h-nav")) {
      navbar.style.zIndex = "1";
    } else {
      navbar.style.zIndex = "2";
    }
  }

  // Handle the "Dashboard" click event to navigate based on eligibility
  const handleDashboardClick = () => {
    if (eligibility === 1) {
      navigate("/my-dashboard/eligibility"); // Navigate to eligibility page if eligible
    } else {
      navigate("/my-dashboard"); // Navigate to the regular dashboard if not eligible
    }
  };

  return (
    <>
      <div className="header_wrapper h-nav">
        <nav>
          <div className="logo_wrapper">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul className="nav_list v-class">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About</NavLink>
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
                <button
                  className="apply_now_button_link"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
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
