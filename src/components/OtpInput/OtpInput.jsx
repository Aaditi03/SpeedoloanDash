import React, { useState, useRef, useEffect } from "react";
import "./OtpInput.css";
import { isEmpty } from "../../Utils/common";

const OtpInput = ({
  type,
  otp = ["", "", "", ""],
  setOtp = () => {},
  isDisable = false,
  placeholder = "",
  number = true,
  caseText = "upper",
  onKeyDown,
  inputRefs,
}) => {
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [inputRefs]);

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

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && isEmpty(otp[index])) {
      if (index > 0) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
        inputRefs.current[index - 1].focus();
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const onfocusInput = (e) => {
    e.target?.children[0]?.focus();
  };

  return (
    <div className="otp-input flex">
      {otp.map((digit, index) => (
        <div
          className={'box ${focus === index ? "focus" : ""}'}
          key={index}
          onClick={onfocusInput}
        >
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
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputMode="numeric"
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;