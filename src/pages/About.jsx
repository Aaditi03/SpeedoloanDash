import React from "react";
import "../css/Common.css";
import about_us_img_1 from "../images/about_1.png";
import title_icon from "../images/title_shape_1.svg";
import img1 from "../images/about_feature_1_1.svg";
import img2 from "../images/about_feature_1_2.svg";
import img3 from "../images/about_2.png";
import Number_Statistics from "../components/Number_Statistics";
import { FaCheck } from "react-icons/fa";
import ChatButton from "../components/ChatButton";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>About Us</h2>
            <div style={{ marginTop: "10px" }}>
              <Link 
                to="/" 
                style={{ 
                  color: "#26b9db", 
                  fontWeight: "600", 
                  fontSize: "14px", 
                  textDecoration: "none" 
                }}
              >
                Home
              </Link>
              <span style={{ color: "white", fontSize: "16px", margin: "0 10px" }}>→</span>
              <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                About Us
              </span>
            </div>
          </div>
        </div>

        <div className="company_info_section">
          <div className="company_info_wrapper">
            <div className="title_section">
              <h2 className="full-width text-center">SalaryOnTime</h2>
            </div>
            <p className="text-center  company_info_content">
              SalaryOnTime empowers millennials to achieve their desired
              lifestyle through innovative loan solutions. <br />
              We stand out in the crowded personal loan market by offering the
              fastest loans with customer-friendly terms. <br /> As an
              RBI-registered NBFC, we take pride in delighting our customers
              with the best loan products available. <br />
              Our experienced leadership and highly skilled team have
              established us as one of the fastest-growing and most trusted
              fintech companies in the industry.
            </p>
            <div className="button_container">
               <button >
                   Meet Our Leaders
               </button>
               <button>
                Join Our Team
               </button>
            </div>
          </div>
        </div>
        <div className="about_us_section_1" data-aos="fade-down">
          <div className="about_us_section_1_left">
            <img src={about_us_img_1} alt="" />
          </div>
          <div className="about_us_section_1_right">
            <div className="title_section">
              <p className="sub_title flex flex-center">
                <img src={title_icon} alt="" className="mr10" />
                <span>About us</span>
              </p>
              <h2 className="mt20">
                Discover SalaryOnTime: Your Partner in{" "}
                <span>Financial Growth</span>
              </h2>
            </div>
            <p className="mt30">
              At SalaryOnTime, we redefine financial empowerment through
              personalized solutions designed to meet your unique needs. With a
              commitment to excellence and innovation, we guide individuals and
              businesses towards their financial goals with expertise and
              integrity. Backed by a team of seasoned professionals,
              SalaryOnTime ensures transparency and reliability in every
              interaction, fostering lasting relationships built on trust.
              Whether you're seeking loans or strategic financial advice,
              SalaryOnTime is dedicated to securing your financial future and
              driving success in an ever-evolving market landscape.
            </p>

            <div className="about_features_section">
              <div className="about_features_item flex flex-center">
                <div>
                  <img src={img1} alt="" />
                </div>
                <div className="ml10">
                  <h3>Certified Company</h3>
                  <p style={{ minWidth: "fit-content" }}>
                    All products certified by RBI
                  </p>
                </div>
              </div>
              <div className="about_features_item flex flex-center">
                <div>
                  <img src={img2} alt="" />
                </div>
                <div className="ml10" style={{ minWidth: "fit-content" }}>
                  <h3>Experienced Team</h3>
                  <p>Certified Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Number_Statistics />
        <div className="about_us_section_1 pt90">
          <div className="about_us_section_1_right">
            <div className="title_section">
              <p className="sub_title flex flex-center">
                <img src={title_icon} alt="" className="mr10" />
                <span>Why Choose Us</span>
              </p>
              <h2 className="mt20">
                We Deal With the Aspects of
                <br />
                <span>Financial Solutions</span>
              </h2>
            </div>
            <p className="mt30">
              Flexible and realible financial solutions for your emergency
              needs. With SalaryOnTime, your financial future is in secure
              hands.
            </p>

            <div className="about_features_section_2">
              <div className="flex flex-center space-between mt20 full-width">
                <div className="about_features_item flex flex-center">
                  <FaCheck className="check_icon mr10" />
                  <h3>Emergency Loans</h3>
                </div>
                <div className="about_features_item flex flex-center">
                  <FaCheck className="check_icon mr10" />
                  <h3>High Quality Security</h3>
                </div>
              </div>
              <div className="flex flex-center space-between mt20 full-width">
                <div className="about_features_item flex flex-center">
                  <FaCheck className="check_icon mr10" />
                  <h3>Online Loans</h3>
                </div>
                <div className="about_features_item flex flex-center">
                  <FaCheck className="check_icon mr10" />
                  <h3>Instant Loans</h3>
                </div>
              </div>
              <div className="flex flex-center space-between mt20 full-width">
                <div className="about_features_item flex flex-center">
                  <FaCheck className="check_icon mr10" />
                  <h3>24/7 Support</h3>
                </div>
                <div className="about_features_item flex flex-center">
                  <FaCheck className="check_icon mr10" />
                  <h3>Short Term Loans</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="about_us_section_1_2_left">
            <div className="img1">
              <img src={img3} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default About;
