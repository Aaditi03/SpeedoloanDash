import React from "react";
import "../css/ContentPage.css";
import ChatButton from "../components/ChatButton";
import { Link} from "react-router-dom";

const TermsandConditions = () => {
  return (
    <>

      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="content_page_banner_wrapper_overlay">
            <h2>Terms and Conditions</h2>
            <div style={{ marginTop: "10px" }}>
            <Link 
              to="/" 
              style={{ 
                color: "#26b9db", 
                fontWeight: "600", 
                marginTop: "10px", 
                textDecoration:"none" 
              }}
            >
              Home
            </Link>
            <span style={{ color: "white", fontSize: "16px", margin: "0 10px" }}>→</span>
              <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                T&C
              </span>
          </div>
        </div>
        </div>

        <div className="text_content_wrapper">
          <div className="text_content" style={{ width: "95%" }}>
            <h1 className="page_title mt30 mb50">Terms and Conditions</h1>
            <div className="flex flex-center content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <p>
                  Welcome to the Speedoloan website, operated by Kasar Credit
                  and Capital Pvt Ltd ("we", "us", "our"). By accessing or using
                  our website ("Site") and services ("Services"), you agree to
                  be bound by the following terms and conditions ("Terms").
                  Please read them carefully.
                </p>
                <ul>
                  <li className="tc_li">
                    <b>Acceptance of Terms:</b> By accessing or using the Site
                    and Services, you agree to comply with these Terms. If you
                    do not agree with any part of these Terms, you may not use
                    the Site and Services.
                  </li>
                  <li className="tc_li">
                    <b>Eligibility:</b> You must be at least 18 years old and a
                    resident of India to use the Site and Services.You must have
                    a valid bank account in India.
                  </li>
                  <li className="tc_li">
                    <b>Loan Application:</b> You may apply for loans ranging
                    from ₹5,000 to ₹1,00,000 through the Site. The repayment
                    period for the loan can be up to 40 days. The monthly
                    interest rate for loans is up to 30%. All applications are
                    subject to approval based on our assessment criteria.
                  </li>
                  <li className="tc_li">
                    <b>Loan Approval and Disbursement:</b> Once your loan
                    application is approved, the loan amount will be credited to
                    your designated bank account. Approval and disbursement
                    times may vary based on the completeness and accuracy of
                    your application and documents.
                  </li>
                  <li className="tc_li">
                    <b>Repayment Terms:</b> You agree to repay the loan amount
                    along with applicable interest in accordance with the
                    repayment schedule provided in your loan agreement. Failure
                    to repay on time may result in additional charges, legal
                    actions, and may affect your credit score.
                  </li>
                  <li className="tc_li">
                    <b>Interest and Fees:</b> The interest rate for the loan
                    will be up to 3% per month. The Annual Percentage Rate (APR)
                    will be calculated as the monthly interest rate annualized.
                    No hidden fees will be charged; all applicable fees and
                    charges will be clearly disclosed during the application
                    process.
                  </li>
                  <li className="tc_li">
                    <b>User Obligations:</b> You agree to provide accurate and
                    complete information during the registration and loan
                    application process. You are responsible for maintaining the
                    confidentiality of your account information and for all
                    activities that occur under your account.
                  </li>
                  <li className="tc_li">
                    <b>Prohibited Activities: </b>You agree not to engage in any
                    fraudulent activities or provide false information. You
                    agree not to use the Site and Services for any illegal or
                    unauthorized purpose.
                  </li>
                  <li className="tc_li">
                    <b>Privacy Policy: </b>Our Privacy Policy outlines how we
                    collect, use, and protect your personal information. By
                    using the Site and Services, you agree to our Privacy
                    Policy.
                  </li>
                  <li className="tc_li">
                    <b>Intellectual Property: </b>All content on the Site,
                    including text, graphics, logos, and images, is the property
                    of Kasar Credit and Capital Pvt Ltd or its content suppliers
                    and is protected by intellectual property laws. You may not
                    use, reproduce, or distribute any content from the Site
                    without our prior written permission.
                  </li>
                  <li className="tc_li">
                    <b>Modification of Terms: </b>We reserve the right to modify
                    these Terms at any time. Any changes will be effective
                    immediately upon posting on the Site. Your continued use of
                    the Site and Services after the changes constitutes your
                    acceptance of the revised Terms.
                  </li>
                  <li className="tc_li">
                    <b>Termination: </b>We may terminate or suspend your access
                    to the Site and Services at any time, without prior notice
                    or liability, for any reason, including if you breach these
                    Terms.
                  </li>
                  <li className="tc_li">
                    <b>Limitation of Liability: </b>To the maximum extent
                    permitted by law, Kasar Credit and Capital Pvt Ltd shall not
                    be liable for any indirect, incidental, special, or
                    consequential damages arising out of or in connection with
                    your use of the Site and Services.
                  </li>
                  <li className="tc_li">
                    <b>Governing Law: </b>These Terms shall be governed by and
                    construed in accordance with the laws of India. Any disputes
                    arising under these Terms shall be subject to the exclusive
                    jurisdiction of the courts located in New Delhi, India.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-center content_row">
              <div className="content_item">
                <h2>Data Deletion Policy</h2>
                <p className="mt10">
                  At Speedoloan, we value your privacy and are committed to
                  ensuring your personal data is handled securely and
                  responsibly. If you wish to delete your account and personal
                  data, please follow the steps below:
                </p>
                <p className="mt10">
                  <b>How to Delete Your Data:</b>
                </p>
                <ul>
                  <li className="tc_li">
                    <b>Open the Speedoloan App:</b> Launch the app on your
                    mobile device and log in to your account.
                  </li>
                  <li className="tc_li">
                    <b>Go to Account Settings:</b> Navigate to the "Settings" or
                    "Account" section from the main menu.
                  </li>
                  <li className="tc_li">
                    <b>Request Data Deletion:</b> Find the option labeled
                    "Delete Account" or "Request Data Deletion." Tap on it and
                    follow the on-screen instructions.
                  </li>
                  <li className="tc_li">
                    <b>Confirm Deletion:</b> You will be asked to confirm your
                    decision. Please note that this action is irreversible. Once
                    confirmed, your account and all associated data will be
                    permanently deleted from our servers.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-center content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2>What Happens Next ?</h2>
                <ul>
                  <li className="tc_li">
                    <b>Processing Time: </b>Your data deletion request will be
                    processed within [specific time frame, e.g., 7-14 days].
                  </li>
                  <li className="tc_li">
                    <b>Email Confirmation:</b> You will receive an email
                    confirmation once your data has been successfully deleted.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-center content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2>Important Considerations :</h2>
                <ul>
                  <li className="tc_li">
                    <b>Irreversibility: </b>Once your data is deleted, it cannot
                    be recovered. Ensure you have saved any important
                    information before proceeding.
                  </li>
                  <li className="tc_li">
                    <b>Outstanding Loans:</b> If you have any outstanding loans
                    or financial obligations with Speedoloan, please settle
                    them before requesting data deletion.
                  </li>
                  <li className="tc_li">
                    <b>Customer Support:</b> If you encounter any issues or have
                    questions about the data deletion process, please contact
                    our customer support team at info@speedoloan.com or call
                    us at +918800002890.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-center content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2>Contact Us</h2>
                <p className="mt10">
                  If you have any questions or concerns about these Terms,
                  please contact us at:{" "}
                </p>
                <ul>
                  <li className="tc_li">Kasar Credit and Capital Pvt Ltd</li>
                  <li className="tc_li">info@speedoloan.com</li>
                  <li className="tc_li">+918800002890</li>
                </ul>

                <div className="mt30">
                  <p>
                    By using our services, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms &
                    Conditions. If you do not agree to these Terms, please do
                    not use our services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default TermsandConditions;
