import React from "react";
// import specific_location_img from "../../images/delhi.jpg";
import { Link } from "react-router-dom";
import ChatButton from "../../components/ChatButton";

const Delhi = () => {
  return (
    <>
      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper delhi_banner">
          <div className="content_page_banner_wrapper_overlay">
            <h2>Location - New Delhi</h2>
          </div>
        </div>

        <div className="text_content_wrapper">
          <div className="text_content">
            {/* <div className="content_banner">
                <img src={specific_location_img} alt="" />
              </div> */}
            <h1 className="page_title mt30 mb20">
              Instant Personal Loan in New Delhi
            </h1>
            <p>
              SalaryOnTime offers hassle-free, paperless instant personal loans
              to help you manage financial stress easily. Utilizing modern
              technology, we ensure a swift and simple borrowing process, making
              us your reliable solution for financial emergencies.
            </p>
            <br />
            <h3 className="mb10">Features and Benefits</h3>
            <ul className="content_list">
              <li>
                <b>Fully Online Process:</b> Apply online with minimal
                documentation.
              </li>
              <li>
                <b>Quick Verification:</b> Rapid processing and eligibility
                assessment.
              </li>
              <li>
                <b>Collateral-Free Loans: </b> No security required.
              </li>
              <li>
                <b>Predictable Payments:</b> Flexible repayment options.
              </li>
              <li>
                <b>Instant Disbursal:</b> Funds transferred immediately upon
                approval.
              </li>
              <li>
                <b>All Credit Ratings Considered:</b> Low credit scores are also
                eligible.
              </li>
            </ul>
            <br />
            <h3 className="mb10">
              Instant Personal Loan in New Delhi and Delhi NCR: Eligibility
            </h3>
            <p>
              As a trusted NBFC, SalaryOnTime provides the fastest and simplest
              online instant personal loans in New Delhi and Delhi NCR. Our
              loans are approved and disbursed on the same day, offering amounts
              up to INR 1,00,000 without requiring any collateral. We provide
              dependable solutions for urgent cash loans in Delhi, addressing
              your financial needs promptly.
            </p>
            <h4>Eligibility Criteria</h4>
            <p className="mt6">
              To qualify for a cash loan in Delhi with SalaryOnTime, you must
              meet the following criteria:
            </p>
            <ul className="content_list">
              <li>Indian nationality</li>
              <li>Salaried individual - Minimum Salary : Rs 25000</li>
              <li>Age - 21 yrs to 51 yrs</li>
            </ul>
            <h4>Required Documents</h4>
            <p className="mt6">
              Submit the following documents to apply for an instant loan in
              Delhi:
            </p>
            <ul className="content_list">
              <li>Identity proof</li>
              <li>Address proof</li>
              <li>PAN card</li>
              <li>Income proof</li>
              <li>Passport-sized photographs</li>
            </ul>
            <h3>Loan Amount and Tenure</h3>
            <p className="mt6">
              SalaryOnTime offers emergency loans in Delhi ranging from INR 5000
              to INR 1,00,000 with a tenure of up to 40 days. Our short-term
              loans in Delhi provide flexibility and convenience, ensuring you
              can manage your finances effectively.
            </p>
            <h4>How to Apply for an Instant Loan in Delhi</h4>
            <p className="mt6">
              Get an instant personal loan in Delhi NCR by following these
              simple steps:
            </p>
            <ul className="content_list">
              <li>
                Visit the SalaryOnTime website at{" "}
                <Link to="/">www.salaryontime.com</Link> and register as a new
                user.
              </li>
              <li>Enter your personal, employment, and income details.</li>
              <li>
                Upload the requested documents for verification and click
                "Submit."
              </li>
              <li>Wait till our team gets back to you</li>
            </ul>
            <p>
              By applying for an emergency loan in Delhi with SalaryOnTime, you
              can resolve your immediate financial challenges swiftly. Reach out
              to us and apply for a short-term loan in Delhi whenever you need
              funds urgently.
            </p>
            <div className="button_container flex justify-center mt30">
              <Link to="/apply-now">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default Delhi;
