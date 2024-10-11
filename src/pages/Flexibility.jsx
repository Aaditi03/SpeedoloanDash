import React from "react";
import "../css/ContentPage.css";
import service_three from "../images/flexi_loan.jpg";
import { Link } from "react-router-dom";
import ChatButton from "../components/ChatButton";

const ShortLoan = () => {
  return (
    <>
      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="service_page_banner_wrapper_overlay">
            <h2>Flexibility</h2>
          </div>

          <div className="text_content_wrapper">
            <div className="text_content">
              <div className="content_banner">
                <img src={service_three} alt="" />
              </div>
              <h1 className="page_title mt30 mb20">Flexibility in Loans</h1>
              <p>
                At SalaryOnTime, we focus on meeting your financial needs by
                offering loan services with remarkable flexibility. Recognizing
                that every customer has unique circumstances, we provide
                personalized loan terms and repayment options to give you
                control over your finances. Whether it's modifying the loan
                duration, selecting from various interest rate plans, or using
                our convenient online application and management tools, our aim
                is to make the borrowing process straightforward and
                hassle-free. With our dedicated support team always available to
                assist, SalaryOnTime ensures a loan experience that adapts to
                your specific needs.
              </p>
              <br />
              <p>
                In addition to our flexible loan services, SalaryOnTime stands
                out by offering competitive interest rates and transparent
                terms, ensuring you understand every aspect of your loan
                agreement. Our streamlined application process is designed to
                save you time, with quick approvals and minimal paperwork,
                allowing you to access funds when you need them most. We also
                provide personalized financial advice to help you make informed
                decisions and manage your loan effectively. At SalaryOnTime, we
                are dedicated to fostering a trustworthy and supportive
                relationship with our clients, helping you achieve your
                financial goals with confidence and ease.
              </p>
              <br/>
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

export default ShortLoan;
