import React, { useEffect, useState, useRef } from "react";
import { Loginwrapper } from "../style";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import OtpInput from "../../OtpInput/OtpInput";
import imgLogin from '../../../images/loginImg.jpeg';
import { getStorage, isEmpty, isNumber, setStorage } from "../../../Utils/common";
import { Link, useNavigate } from "react-router-dom";
import { sendotpForLogin, verifyotpForLogin, ckeckEligibility } from "../../../Utils/api";
import Alert from "../../ui/Alert";
import MobileInput from "../../OtpInput/MobileInput";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { VscCombine } from "react-icons/vsc";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
import { IoMdDoneAll } from "react-icons/io";
import process_line from "../../../images/process_line.svg";

function Login() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [screen, setScreen] = useState("getOtp");
  const [seconds, setSeconds] = useState(0);
  const [mobile, setMobile] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [acceptError, setAcceptError] = useState("");
  const [message, setMessage] = useState({});
  const [responce, setResponce] = useState({});
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // Extract UTM parameters from the URL
  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    };
  };



  useEffect(() => {
    if (screen === "getOtp") return;
    const timer = setInterval(() => {
      if (seconds === 0) {
        clearInterval(timer);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  const onChanges = (e, type) => {
    const { name, value } = e.target;

    if (type === "sendOtp") {
      if (!isNumber(value) && !isEmpty(value)) return;
      setMobile(value);
      setMobileError("");
    }
  };

  const sendOtp = () => {
    let mobileNumber = mobile.join("");
    if (mobileNumber.length < 10) {
      setMobileError("The Mobile field must be at least 10 characters in length.");
      return;
    }
    if (!accept) {
      setAcceptError("Please check the checkbox to accept our terms and conditions");
      return;
    } else {
      setAcceptError(""); 
    }

    // Get UTM parameters from the URL
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = getUtmParams();

    const param = {
      mobile: mobileNumber,
      event_name: "login",
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content
    };

    setLoading(true);
    sendotpForLogin(param).then(resp => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setResponce(resp?.data);
        setStorage("mobile", mobileNumber);
        setStorage("cust_profile_id", resp?.data?.Data?.cust_profile_id);
        setScreen("otpScreen");
        setSeconds(30);
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });
      } else {
        setMobile(["", "", "", "", "", "", "", "", "", ""]); 
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus(); 
        }
        let msg = resp?.data?.Message || resp?.data?.error || "An error occurred";
        setMessage({ type: 'error', msg: msg });
      }
    });
  };

  const resendOtp = () => {
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = getUtmParams();

    const param = {
      profile_id: getStorage("cust_profile_id"),
      event_name: "resend_otp",
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content
    };

    setLoading(true);
    sendotpForLogin(param).then(resp => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setResponce(resp?.data);
        setScreen("otpScreen");
        setSeconds(30);
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });
      } else {
        setMobile(["", "", "", "", "", "", "", "", "", ""]); 
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus(); 
        }
        let msg = resp?.data?.Message || resp?.data?.error || "An error occurred";
        setMessage({ type: 'error', msg: msg });
      }
    });
  };

  const verifyOTP = async () => {
    let otpNumber = otp.join("");
  
    if (otpNumber.length !== 4) {
      setMessage({ type: 'error', msg: "Please enter 4 digits OTP" });
      return;
    }
  
    const param = {
      event_name: "otp_verify",
      profile_id: getStorage("cust_profile_id"),
      otp: otpNumber,
    };
  
    setLoading(true);
    try {
      const resp = await verifyotpForLogin(param);
  
      setLoading(false);
  
      if (resp?.data?.Status === 1) {
        setResponce(resp?.data);
        setStorage("next_step", resp?.data?.Data?.next_step);
        setStorage("token", resp?.data?.Data?.app_login_token);
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });

        if (resp?.data?.Data?.eligibility_status === 1) {
          setStorage("eligibility", 1); // Store eligibility as 1 if eligible
        } else {
          setStorage("eligibility", 0); // Store eligibility as 0 if not eligible
        }
    
        // Navigate based on eligibility
        if (getStorage('eligibility') === 1) {
          console.log("Navigating to /my-dashboard/eligibility");
          navigate('/my-dashboard/eligibility');
        } else {
          console.log("Navigating to /my-dashboard");
          navigate('/my-dashboard');
        }
      } else {
        setOtp(["", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        let msg = resp?.data?.Message || resp?.data?.error || "An error occurred";
        setMessage({ type: 'error', msg: msg });
      }
    } catch (err) {
      setLoading(false);
      setMessage({ type: 'error', msg: "Error verifying OTP" });
      console.error("OTP Verification Error:", err);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifyOTP();
    }
  };

  useEffect(() => {
    if (isEmpty(message)) return;
    const timer = setTimeout(() => {
      setMessage({});
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
    
    <Loginwrapper className="flex justify-center">
      <div className="left">
        <img src={imgLogin} alt="" />
        <div className="textBox">
          <h2>Need an <br /> instant loan</h2>
          <div>Up to ₹100,000</div>
        </div>
      </div>
      <div className="right" style={{ marginRight: "110px", maxWidth: "413px", minHeight: "417px", backgroundColor: "#f5f5fa", borderRadius: "52px" }}>
        <div className="form" style={{ maxWidth: "400px" }}>
          <Alert setMessage={setMessage} message={message} />
          <h2 style={{ fontSize: "26px" }}>Apply for a Personal Loan</h2>
          {screen === "getOtp" ? (
            <>
              <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "30px" }}>Enter your 10 digit mobile number to get started</p>
              <div className="otpBox">
              <MobileInput
              name="mobile"
              setOtp={setMobile}
              otp={mobile}
              isDisable={false}
              error={mobileError}
              onChange={(e) => onChanges(e, "sendOtp")}
              placeholder="*"
              onKeyDown={handleKeyDown}
              inputRefs={inputRefs}
            />

              </div>
              <div className="flex confirm" style={{ fontSize: "13px", fontWeight: "600", textAlign: "justify" }}>
                <input
                  style={{ height: "15px", width: "35px", marginRight: "10px" }}
                  name="radio"
                  type="radio"
                  checked={accept}
                  onChange={() => {
                    setAccept(!accept);
                    setAcceptError("");
                  }}
                />
                <p style={{ fontSize: "14px", lineHeight: "14px" }}>
                  By selecting this checkbox, I authorize the receipt of digital communications
                  {showMore ? (
                    <span>
                      , such as phone calls, SMS, emails, and WhatsApp messages, at the phone number, email address, and app I have provided from Speedoloan. Furthermore, I acknowledge that I have reviewed and accept the , <Link to="/termsandconditions">Terms and Conditions</Link> and <Link to="/privacypolicy"> Privacy Policy</Link>.
                    </span>
                  ) : (
                    <span>
                      <button onClick={() => setShowMore(true)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#26b9db', textDecoration: 'none' }}>read more</button>
                    </span>
                  )}
                </p>
              </div>
              {acceptError && <p style={{ color: 'red', fontSize: '12px' }}>{acceptError}</p>}
              <div className="button">
                <Button title="Get OTP" onClick={sendOtp} loading={loading} />
              </div>
            </>
          ) : (
            <>
             
            
              <p style={{ fontSize: "15px", fontWeight: "600", marginBottom: "18px" }}>
                Mobile number : ******{(getStorage("mobile") && getStorage("mobile").length >= 10) ? getStorage("mobile").slice(-4) : 'N/A'}
              </p>
              <p>Please enter the OTP to unlock your next step.</p>
              <div className="otpBox">
                <OtpInput
                  type="text"
                  setOtp={setOtp}
                  otp={otp}
                  isDisable={false}
                  placeholder="*"
                  onKeyDown={handleKeyDown}
                  inputRefs={inputRefs}
                />
              </div>
              <div className="button">
                <Button title="Verify OTP" onClick={verifyOTP} loading={loading} />
              </div>
              <div className="resend">
                {seconds > 0 ? (
                  <p className="none">
                    Didn't receive the OTP? <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px', marginLeft: '5px', color: 'red' }} /> <span style={{ color: "red", fontWeight: 600 }}>00:{seconds}s</span>
                  </p>
                ) : (
                  <button
                    onClick={!loading ? resendOtp : () => {}}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #26b9db',
                      color: '#26b9db',
                      padding: '10px 9px',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontFamily: 'Roboto, sans-serif',
                      transition: 'background-color 0.3s, color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#26b9db';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#26b9db';
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Loginwrapper>
    <div className="services_page_section"  data-aos="zoom-in">
          <div className="services_row">
            <Link to="/instant-loan">
              <div className="services_item">
                <div className="services_icon_container">
                  <GiPayMoney className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Instant Loan</h4>
                  </div>
                  <p>
                    We offer instant loans to help you tackle unexpected
                    financial needs swiftly and efficiently. 
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/short-term-loan">
              <div className="services_item">
                <div className="services_icon_container">
                  <GiTakeMyMoney className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Short Loan</h4>
                  </div>
                  <p>
                    Discover the convenience of short loans at Speedoloan,
                    designed to meet your immediate financial needs with ease.
                  
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/debt-consolidation-loan">
              <div className="services_item">
                <div className="services_icon_container">
                  <VscCombine className="services_icon" />
                </div>
                <div className="services_content">
                  <div className="services_title">
                    <h4>Debt Consolidation</h4>
                  </div>
                  <p>
                    Take control of your finances with our debt consolidation
                    services. Consolidate multiple debts into one manageable
                    payment 
                  </p>
                </div>
              </div>
            </Link>
            </div>
            </div>

            <div className="general_working">
            <div className="title_section">
              <p className="sub_title flex flex-center justify-center">
                <span>
                  <BsFillGrid1X2Fill
                    className="mr10"
                    style={{ marginBottom: "-2px" }}
                  />
                </span>
                <span>RISKS</span>
              </p>

              <h2 className="mt20 full-width text-center">
                A disclaimer before you <span>Apply</span>
              </h2>
            </div>
            <div className="process_card_area mt50">
              <div className="process_line">
                <img src={process_line} alt="" />
              </div>
              <div className="process_row">
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <AiOutlineFileDone className="process_icon" />
                  </div>
                  <div className="process_card_number">01</div>
                  <h2 className="mb10">Relatively high interest rate</h2>
                  <p className="full-width text-center">
The rates are somewhat higher as compared to long-term loans like automobile loans from banks.
                  </p>
                </div>
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <VscOpenPreview className="process_icon" />
                  </div>
                  <div className="process_card_number">02</div>
                  <h2 className="mb10">Residents only</h2>
                  <p className="full-width text-center">
                    We greatly value the trust of our Indian customers and are committed to providing services that prioritize your unique requirements.
                  </p>
                </div>
                <div className="process_card">
                  <div className="process_card_icon flex flex-center justify-center mb20">
                    <IoMdDoneAll className="process_icon" />
                  </div>
                  <div className="process_card_number">03</div>
                  <h2 className="mb10">Salary loans</h2>
                  <p className="full-width text-center">
This is short term loan service only for salaried individuals with a salary above INR 35000/-.
                  </p>
                </div>
                
              </div>
            </div>
          </div>

          <div className="text_content_wrapper">
          <div className="text_content" style={{ width: "95%" }}>
            <h1 className="page_title mt30 mb50">Terms and Conditions</h1>
            <div className="flex flex-center content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
                <p>
                  Welcome to the Speedoloan website, operated by Agrim Private Limited ("we", "us", "our"). By accessing or using
                  our website ("Site") and services ("Services"), you agree to
                  be bound by the following terms and conditions.
                </p>
                <a href="/termsandconditions" style={{color:"#26b9db", marginLeft:"10px"}}>Read more</a>
              </div>
            </div>
          </div>
          </div>

          <br/>
          <div className="rate">
              {/* Add content in this div */}
              <h2>Rates and Fees</h2>
              <p>Monthly Interest Rate: 2.9166%</p>
              <p>Offered Annual Percentage Rate (APR): 35% (Fixed)</p>
              <p>Tenure/Repayment Period: 1 - 3 Years</p>
              <p>Minimum-Maximum Loan Amount: INR 10,000 - 5,00,000</p>
              <p>Processing Fee: 2%</p>
              <p>GST on Processing Fee (Exclusive): 18%</p>
              <h3>Representative Example:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Loan Amount</th>
                    <th>APR</th>
                    <th>Tenure</th>
                    <th>Processing Fee</th>
                    <th>GST on Processing Fee</th>
                    <th>Amount Disbursed</th>
                    <th>EMI</th>
                    <th>Total Repayment Amount</th>
                    <th>Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>₹50,000</td>
                    <td>35%</td>
                    <td>12 Months</td>
                    <td>₹1,000</td>
                    <td>₹180</td>
                    <td>₹48,820</td>
                    <td>₹4,998</td>
                    <td>₹59,978</td>
                    <td>₹9,978</td>
                  </tr>
                </tbody>
              </table>
            </div>
    </>
  );
}

export default Login;
