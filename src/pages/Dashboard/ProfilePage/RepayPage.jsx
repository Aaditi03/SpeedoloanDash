import React, { useContext,useState } from "react";
import { useParams } from "react-router-dom";
import { ProfilePreviewWrapper } from "../../Dashboard/ProfilePage/style";
import ProfileHeader from "../../Dashboard/ProfilePage/ProfileHeader";
import ContextDashboard from "../../../Context/ContextDashboard";


function RepayPage(props) {

    const [content, setContent] = useState("pannumber");
  const [getLoading, setLoading] = useState(false);
  

 
 
  const [paymentStatus, setPaymentStatus] = useState("");
  const {outdata}=useContext(ContextDashboard); // To store payment status
  
  
  const payHere = async () => {
    setLoading(true);
    try {
      const total_due_amount = outdata?.repayment_data?.total_due_amount;
      const options = {
        key: "rzp_live_3XXwpvgLtdYIh3",
        amount: (total_due_amount * 100).toString(),
        currency: "INR",
        name: "SalaryOnTime",
        
        image: "https://web.salaryontime.in/public/images/final_logo.png",
        order_id: outdata?.order_id,
        // callback_url: "https://salaryontime.in/thankyou",
        prefill: {
          name: "Hidden",
          email: outdata?.repayment_data?.email,
          contact: outdata?.repayment_data?.mobile,
        },
        theme: { color: "#8180e0" },
        handler: function (response) {
          // Callback function when payment is successful
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment on the server
          fetch("https://api.salaryontime.in/Api/CustomerDetails/verifyRazorPayCheckPaymentStatus", {
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
              if (data.status === "success") {
             

                setPaymentStatus("Payment Successful");
                setContent("paymentSuccess");
              } else {
                setPaymentStatus("Payment Verification Failed");
              }
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

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  

  

 

  return (
    <ProfilePreviewWrapper>
      <ProfileHeader /><br/>

      <div className="repayment-card">
                <div className="repayment-header">
                  <h2>Loan Repayment Details</h2>
                </div>

                <div className="repayment-info">
                  <div className="info-item">
                    <span className="label">Loan Number:</span>
                    <span className="value">{outdata?.repayment_data?.loan_no}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Disbursal Date:</span>
                    <span className="value">{outdata?.repayment_data?.disbursal_date}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Repayment Date:</span>
                    <span className="value">{outdata?.repayment_data?.repayment_date}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Repayment Amount:</span>
                    <span className="value">₹{outdata?.repayment_data?.repayment_amount.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Loan Amount:</span>
                    <span className="value">₹{outdata?.repayment_data?.loan_recommended.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Real Interest:</span>
                    <span className="value">₹{outdata?.repayment_data?.real_interest.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Repayment With Interest:</span>
                    <span className="value">₹{outdata?.repayment_data?.total_due_amount.toLocaleString()}</span>
                  </div>
                  <div className="info-item due-amount">
                    <span className="label">Total Due Amount:</span>
                    <span className="value">₹{outdata?.repayment_data?.total_due_amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="repayment-button-container">
                  <button className="repayment-button" onClick={payHere}>
                    {getLoading ? <div className="loadinganim"></div> : "Proceed to Pay"}
                  </button>
                </div>
              </div>
      
    </ProfilePreviewWrapper>
    
  );
}

export default RepayPage;
