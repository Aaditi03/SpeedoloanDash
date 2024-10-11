import React from "react";
import "../css/ContentPage.css";
import ChatButton from "../components/ChatButton";
import { Link} from "react-router-dom";

const RateandTerms = () => {
  return (
    <>
      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="content_page_banner_wrapper_overlay">
            <h2>Rate and Terms</h2>
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
                Rate and Terms
              </span>
          </div>
        </div>
        </div>

        <div className="text_content_wrapper">
          <div className="text_content" style={{ width: "95%" }}>
            <h1 className="page_title mt30 mb50">Rate and Terms</h1>
            <div className="flex flex-center space-evenly content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2 className="mb10">
                  How is the annual percentage rate (APR) determined ?
                </h2>
                <span>
                  The Annual Percentage Rate (APR) for loans is determined by
                  several factors, including:
                </span>
                <p className="light_color">
                  <ul>
                    <li>
                      Interest Rate: The base interest rate charged by the
                      lender on the loan amount.
                    </li>
                    <li>
                      Loan Term: The length of time over which the loan will be
                      repaid. Longer terms may have different rates.
                    </li>
                    <li>
                      Fees and Charges: Any additional fees, such as origination
                      fees, processing fees, or other charges that may apply to
                      the loan.
                    </li>
                    <li>
                      Credit Score: The borrower's credit score and credit
                      history, which can influence the interest rate offered by
                      the lender.
                    </li>
                    <li>
                      Loan Amount: The total amount of the loan, as higher loan
                      amounts might have different rate structures.
                    </li>
                    <li>
                      Market Conditions: Prevailing economic and market
                      conditions can impact the interest rates offered by
                      lenders.
                    </li>
                  </ul>
                </p>
                <p className="mt6">
                  The APR is a comprehensive measure that includes both the
                  interest rate and any additional fees or charges, providing a
                  more accurate reflection of the total cost of the loan on an
                  annual basis. This allows borrowers to compare different loan
                  offers more effectively.
                </p>
              </div>
            </div>
            <div className="flex flex-center space-evenly content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2 className="mb10">How Do Our Rates and Fees Work?</h2>
                <span>
                  At SalaryOnTime, we strive to offer transparent and
                  competitive rates and fees to our customers. Here's how our
                  rates and fees structure works:
                </span>
                <p className="light_color">
                  <ul>
                    <li>
                      <b>Interest Rate:</b> Our loans come with a competitive
                      interest rate that is determined based on several factors,
                      including the loan amount, loan term, and your
                      creditworthiness. This interest rate is the primary cost
                      of borrowing and is charged on the principal loan amount.
                    </li>
                    <li>
                      <b>Annual Percentage Rate (APR):</b> The APR includes the
                      interest rate as well as any additional fees or charges
                      associated with the loan. It provides a comprehensive view
                      of the total cost of the loan on an annual basis, making
                      it easier for you to compare different loan offers.
                    </li>
                    <li>
                      <b>Origination Fees:</b> In some cases, we may charge an
                      origination fee for processing your loan application. This
                      fee is typically a percentage of the loan amount and is
                      deducted from the loan disbursement.
                    </li>
                    <li>
                      <b>Late Payment Fees:</b>If you miss a payment or fail to
                      make a payment by the due date, a late payment fee may be
                      charged. We encourage timely payments to avoid these
                      additional charges.
                    </li>
                    <li>
                      <b>Prepayment Penalties:</b> At SalaryOnTime, we do not
                      charge any prepayment penalties. You can repay your loan
                      early without any extra charges, allowing you to save on
                      interest costs.
                    </li>
                    <li>
                      <b>Processing Fees:</b> Depending on the type of loan and
                      the specific terms, there may be a one-time processing fee
                      to cover administrative costs.
                    </li>
                  </ul>
                </p>
                <p className="mt6">
                  <b>How We Determine Your Rates and Fees:</b> Our rates and
                  fees are determined based on creditworthiness, loan amount,
                  loan term, and prevailing economic conditions.
                </p>
              </div>
            </div>
            <div className="flex flex-center space-evenly content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2 className="mb10">How Do Our Rates and Fees Work?</h2>
                <span>
                  At SalaryOnTime, we strive to offer transparent and
                  competitive rates and fees to our customers. Here's how our
                  rates and fees structure works:
                </span>
                <p className="light_color">
                  <ul>
                    <li>
                      <b>Interest Rate:</b> Our loans come with a competitive
                      interest rate that is determined based on several factors,
                      including the loan amount, loan term, and your
                      creditworthiness. This interest rate is the primary cost
                      of borrowing and is charged on the principal loan amount.
                    </li>
                    <li>
                      <b>Annual Percentage Rate (APR):</b> The APR includes the
                      interest rate as well as any additional fees or charges
                      associated with the loan. It provides a comprehensive view
                      of the total cost of the loan on an annual basis, making
                      it easier for you to compare different loan offers.
                    </li>
                    <li>
                      <b>Origination Fees:</b> In some cases, we may charge an
                      origination fee for processing your loan application. This
                      fee is typically a percentage of the loan amount and is
                      deducted from the loan disbursement.
                    </li>
                    <li>
                      <b>Late Payment Fees:</b>If you miss a payment or fail to
                      make a payment by the due date, a late payment fee may be
                      charged. We encourage timely payments to avoid these
                      additional charges.
                    </li>
                    <li>
                      <b>Prepayment Penalties:</b> At SalaryOnTime, we do not
                      charge any prepayment penalties. You can repay your loan
                      early without any extra charges, allowing you to save on
                      interest costs.
                    </li>
                    <li>
                      <b>Processing Fees:</b> Depending on the type of loan and
                      the specific terms, there may be a one-time processing fee
                      to cover administrative costs.
                    </li>
                  </ul>
                </p>
                <p className="mt6">
                  <b>How We Determine Your Rates and Fees:</b> Our rates and
                  fees are determined based on creditworthiness, loan amount,
                  loan term, and prevailing economic conditions.
                </p>
              </div>
            </div>
            <div className="flex flex-center space-evenly content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2 className="mb10">Why Choose SalaryOnTime</h2>
                <p className="light_color">
                  <ul>
                    <li>
                      Transparent Pricing: No hidden charges or unexpected fees.
                    </li>
                    <li>
                      Competitive Rates: We offer some of the best rates in the
                      industry.
                    </li>
                    <li>
                      Flexible Terms: Tailored loan terms to suit your financial
                      needs.
                    </li>
                    <li>
                      Flexible Terms: Tailored loan terms to suit your financial
                      needs.
                    </li>
                  </ul>
                </p>
                <p className="mt6">
                  If you have any questions about our rates and fees, please
                  feel free to contact our customer service team for detailed
                  information. We're here to help you make informed financial
                  decisions.
                </p>
              </div>
            </div>

            <div className="flex flex-center space-evenly content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <h2 className="mb10">Representative Example</h2>
                <span>
                  Here’s an example to help you understand how our rates and
                  fees work:
                </span>
                <p className="light_color">
                  Loan Amount: ₹1,00,000 <br />
                  Loan Term: 12 months Annual Interest <br />
                  Rate: 12% Origination Fee: 2% of the loan amount Monthly{" "}
                  <br />
                  EMI: ₹8,885 Total Interest Payable: ₹6,000 Total Amount <br />
                  Repayable: ₹1,06,000 APR: 14.25% <br />
                </p>
                <h3 className="mt20">Breakdown</h3>
                <p className="light_color">
                  <ul>
                    <li>Principal Loan Amount: ₹1,00,000</li>
                    <li>Origination Fee: ₹2,000 (2% of ₹1,00,000)</li>
                    <li>Disbursed Amount: ₹98,000 (₹1,00,000 - ₹2,000)</li>
                    <li>Monthly EMI: ₹8,885</li>
                    <li>Total Interest Payable Over the Loan Term: ₹6,000</li>
                    <li>
                      Total Amount Repayable: ₹1,06,000 (Principal + Interest)
                    </li>
                    <li>APR: 14.25%</li>
                  </ul>
                </p>
                <h3 className="mt20">Explanation</h3>
                <p className="light_color">
                  <ul>
                    <li>
                      <b>Principal Loan Amount:</b> This is the amount you
                      borrow, in this case, ₹1,00,000.
                    </li>
                    <li>
                      <b>Origination Fee:</b> A one-time fee for processing your
                      loan, which is 2% of the loan amount. This fee is deducted
                      from the disbursed amount.
                    </li>
                    <li>
                      <b>Disbursed Amount:</b> The amount you receive after the
                      origination fee is deducted, which is ₹98,000.
                    </li>
                    <li>
                      <b>Monthly EMI:</b> The equated monthly installment you
                      need to pay, calculated based on the loan amount, interest
                      rate, and loan term.
                    </li>
                    <li>
                      <b>Total Interest Payable:</b> The total interest you will
                      pay over the loan term, which is ₹6,000.
                    </li>
                    <li>
                      <b>Total Amount Repayable:</b> The total amount you will
                      repay, including the principal and interest, which is
                      ₹1,06,000.
                    </li>
                    <li>
                      <b>APR:</b> The annual percentage rate, which includes the
                      interest rate and origination fee, giving a comprehensive
                      view of the total cost of the loan.
                    </li>
                  </ul>
                </p>
                <p className="mt6">
                  This example provides a clear picture of the costs associated
                  with a typical loan from SalaryOnTime. Your actual rates and
                  fees may vary based on your specific circumstances. For a
                  personalized quote, please complete the application form or
                  contact our customer service team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default RateandTerms;
