import React from "react";
import { Link } from "react-router-dom";
import  service_five from "../images/commitment.jpg";
import ChatButton from "../components/ChatButton";

const MinimalCommitment = () => {
  return (
    <>
      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="service_page_banner_wrapper_overlay">
            <h2>Minimal Commitment</h2>
          </div>

          <div className="text_content_wrapper">
            <div className="text_content">
              <div className="content_banner">
                <img src={service_five} alt="" />
              </div>
              <h1 className="page_title mt30 mb20">
                Short and Minimal Commitments
              </h1>
              <p>
                At SalaryOnTime, we understand that financial commitments can be
                daunting, which is why we offer loan services with minimal
                commitment requirements. Our flexible loan options are designed
                to accommodate your specific needs without locking you into
                long-term obligations. This approach allows you to borrow
                responsibly, with the ability to adjust your repayment plan as
                your circumstances change. By reducing the pressure of rigid
                commitments, we help you manage your finances more effectively
                and confidently.
              </p>
              <br />
              <p>
                Moreover, our minimal commitment loan services come with clear,
                straightforward terms, ensuring you know exactly what to expect.
                We prioritize transparency and customer empowerment, providing
                you with all the necessary information to make informed
                decisions about your borrowing needs. Our dedicated team is
                always available to offer support and answer any questions,
                making the entire loan process smooth and stress-free. With
                SalaryOnTime, you can enjoy the benefits of financial
                flexibility and minimal commitment, giving you greater control
                over your financial future
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

export default MinimalCommitment;
