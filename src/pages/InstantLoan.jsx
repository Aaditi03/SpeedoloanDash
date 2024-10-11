import React from "react";
import "../css/ContentPage.css";
import instant_loan from "../images/instanloan.png";
import { Link } from "react-router-dom";
import ChatButton from "../components/ChatButton";


const InstantLoan = () => {
  return (
    <>
      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="service_page_banner_wrapper_overlay">
            <h2>Instant Loans</h2>
          </div>

          <div className="text_content_wrapper">
            <div className="text_content">
              <div className="content_banner">
                <img src={instant_loan} alt="" />
              </div>
              <h1 className="page_title mt30 mb20">Instant Loan</h1>
              <p>
                At SalaryOnTime, we understand that urgent financial needs can arise
                unexpectedly, requiring immediate solutions. That's why we offer
                a range of small instant loans designed to provide you with
                quick access to funds when you need them the most. Whether
                you're facing an emergency expense or simply need extra cash,
                our instant loan options are here to help.
              </p>
              <br />
              <p>
                Our services include instant loans without CIBIL checks,
                ensuring that your credit history doesn't stand in the way of
                getting the funds you need. We specialize in providing instant
                money loans that can be accessed quickly and conveniently
                through our online platform. With our instant personal loans online,
                you can complete the application process in minutes and receive
                the funds in your account without unnecessary delays.
              </p>

              <br />
              <p>
                For those in need of immediate financial assistance, our quick
                instant loans are the perfect solution. We pride ourselves on
                offering quick loans online with same-day approval, so you can
                handle any urgent financial situation with ease. Our instant
                loan services are designed to be efficient and user-friendly,
                ensuring that you can secure the funds you need without hassle.
              </p>
              <br />
              <p>
              At SalaryOnTime, we are committed to providing instant loan urgent solutions that cater to your specific needs. Whether you're dealing with an unexpected expense or need extra cash quickly, our instant loan options offer the flexibility and speed you require. Trust SalaryOnTime for reliable and fast financial support, and experience the convenience of our small instant loans and instant personal loans online today.
              </p>
              <br />
              <div className="button_container flex justify-center">
                <Link to="/apply-now">Apply Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default InstantLoan;
