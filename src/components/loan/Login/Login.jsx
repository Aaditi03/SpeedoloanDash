import React, { useEffect, useState, useRef } from "react";
import { Loginwrapper } from "../style";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import OtpInput from "../../OtpInput/OtpInput";
import imgLogin from '../../../images/loginImg.png';
import { getStorage, isEmpty, isNumber, setStorage } from "../../../Utils/common";
import { Link, useNavigate } from "react-router-dom";
import { sendotpForLogin, verifyotpForLogin } from "../../../Utils/api";
import Alert from "../../ui/Alert";
import MobileInput from "../../OtpInput/MobileInput";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    const param = {
      mobile: mobileNumber,
      event_name: "login"
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
   

    const param = {
      profile_id: getStorage("cust_profile_id"),
      event_name: "resend_otp"
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

  const verifyOTP = () => {
    let otpNumber = otp.join("");

    if (otpNumber.length !== 4) {
      setMessage({ type: 'error', msg: "Please enter 4 digits OTP" });
      return;
    }

    

    const param = {
      event_name:"otp_verify",
      profile_id: getStorage("cust_profile_id"),
      otp: otpNumber,
    };

    setLoading(true);
    verifyotpForLogin(param).then(resp => {
      setLoading(false);

      if (resp?.data?.Status === 1) {
        setResponce(resp?.data);
        setStorage("next_step",resp?.data?.Data?.next_step)
        setStorage("token", resp?.data?.Data?.app_login_token);
        navigate('/my-dashboard');
      } else {
        setOtp(["", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        let msg = resp?.data?.Message || resp?.data?.error || "An error occurred";
        setMessage({ type: 'error', msg: msg });
      }
    });
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
                      , such as phone calls, SMS, emails, and WhatsApp messages, at the phone number, email address, and app I have provided from salaryontime. Furthermore, I acknowledge that I have reviewed and accept the , Terms and Conditions and Privacy Policy.
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
  );
}

export default Login;
