import React, { useState, useRef, useEffect } from 'react';
import './OtpInput.css';
import { isEmpty } from '../../Utils/common';

const OtpInput = ({ type, otp = ['', '', '', ''], setOtp = () => {}, isDisable = false, placeholder = "", number = true, caseText = "upper" }) => {
  const inputRefs = useRef([]);
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    // Focus on the first input field when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (e, index) => {
    let value = e.target.value;

    if (caseText === "upper") {
      value = value.toUpperCase();
    }
    let pattern = /^[0-9]*$/;
    if (!number) {
      pattern = /^[a-zA-Z0-9]*$/;
    }

    if (pattern.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;

      setOtp(updatedOtp);

      // Focus on the next input field
      if (value !== '' && index < (otp.length - 1)) {
        inputRefs.current[index + 1].focus();
      } else if (isEmpty(value) && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const onfocusInput = (e) => {
    e.target?.children[0]?.focus();
  };

  return (
    <div className="otp-input flex">
      {otp.map((digit, index) => (
        <div className={`box ${focus === index ? "focus" : ""}`} key={index} onClick={onfocusInput}>
          <input
            type={type}
            placeholder={placeholder}
            disabled={isDisable}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            maxLength="1"
            ref={(input) => (inputRefs.current[index] = input)}
            onFocus={() => setFocus(index)} 
            onBlur={() => setFocus(null)}
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
