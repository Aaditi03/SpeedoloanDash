import React, { useState } from "react";
import "../css/Common.css";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const Footer = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  return (
    <>
      <div className="footer_wrapper full-width">
        <div className="footer_row">
          <div className="footer_tab">
            <h2 className="tab_title">Quick Links</h2>
            <li>
              <Link to="/">
                <FaChevronRight className="footer_icon" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/apply-now">
                <FaChevronRight className="footer_icon" />
                Apply for Loan
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FaChevronRight className="footer_icon" />
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services">
                <FaChevronRight className="footer_icon" />
                Services
              </Link>
            </li>
          </div>
          <div className="footer_tab">
            <h2 className="tab_title">Legal</h2>
            <li>
              <Link to="/faq">
                <FaChevronRight className="footer_icon" />
                Faq's
              </Link>
            </li>
            <li>
              <Link to="/rateandterms">
                <FaChevronRight className="footer_icon" />
                Rate and Terms
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy">
                <FaChevronRight className="footer_icon" />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/termsandconditions">
                <FaChevronRight className="footer_icon" />
                Terms and Conditions
              </Link>
            </li>
          </div>
          <div className="footer_tab">
            <h2 className="tab_title">Contact Us</h2>
            <a className="call_info" style={{ marginTop: "0px",color:"white" }} href="mailto: info@speedoloan.com">
              Email: info@speedoloan.com
            </a><br/>
            <a style={{color:"white"}} href="tel:+919289877932" className="call_info">Phone: +91-8800002890</a><br/>
            <p style={{color:"white"}} className="call_info">
              Address: G-51, Krishna Apra Business Square <br />
              Netaji Subash Place, New Delhi - 110034
            </p>
          </div>
        </div>
        <div className="footer_dropdown_container">
          <div className="footer_dropdown">
            <div className="dropdown_item_title">
              <p
                className={
                  dropdown1
                    ? "dropdown_title flex flex-center dropdown_active"
                    : "dropdown_title flex flex-center"
                }
                onClick={(e) => setDropdown1((prev) => !prev)}
              >
                Loans for Lifestyle{" "}
                {dropdown1 ? (
                  <FaAngleUp className="dropdown_icon" />
                ) : (
                  <FaAngleDown className="dropdown_icon" />
                )}
              </p>
              <div
                className={
                  dropdown1 ? "block submenu dropdown_active md_none" : "hidden"
                }
              >
                <ul className="submenu_list">
                  <li>
                    <Link to="/flexibility">Flexible Personal Loan</Link>
                  </li>
                  <li>
                    <Link to="/short-term-loan">Short Term Loan</Link>
                  </li>
                  <li>
                    <Link to="/instant-loan">Instant Loan</Link>
                  </li>
                  <li>
                    <Link to="/debt-consolidation-loan">Debt Consolidation</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown_item_title">
              <p
                className={
                  dropdown2
                    ? "dropdown_title flex flex-center dropdown_active"
                    : "dropdown_title flex flex-center"
                }
                onClick={(e) => setDropdown2((prev) => !prev)}
              >
                Loans in your City
                {dropdown2 ? (
                  <FaAngleUp className="dropdown_icon" />
                ) : (
                  <FaAngleDown className="dropdown_icon" />
                )}
              </p>

              <div
                className={
                  dropdown2 ? "flex submenu dropdown_active md_none" : "hidden"
                }
              >
                <ul className="submenu_list">
                <li>
                  <Link to="/instant-personal-loan-in-ahmedabad"> Ahmedabad</Link>
                </li>
                <li>
                  <Link to="/instant-personal-loan-online-in-hyderabad"> Hyderabad</Link>
                </li>
                <li>
                  <Link to="/loan-agency-in-mumbai">Mumbai</Link>
                </li>
                <li>
                  <Link to="/advance-loans-Online-in-Bangalore">Bangalore</Link>
                </li>
                <li>
                  <Link to="/Instant-Personal-Loan-for-Salaried-in-Delhi">New Delhi</Link>
                </li>
                <li>
                  <Link to="/personal-loan-in-Gurgaon">Gurgaon</Link>
                </li>
                <li>
                  <Link to="/Personal-loan-in-Noida">Noida</Link>
                </li>
                <li>
                  <Link to="/personal-loan-in-faridabad">Faridabad</Link>
                </li>
                <li>
                  <Link to="/instant-personal-loan-in-greater-noida">Greater Noida</Link>
                </li>
                <li>
                  <Link to="/Instant-Personal-Loan-in-Ghaziabad">Ghaziabad</Link>
                </li>
              </ul>
              </div>
            </div>
            <div className="dropdown_item_title">
              <p
                className={
                  dropdown3
                    ? "dropdown_title flex flex-center dropdown_active"
                    : "dropdown_title flex flex-center"
                }
                onClick={(e) => setDropdown3((prev) => !prev)}
              >
                Loans by Ticket Size
                {dropdown3 ? (
                  <FaAngleUp className="dropdown_icon" />
                ) : (
                  <FaAngleDown className="dropdown_icon" />
                )}
              </p>

              <div
              className={dropdown3 ? "flex submenu dropdown_active md_none" : "hidden"}
            >
              <ul className="submenu_list">
                <li>
                  <Link>5k - 1Lakh</Link>
                </li>
              </ul>
            </div>
            </div>
          </div>
          <div className="x_sm_none">
            <div
              className={dropdown1 ? "block submenu dropdown_active" : "hidden"}
            >
              <ul className="submenu_list">
                <li>
                  <Link to="/flexibility">Flexible Personal Loan</Link>
                </li>
                <li>
                  <Link to="/short-term-loan">Short Term Loan</Link>
                </li>
                <li>
                  <Link to="/instant-loan">Instant Loan</Link>
                </li>
                <li>
                  <Link to="/debt-consolidation-loan">Debt Consolidation</Link>
                </li>
              </ul>
            </div>
            <div
              className={dropdown2 ? "flex submenu dropdown_active" : "hidden"}
            >
              <ul className="submenu_list">
                <li>
                  <Link to="/instant-personal-loan-in-ahmedabad"> Ahmedabad</Link>
                </li>
                <li>
                  <Link to="/instant-personal-loan-online-in-hyderabad"> Hyderabad</Link>
                </li>
                <li>
                  <Link to="/loan-agency-in-mumbai">Mumbai</Link>
                </li>
                <li>
                  <Link to="/advance-loans-Online-in-Bangalore">Bangalore</Link>
                </li>
                <li>
                  <Link to="/Instant-Personal-Loan-for-Salaried-in-Delhi">New Delhi</Link>
                </li>
                <li>
                  <Link to="/personal-loan-in-Gurgaon">Gurgaon</Link>
                </li>
                <li>
                  <Link to="/Personal-loan-in-Noida">Noida</Link>
                </li>
                <li>
                  <Link to="/personal-loan-in-faridabad">Faridabad</Link>
                </li>
                <li>
                  <Link to="/instant-personal-loan-in-greater-noida">Greater Noida</Link>
                </li>
                <li>
                  <Link to="/Instant-Personal-Loan-in-Ghaziabad">Ghaziabad</Link>
                </li>
              </ul>
            </div>
            <div
              className={dropdown3 ? "flex submenu dropdown_active" : "hidden"}
            >
              <ul className="submenu_list">
                <li>
                  <Link>5k - 1Lakh</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright_section mt30">
          <p>
            Copyright RBI Registered NBFC Kasar Credit & Capital Private Limited
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
