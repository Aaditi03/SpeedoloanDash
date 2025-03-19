import React, { useState, useEffect } from "react";
import "../css/Common.css";
import "../css/RepaymentDetails.css"; // Assuming the CSS is defined here
import qr_image from "../images/speedoqr.png";
import qr2 from "../images/qr2.png";
import ChatButton from "../components/ChatButton";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/Payment/PaymentModal";
import CryptoJS from "crypto-js"; // Importing the crypto-js library

const RepayLoan = (props) => {
    const [content, setContent] = useState("pannumber");
    const [getLoading, setLoading] = useState(false);
    const [getPancard, setPancard] = useState("");
    const [getOtp, setOtp] = useState("");
    const [repaymentData, setRepaymentData] = useState(null);
    const [orderId, setOrderId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(); // New state for part payment
    const navigate = useNavigate();

    const sendOtp = async () => {
        setLoading(true);
        try {
            const resp = await fetch("https://crm.speedoloan.com/api/Api/CustomerDetails/Sendotp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
                    Accept: "application/json",
                },
                body: JSON.stringify({ pancard: getPancard }),
            });

            if (resp.status === 200) {
                const dataset = await resp.json();
                props.showmessage(dataset.Message);
                if (dataset.Status === 1) {
                    setContent("panotp");
                }
            }else{
              const dataset=await resp.json();
              props.showmessage(dataset.Message);
            }
        } catch (error) {
          
            console.error("Error sending OTP:", error);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {  
        setLoading(true);
        try {
            const resp = await fetch("https://crm.speedoloan.com/api/Api/CustomerDetails/verifyOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    panNumber: getPancard,
                    otp: getOtp,
                }),
            });

            if (resp.status === 200) {
                const dataset = await resp.json();
                props.showmessage(dataset.Message);

                if (dataset.Status === 1) {
                    const repaymentData = dataset.repayment_data;
                    setRepaymentData(repaymentData);
                    setOrderId(dataset.order_id);
                    setContent("amountfetched");
                }
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        } finally {
            setLoading(false);
        }
    };

    const payHere = async () => {
      setLoading(true);
      try {
          var total_due_amount = repaymentData.total_due_amount;
          if (paymentAmount < repaymentData.total_due_amount) {
              total_due_amount = paymentAmount; // Use part payment amount if provided
          }
  
          const options = {
              key: "rzp_live_gSedwg0IRWdr5a",
              amount: (total_due_amount * 100).toString(),
              currency: "INR",
              name: "Speedoloan",
              description: getPancard,
              image: "https://crm.speedoloan.com/public/images/18-BK_kixu8.png",
              order_id: orderId,
              prefill: {
                  name: "Hidden",
                  email: repaymentData.email,
                  contact: repaymentData.mobile,
              },
              theme: { color: "#8180e0" },
              handler: function (response) {
                  const paymentDetails = {
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_signature: response.razorpay_signature,
                  };
  
                  fetch("https://crm.speedoloan.com/api/Api/CustomerDetails/verifyRazorPayCheckPaymentStatus", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json; charset=UTF-8",
                          Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
                          Accept: "application/json",
                      },
                      body: JSON.stringify(paymentDetails),
                  })
                      .then((res) => res.json())
                      .then((data) => {
                          let txnStatus = data.status
                          let txnId = data.txnId || "N/A";  // Get txnId from response if available
  
                          // Pass txnStatus and txnId to the thank you page using navigate
                          navigate("/thanku", {
                              state: {
                                  txnStatus: txnStatus,
                                  txnId: txnId,
                              },
                          });
  
                          setPaymentStatus(txnStatus === 'SUCCESS' ? "Payment Successful" : "Payment Verification Failed");
                          setContent(txnStatus === 'SUCCESS' ? "paymentSuccess" : "paymentFailure");
                          setLoading(false);
                      })
                      .catch((error) => {
                          console.error("Error verifying payment:", error);
                          setPaymentStatus("Payment Verification Failed");
                          setLoading(false);
                      });
              },
          };
  
          const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
          if (res) {
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
          } else {
              alert("Razorpay SDK failed to load. Are you online?");
          }
      } catch (error) {
          console.error("Error during payment:", error);
          setLoading(false);
      }
  };
  

    let processing = false; 
    const payWithPayU = async () => {
      if (processing) return;
      processing = true;
  
      setLoading(true);
      try {
          const total_due_amount = paymentAmount || repaymentData.total_due_amount; // Use part payment amount if provided
          const MERCHANT_KEY = "LrvBUp"; 
          const productinfo = "Loan repayment for Loan No"; 
          const fullname = repaymentData.full_name;
          const email = repaymentData.email;
          const phone = repaymentData.mobile;
  
          const response = await fetch("https://crm.speedoloan.com/api/Api/RepayLoanApi/payuOrders", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                  Accept: "application/json",
                  "Auth":"MjFmMTdiYjE0MTM3Y2YxODQxYjhiMGEwNTY4M2I1ZDE="
              },
              body: JSON.stringify({
                  amount: total_due_amount,
                  productinfo: productinfo,
                  firstname: fullname,
                  email: email,
                  mobile: phone,
                  udf5: repaymentData.lead_id
              }),
          });
  
          const data = await response.json();
  
          if (data.Status === 1) {
              const hashData = data.data.parameters;
  
              const payuOptions = {
                  key: MERCHANT_KEY,
                  txnid: hashData.txnid,
                  amount: total_due_amount,
                  productinfo: productinfo,
                  firstname: fullname,
                  email: email,
                  phone: phone,
                  surl: "https://speedoloan.com/thanku",
                  furl: "https://speedoloan.com/fail",
                  hash: hashData.hash,
                  udf5:repaymentData.lead_id
              };
  
              const scriptLoaded = await loadScript("https://jssdk.payu.in/bolt/bolt.min.js");
  
              if (scriptLoaded) {
                  if (typeof window.bolt !== 'undefined') {
                      window.bolt.launch(payuOptions, {
                          responseHandler: function (BOLT) {
                              if (BOLT.response.txnStatus === "SUCCESS") {
                                  // Pass the transaction status to the Thank You page via React Router's state
                                  navigate("/thanku", { state: { txnStatus: BOLT.response.txnStatus, txnId: BOLT.response.txnid } });
                              }
                              if (BOLT.response.txnStatus === "FAILED" || BOLT.response.txnStatus === "CANCEL") {
                                  navigate("/thanku", { state: { txnStatus: BOLT.response.txnStatus, txnId: BOLT.response.txnid } });
                              }
                          },
                          catchException: function (BOLT) {
                              console.log('Payment failed. Please try again.');
                          }
                      });
                  } else {
                      console.error("PayU SDK not initialized correctly after loading.");
                  }
              } else {
                  console.error("Failed to load PayU script.");
              }
          } else {
              console.error("Failed to get valid response from PayU API.");
          }
      } catch (error) {
          console.error("Error during PayU payment:", error);
      } finally {
          setLoading(false);
          processing = false;
      }
  };
  


    const handlePAN = (e) => {
        const value = e.target.value.toUpperCase();
        if (/^[A-Z]{0,5}$/.test(value.slice(0, 5)) && /^[\d]{0,4}$/.test(value.slice(5, 9)) && /^[A-Z]{0,1}$/.test(value.slice(9))) {
            setPancard(value);
        }
    };

    const handleOTP = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 4) {
            setOtp(value);
        }
    };

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };
    
  
  

    const handlePaymentClick = () => {
        setModalOpen(true);
        setLoading(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleRazorpay = () => {
        setModalOpen(false);
        payHere();
        setLoading(false);
    };

    const handlePayU = () => {
        setModalOpen(false);
        payWithPayU();
        setLoading(false);
    };
    const handlePaymentAmountChange = (e) => {
      let value = e.target.value;
    
      // Prevent the value from starting with 0, but allow decimal numbers
      if (value.length === 1 && value === '0') {
        // Do nothing if the input is just "0"
        return;
      }
    
      // Regex to ensure the input doesn't start with a "0" unless it's "0." (i.e., decimal number like 0.50 is allowed)
      const regex = /^(?!0(\.\d+)?)(\d*\.?\d*)$/;
    
      // Only update if the value matches the regex pattern
      if (regex.test(value) || value === "") {
        setPaymentAmount(value);
      }
    };
    
    

  return (
    <>
      <div className="page_wrapper">
        <div className="page_banner_wrapper repay_loan_banner">
          <div className="page_banner_wrapper_overlay repay_loan_banner_overlay">
            <h2>Repay Loan</h2>
          </div>
        </div>

        <div className="repay_loan_wrapper">
          <div className="repay_loan_section">
            {content === "pannumber" ? (
              <div className="pan_number">
                <p className="note mb20">
                  Please verify the accuracy of the below details before doing any transfer.
                </p>
                <span>Please enter your PAN Details</span> <br />
                <input type="text" value={getPancard} onChange={handlePAN} required maxLength={10} />
                <div className="button_container mt30">
                  <button onClick={sendOtp}>
                    {getLoading ? <div className="loadinganim"></div> : "Get OTP"}
                  </button>
                </div>
              </div>
            ) : content === "panotp" ? (
              <div className="pan_number">
                <p className="pan_details mb20">PAN NUMBER : {getPancard}</p>
                <input
                  type="text"
                  placeholder="Please enter the OTP received"
                  value={getOtp}
                  onChange={handleOTP}
                  maxLength={4}
                />
                <p className="agreement">
                  <input type="checkbox" />{" "}
                  <span>
                    To proceed with your loan application, please confirm your acceptance of our Terms and Conditions, Privacy Policy, and provide your consent for processing the payment.
                  </span>
                </p>
                <div className="button_container mt20 ml10">
                  <button onClick={verifyOtp}>
                    {getLoading ? <div className="loadinganim"></div> : "Get Amount"}
                  </button>
                </div>
              </div>
            )  : content === "amountfetched" && repaymentData ? (
              <div className="repayment-card">
                <div className="repayment-header">
                  <h2>Loan Repayment Details</h2>
                </div>

                <div className="repayment-info">
  <div className="info-item">
    <span className="label">Loan Number:</span>
    <span className="value">{repaymentData.loan_no}</span>
  </div>
  <div className="info-item">
    <span className="label">Disbursal Date:</span>
    <span className="value">{repaymentData.disbursal_date}</span>
  </div>
  <div className="info-item">
    <span className="label">Repayment Date:</span>
    <span className="value">{repaymentData.repayment_date}</span>
  </div>
  <div className="info-item">
    <span className="label">Repayment Amount:</span>
    <span className="value">₹{repaymentData.repayment_amount.toLocaleString()}</span>
  </div>
  <div className="info-item">
    <span className="label">Loan Amount:</span>
    <span className="value">₹{repaymentData.loan_recommended.toLocaleString()}</span>
  </div>
  <div className="info-item">
    <span className="label">Real Interest:</span>
    <span className="value">₹{repaymentData.real_interest.toLocaleString()}</span>
  </div>
  <div className="info-item">
    <span className="label">Repayment With Interest:</span>
    <span className="value">₹{repaymentData.total_due_amount.toLocaleString()}</span>
  </div>
  <div className="info-item due-amount">
    <span className="label">Total Due Amount:</span>
    <span className="value">₹{repaymentData.total_due_amount.toLocaleString()}</span>
  </div>
  <div className="info-item part-amount">
    <span className="label">Amount To Pay</span>
    {/* Make the Amount To Pay field editable */}
    <input
                            type="text"
                            value={paymentAmount}
                            onChange={handlePaymentAmountChange}
                            placeholder="Enter payment amount"
                        />
  </div>
</div>


                <div className="repayment-button-container">
                  <button className="repayment-button" onClick={handlePaymentClick}>
                    {getLoading ? <div className="loadinganim"></div> : "Proceed to Pay"}
                  </button>
                </div>

                {isModalOpen && (
                  <PaymentModal 
                    onClose={handleCloseModal} 
                    onRazorpay={handleRazorpay} 
                    // onPayU={handlePayU} 
                    isLoading={getLoading} 
                  />
                )}
              </div>
            ) : content === "paymentSuccess" ? (
              <div className="payment-success">
                <h3>{paymentStatus}</h3>
                <p>Thank you for your payment!</p>
              </div>
            ) : null}
          </div>

          <div className="bank_details_section flex flex-center space-between">
            <table className="details_table">
              <tr>
                <td><span className="account_field_value">Bank Name</span></td>
                <td><span className="account_data_value">ICICI Bank Ltd</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Company Name</span></td>
                <td><span className="account_data_value">Agrim Fincap Pvt Ltd Collection A/c</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Account No.</span></td>
                <td><span className="account_data_value">802105000125</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">IFSC Code</span></td>
                <td><span className="account_data_value">ICIC0008021</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Branch Address</span></td>
                <td><span className="account_data_value">Jagatpuri Branch </span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Account Type</span></td>
                <td><span className="account_data_value">Current</span></td>
              </tr>
            </table>
            <div className="qr_details">
              <img src={qr_image} alt="QR Code" />
            </div>
          </div>

          {/* <div className="bank_details_section flex flex-center space-between">
            <table className="details_table">
              <tr>
                <td><span className="account_field_value">Bank Name</span></td>
                <td><span className="account_data_value">IDFC First Bank</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Company Name</span></td>
                <td><span className="account_data_value">Agrim Fincap Pvt Ltd Collection A/c</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Account No.</span></td>
                <td><span className="account_data_value">10182292783</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">IFSC Code</span></td>
                <td><span className="account_data_value">ICIC0008021
                </span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Branch Address</span></td>
                <td><span className="account_data_value">Ground floor, WZ-104, Plot no 46-H, Meenakshi Garden, Tilak Nagar, New Delhi - 110018</span></td>
              </tr>
              <tr>
                <td><span className="account_field_value">Account Type</span></td>
                <td><span className="account_data_value">Current</span></td>
              </tr>
            </table>
            <div className="qr_details">
              <img src={qr2} alt="QR Code" />
            </div>
          </div> */}
           <br/>
          <div className="repay_loan_section">
            <div className="pan_number">
              <h2>Here's how our loan repayment works:</h2><br />
              <p><strong>Flexible Options: </strong>We offer a range of repayment tenures, allowing you to choose a period that aligns with your financial capacity. Whether you prefer to clear your debt quickly or opt for smaller monthly installments, we have options to suit your needs.</p><br />
              <p><strong>EMI Calculation:</strong> Our Equated Monthly Installment (EMI) calculator helps you determine the exact amount you'll repay each month. This transparency enables you to plan your finances effectively.</p><br />
              <p><strong>Auto-Debit Facility:</strong> To ensure you never miss a payment, we offer an auto-debit facility. Your EMI amount is automatically deducted from your linked bank account, giving you peace of mind.</p><br />
              <p><strong>Online Payment:</strong> We provide a secure online platform for you to make your EMI payments conveniently. Say goodbye to long queues and enjoy the ease of digital transactions.</p><br />
              <p><strong>Timely Reminders:</strong> We send you timely reminders before your EMI due date, helping you stay on top of your repayment schedule.</p><br />
              <p><strong>No Hidden Charges:</strong> Our commitment to transparency means you won't encounter any hidden charges. The amount you agree upon during the loan approval process is what you'll repay – no surprises.</p><br />
            </div>

            <div className="pan_number">
              <h2>What is the maximum and minimum repayment period at Speedoloan?</h2><br />
              <p>At Speedoloan, we allow you enough time and flexibility to repay your loan. This is done to ensure that repayments don’t feel like a burden. However, when it comes to the precise duration, the minimum repayment period is 60 days, and the maximum repayment period is 40 days.</p>
            </div>
          </div>

          <ChatButton />
        </div>
      </div>
    </>
  );
};

export default RepayLoan;