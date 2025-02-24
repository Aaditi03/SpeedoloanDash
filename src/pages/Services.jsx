import React from "react";
import "../css/Common.css";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { VscCombine } from "react-icons/vsc";
import { FaRupeeSign } from "react-icons/fa";
import { FaCodeCommit } from "react-icons/fa6";
import { TbAdjustmentsCog } from "react-icons/tb";
import { Link } from "react-router-dom";
import ChatButton from "../components/ChatButton";


const Services = () => {
  return (
    <>

      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>Our Services</h2>
            <div style={{ marginTop: "10px" }}>
            <Link 
              to="/" 
              style={{ 
                color: "#26b9db", 
                fontWeight: "600", 
                marginTop: "10px", 
                textDecoration: "none"
              }}
            >
              Home
            </Link>
            <span style={{ color: "white", fontSize: "16px", margin: "0 10px" }}>→</span>
              <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                Services
              </span>
          </div>
        </div>
        </div>

        {/* <div className="services_page_section">
          <div className="services_row">
            <Link to="/instantloan">
              <div className="services_card">
                <div className="service_card_number">01</div>
                <div className="shape_icon">
                  <GiPayMoney className="service_icon" />
                  <span className="dots"></span>
                </div>
                <h3 className="box_title">Instant Loan</h3>
                <p className="service_card_text">
                  We offer instant loans to help you tackle unexpected financial
                  needs swiftly and efficiently. Our streamlined application
                  process ensures that you get the funds you need without delay.
                </p>
                <div className="bg_shape">
                  <img src={bg_shape} alt="" />
                </div>
              </div>
            </Link>
            <Link to="/shortloan">
              <div className="services_card">
                <div className="service_card_number">02</div>
                <div className="shape_icon">
                  <GiTakeMyMoney className="service_icon" />
                  <span className="dots"></span>
                </div>
                <h3 className="box_title">Short Loan</h3>
                <p className="service_card_text">
                  Discover the convenience of short loans at Speedoloan,
                  designed to meet your immediate financial needs with ease. Our
                  quick approval process ensures that you can access the funds
                  you need.
                </p>
                <div className="bg_shape">
                  <img src={bg_shape} alt="" />
                </div>
              </div>
            </Link>
            <Link to="/services">
              <div className="services_card">
                <div className="service_card_number">03</div>
                <div className="shape_icon">
                  <VscCombine className="service_icon" />
                  <span className="dots"></span>
                </div>
                <h3 className="box_title">Debt Consolidation</h3>
                <p className="service_card_text">
                  Take control of your finances with our debt consolidation
                  services. Consolidate multiple debts into one manageable
                  payment and simplify your financial journey. Make your
                  finances hassle free.
                </p>
                <div className="bg_shape">
                  <img src={bg_shape} alt="" />
                </div>
              </div>
            </Link>
          </div>
          <div className="services_row">
            <Link to="/services">
              <div className="services_card">
                <div className="service_card_number">04</div>
                <div className="shape_icon">
                  <TbAdjustmentsCog className="service_icon" />
                  <span className="dots"></span>
                </div>
                <h3 className="box_title">Flexibility</h3>
                <p className="service_card_text">
                  Short-term loans often come with more flexible eligibility
                  criteria and faster approval processes compared.
                </p>
                <div className="bg_shape">
                  <img src={bg_shape} alt="" />
                </div>
              </div>
            </Link>
            <Link to="/services">
              <div className="services_card">
                <div className="service_card_number">05</div>
                <div className="shape_icon">
                  <FaCodeCommit className="service_icon" />
                  <span className="dots"></span>
                </div>
                <h3 className="box_title">Minimal Commitment</h3>
                <p className="service_card_text">
                  Short-term loans typically have shorter repayment periods,
                  ranging from a few weeks to a few months.
                </p>
                <div className="bg_shape">
                  <img src={bg_shape} alt="" />
                </div>
              </div>
            </Link>
            <Link to="/services">
              <div className="services_card">
                <div className="service_card_number">06</div>
                <div className="shape_icon">
                  <FaRupeeSign className="service_icon" />
                  <span className="dots"></span>
                </div>
                <h3 className="box_title">Cost Effective</h3>
                <p className="service_card_text">
                  While short-term loans may have higher interest rates compared
                  to long-term loans, the total cost of borrowing.
                </p>
                <div className="bg_shape">
                  <img src={bg_shape} alt="" />
                </div>
              </div>
            </Link>
          </div>
        </div> */}

        <div className="services_page_section"  data-aos="zoom-in">
          <div className="services_row">
            <Link to="/instant-loan">
              <div className="services_item">
                <div className="services_icon_container">
                  <GiPayMoney className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Instant Loan</h4>
                  </div>
                  <p>
                    We offer instant loans to help you tackle unexpected
                    financial needs swiftly and efficiently. 
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/short-term-loan">
              <div className="services_item">
                <div className="services_icon_container">
                  <GiTakeMyMoney className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Short Loan</h4>
                  </div>
                  <p>
                    Discover the convenience of short loans at Speedoloan,
                    designed to meet your immediate financial needs with ease.
                  
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/debt-consolidation-loan">
              <div className="services_item">
                <div className="services_icon_container">
                  <VscCombine className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Debt Consolidation</h4>
                  </div>
                  <p>
                    Take control of your finances with our debt consolidation
                    services. Consolidate multiple debts into one manageable
                    payment 
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="services_row">
            <Link to="/flexibility">
              <div className="services_item">
                <div className="services_icon_container">
                  <TbAdjustmentsCog className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Flexibility</h4>
                  </div>
                  <p>
                    Short-term loans often come with more flexible eligibility
                    criteria and faster approval processes compared.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/minimalcommitment">
              <div className="services_item">
                <div className="services_icon_container">
                  <FaCodeCommit className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Minimal Commitment</h4>
                  </div>
                  <p>
                  Short-term loans typically have shorter repayment periods,
                  ranging from a few weeks to a few months.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/costeffective">
              <div className="services_item">
                <div className="services_icon_container">
                  <FaRupeeSign className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Cost Effective</h4>
                  </div>
                  <p>
                  While short-term loans may have higher interest rates compared
                  to long-term loans, the total cost of borrowing.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ChatButton/>
    </>
  );
};

export default Services;
