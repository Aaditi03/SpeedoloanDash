import React from "react";
import "../css/Common.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import title_icon from "../images/title_shape_1.svg";
import ChatButton from "../components/ChatButton";
import { Link} from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>Contact Us</h2>
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
                Contact Us
              </span>
          </div>
        </div>
        </div>

        <div className="contact_page_details">
          <div className="contact_page_details_row">
            <div className="contact_page_details_item">
              <div className="contact_page_details_item_icon flex flex-center justify-center">
                <FaLocationDot className="contact_icon" />
              </div>
              <div className="contact_page_details_item_text ml10">
                <h3>Our Office Address</h3>
                <a
                  style={{ color: "#26b9db" }}
                  href="https://www.google.com/maps?q=G+51,+Krishna+Apra+Business+Square,+Netaji+Subhash+Place,+New+Delhi+-+110034"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  G -51, Krishna Apra Business Square,
                  <br />
                  Netaji Subhash Place,<br/>
                  New Delhi - 110034
                </a>
              </div>
            </div>
            <div className="contact_page_details_item">
              <div className="contact_page_details_item_icon flex flex-center justify-center">
                <IoMdCall className="contact_icon" />
              </div>
              <div className="contact_page_details_item_text ml10">
                <h3>Contact Us</h3>
                <a
                  style={{ color: "#26b9db" }}
                  href="tel:+919289877932"
                >
                  +91 9289877932
                </a><br/>
                <a
                  style={{ color: "#26b9db" }}
                  href="tel:+918800002890"
                >
                  +91 8800002890
                </a><br/>
                <a
                  style={{ color: "#26b9db" }}
                  href="mailto:info@salaryontime.com"
                >
                  info@salaryontime.com <br />
                </a>
              </div>
            </div>
            <div className="contact_page_details_item">
              <div className="contact_page_details_item_icon flex flex-center justify-center">
                <MdPerson className="contact_icon" />
              </div>
              <div className="contact_page_details_item_text ml10">
                <h3>Collection Officer</h3>
                <a
                  style={{ color: "#26b9db" }}
                  href="tel:+919289877932"
                >
                  +91 9289877841
                </a><br/>
                <a
                  style={{ color: "#26b9db" }}
                  href="mailto:info@salaryontime.com"
                >
                  shashi@salaryontime.com <br />
                </a>
              </div>
            </div>
          </div>

          <div className="contact_form_container">
            <div className="title_section">
              <p className="sub_title flex flex-center">
                <img src={title_icon} alt="" className="mr10" />
                <span>Connect with us</span>
              </p>
              <h2 className="mt20">
                Have Any <span>Questions?</span>
              </h2>
            </div>
            <p className="mt20">
              Have any query or want to enquire about the services we provide?{" "}
              <br />
              Fill out the contact form below and our team will get back to you
              as soon as possible.
            </p>

            <div className="contact_form mt20">
              <div className="row">
                <div className="input_item">
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="input_item">
                  <input type="text" placeholder="Your Email" />
                </div>
              </div>
              <div className="row mt50">
                <div className="input_item">
                  <input type="text" placeholder="Enter Subject" />
                </div>
                <div className="input_item">
                  <input type="text" placeholder="Phone Number" />
                </div>
              </div>
              <div className="row mt50">
                <textarea rows="8" placeholder="Your Message"></textarea>
              </div>
              <div className="btn_container mt40">
                <button>Submit</button>
              </div>
            </div>
          </div>
          <div className="google_map_container full-width">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.9464319503822!2d77.14668417495896!3d28.691248981412773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d023357af3355%3A0x1243565ed8daae43!2sKrishna%20Apra%20Business%20Square%2C%20909-910%2C%20Netaji%20Subhash%20Place%2C%20Pitampura%2C%20Delhi%2C%20110034!5e0!3m2!1sen!2sin!4v1721620023240!5m2!1sen!2sin"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default Contact;
