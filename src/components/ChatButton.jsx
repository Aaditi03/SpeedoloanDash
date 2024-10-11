import React from "react";
import "../css/Common.css";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const ChatButton = () => {
  return (
    <>
      <div className="chat_icon_link">
        <Link to="https://wa.me/+919289877932" title="Chat on WhatsApp">
          <div className="chat_icon_container">
            <FaWhatsapp className="chat_icon" />
          </div>
        </Link>
        <Link to="tel:9289877932" title="Call us">
          <div className="chat_icon_container mt15">
            <IoCall className="call_icon" />
          </div>
        </Link>
        {/* <Link to="https://www.facebook.com/salaryontime/" target="_blank" rel="noopener noreferrer" title="Visit us on Facebook">
          <div className="chat_icon_container mt15">
            <FaFacebook className="chat_icon" />
          </div>
        </Link>
        <Link to="https://www.instagram.com/salaryontime/" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
          <div className="chat_icon_container mt15">
            <FaInstagram className="chat_icon" />
          </div>
        </Link> */}
      </div>
    </>
  );
};

export default ChatButton;
