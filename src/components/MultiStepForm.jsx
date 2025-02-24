import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../css/Common.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Cleave from "cleave.js/react";
import { useLocation } from "react-router-dom";

const steps = [
  "Mobile Number", 
  "Otp Verification",
  "PAN Details",
  "Personal Details",
  "Document Upload",
  "Completed",
];

export default function MultiStepForm(props) {
  const location = useLocation();

  // Create a URLSearchParams object to parse the query string
  const queryParams = new URLSearchParams(location.search);

  let utm_source = queryParams.get("utm_source");
  let utm_campaign = queryParams.get("utm_campaign");
  let utm_medium = queryParams.get("utm_medium");
  let utm_term = queryParams.get("utm_term");
  let utm_content = queryParams.get("utm_content");

  console.log({
    utm_source: utm_source,
    utm_campaign: utm_campaign,
    utm_medium: utm_medium,
    utm_term: utm_term,
    utm_content: utm_content,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [getCustnumber, setCustnumber] = useState("");
  const [getCustOtp, setCustOtp] = useState("");
  const [getPan, setPan] = useState("");
  // taslim

  const [getAadharfilef, setAadharfilef] = useState({});
  const [getAadharfileb, setAadharfileb] = useState({});
  const [getPanfile, setPanfile] = useState({});
  const [getBankstatement, setBankstatement] = useState({});
  const [getStatementpass, setStatementpass] = useState("");
  const [getLoading, setLoading] = useState(false);
  // const [getProfilephoto, setProfilephoto] = React.useState({});

  const [getLeadid, setLeadid] = useState("");

  const [getUploadstatAdf, setUploadstatAdf] = useState("");
  const [getUploadstatAdb, setUploadstatAdb] = useState("");
  const [getUploadstatpan, setUploadstatpan] = useState("");
  const [getUploadstatbank, setUploadstatbank] = useState("");

  const [getStateList, setStateList] = useState([{}]);

  const [getCityList, setCityList] = useState([{}]);
  const [getPincodeList, setPincodeList] = useState([{}]);

  const [getCustname, setCustname] = useState("");
  const [getPersoanlDetail, setPersoanlDetail] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(30); // 1 minute in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(false); // Controls if the button can be enabled
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxerror, setCheckboxError] = useState("");
  const [loanamounterror, setLoanAmountError] = useState("");
  const [salaryamounterror, setSalaryAmountError] = useState("");
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isTimerActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsTimerActive(false);
            setCanResendOTP(true); // Enable Resend OTP button when timer finishes
            return 30; // Reset timer to 30 seconds automatically
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNumber = (e) => {
    const value = e.target.value;

    // Ensure the input is numeric and has a maximum length of 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setCustnumber(value);
    }
  };

  const handleOTP = (e) => {
    const value = e.target.value;
    // Ensure the input is numeric and has a maximum length of 4
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCustOtp(value);
    }
  };

  const handlePAN = (e) => {
    const value = e.target.value.toUpperCase(); // Convert input to uppercase

    // Ensure the input follows the PAN format
    if (
      /^[A-Z]{0,5}$/.test(value.slice(0, 5)) &&
      /^[\d]{0,4}$/.test(value.slice(5, 9)) &&
      /^[A-Z]{0,1}$/.test(value.slice(9))
    ) {
      setPan(value);
    }
  };
  const cookies = new Cookies();
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const otp_resend = async () => {
    const resp = await fetch(`https://crif.salaryontime.in/newLead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        mobile: getCustnumber,
        utm_source: utm_source,
        utm_campaign: utm_campaign,
        utm_medium: utm_medium,
        utm_term: utm_term,
        utm_content: utm_content,
      }),
    });
    console.log(resp.status);
    if (resp.status == 200) {
      const dataset = await resp.json();
      if (dataset.Status == 1) {
        setLoading(false);

        // start otp timer

        setLeadid(dataset.lead_id);
        props.showmessage(dataset.Message);
      } else {
        setLoading(false);
        props.showmessage(dataset.Message);
      }
    } else {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (canResendOTP) {
      setIsVisible(true);
      otp_resend();
      setTime(30);
      setTimeout(() => {
        setIsVisible(false); // Hide the div after 10 seconds
      }, 10000); // 10,000 milliseconds = 10 seconds
      setIsTimerActive(true);
      setCanResendOTP(false); // Disable Resend OTP button while timer is running
    }
  };

  const get_state_list = async () => {
    try {
      const resp = await fetch("https://crif.salaryontime.in/masterdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          apiname: "getstate",
          id: "",
        }),
      });
      const dataset = await resp.json();
      setStateList(dataset.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_city_list = async (id) => {
    try {
      const resp = await fetch("https://crif.salaryontime.in/masterdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          apiname: "getcity",
          id: id,
        }),
      });
      const dataset = await resp.json();
      setCityList(dataset.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_pincode = async (id) => {
    try {
      const resp = await fetch("https://crif.salaryontime.in/masterdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          apiname: "getpincode",
          id: id,
        }),
      });
      const dataset = await resp.json();
      setPincodeList(dataset.data);
    } catch (error) {
      console.log(error);
    }
  };

  const update_personal_info = async () => {
    try {
      const resp = await fetch("https://crif.salaryontime.in/personaldetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          lead_id: getLeadid,
          // dob: ,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    // newSkipped = new Set(newSkipped.values());
    // newSkipped.delete(activeStep);
    // }
    // setSkipped(newSkipped);
    if (activeStep == 0) {
      if (!isChecked) {
        setCheckboxError(
          "Please check the checkbox to accept our terms and conditions"
        );
        setTimeout(() => {
          setCheckboxError("");
        }, 10000);
      } else {
        setLoading(true);
        setTime(30);
        setIsTimerActive(true);
        setCanResendOTP(false);
        const resp = await fetch(`https://crif.salaryontime.in/newLead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            mobile: getCustnumber,
            utm_source: utm_source,
            utm_campaign: utm_campaign,
            utm_medium: utm_medium,
            utm_term: utm_term,
            utm_content: utm_content,
          }),
        });
        console.log(resp.status);
        if (resp.status == 200) {
          const dataset = await resp.json();
          if (dataset.Status == 1) {
            setLoading(false);

            // start otp timer

            setLeadid(dataset.lead_id);
            props.showmessage(dataset.Message);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } else {
            setLoading(false);
            props.showmessage(dataset.Message);
          }
        } else {
          setLoading(false);
        }
      }
    } else if (activeStep == 1) {
      setLoading(true);
      const resp = await fetch(`https://crif.salaryontime.in/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          mobile: getCustnumber,
          lead_id: getLeadid,
          otp: getCustOtp,
        }),
      });
      if (resp.status == 200) {
        const dataset = await resp.json();
        if (dataset.Status == 1) {
          if (dataset.data.pan_verification === "PENDING") {
            setLoading(false);
            props.showmessage(dataset.Message);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } else if (dataset.data.pan_verification === "DONE") {
            if (dataset.data.personal_details === "PENDING") {
              setLoading(false);
              props.showmessage(dataset.Message);
              setActiveStep((prevActiveStep) => prevActiveStep + 2);
            } else if (dataset.data.personal_details === "DONE") {
              if (dataset.data.documents_uploads === "PENDING") {
                setLoading(false);
                props.showmessage(dataset.Message);
                setActiveStep((prevActiveStep) => prevActiveStep + 3);
              } else if (dataset.data.documents_uploads === "DONE") {
                setLoading(false);
                props.showmessage(dataset.Message);
                setActiveStep((prevActiveStep) => prevActiveStep + 4);
              }
            }
          }
        } else {
          props.showmessage(dataset.Message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else if (activeStep == 2) {
      setLoading(true);
      const resp = await fetch(`https://crif.salaryontime.in/verifyPAN`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          lead_id: getLeadid,
          panNumber: getPan,
        }),
      });
      if (resp.status == 200) {
        const dataset = await resp.json();
        if (dataset.Status == 1) {
          setLoading(false);
          props.showmessage(dataset.Message);
          setCustname(dataset.name);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (dataset.Status == 3) {
          setLoading(false);
          // props.showmessage(dataset.Message);
          // setCustname(dataset.name);
          // setActiveStep((prevActiveStep) => prevActiveStep + 1);
          //call final function here
          setActiveStep(5);
        } else {
          setLoading(false);
          props.showmessage(dataset.Message);
        }
      } else {
        setLoading(false);
      }
    } else if (activeStep == 3) {
      setLoading(true);
      const resp = await fetch(`https://crif.salaryontime.in/personaldetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          lead_id: getLeadid,
          ...getPersoanlDetail,
        }),
      });
      if (resp.status == 200) {
        const dataset = await resp.json();
        if (dataset.Status == 1) {
          setLoading(false);
          props.showmessage(dataset.Message);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          setLoading(false);
          props.showmessage(dataset.Message);
        }
      } else {
        setLoading(false);
      }
    } else if (activeStep == 4) {
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      let i = 0;
      try {
        setUploadstatAdf("loading");
        const resp = await fetch(
          `https://crif.salaryontime.in/documentUpload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              ...getAadharfilef,
            }),
          }
        );
        if (resp.status == 200) {
          const dataset = await resp.json();
          if (dataset.Status == 1) {
            setUploadstatAdf("success");
            i++;
            console.log("uploaded af");
          } else {
            setUploadstatAdf("fail");
          }
        } else {
          setUploadstatAdf("fail");
        }
      } catch (error) {
        setUploadstatAdf("fail");
      }
      try {
        setUploadstatAdb("loading");
        const resp1 = await fetch(
          `https://crif.salaryontime.in/documentUpload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              ...getAadharfileb,
            }),
          }
        );
        if (resp1.status == 200) {
          const dataset1 = await resp1.json();
          if (dataset1.Status == 1) {
            setUploadstatAdf("success");
            i++;
            console.log("uploaded ab");
          } else {
            setUploadstatAdb("fail");
          }
        } else {
          setUploadstatAdb("fail");
        }
      } catch (error) {
        setUploadstatAdb("fail");
      }
      try {
        setUploadstatpan("loading");
        const resp2 = await fetch(
          `https://crif.salaryontime.in/documentUpload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              ...getPanfile,
            }),
          }
        );
        if (resp2.status == 200) {
          const dataset2 = await resp2.json();
          if (dataset2.Status == 1) {
            setUploadstatpan("success");
            i++;
            console.log("uploaded pan");
          } else {
            setUploadstatpan("fail");
          }
        } else {
          setUploadstatpan("fail");
        }
      } catch (error) {
        setUploadstatpan("fail");
      }
      try {
        setUploadstatbank("loading");
        const resp3 = await fetch(
          `https://crif.salaryontime.in/documentUpload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              ...getBankstatement,
              password: getStatementpass,
            }),
          }
        );
        if (resp3.status == 200) {
          const dataset3 = await resp3.json();
          if (dataset3.Status == 1) {
            setUploadstatbank("success");
            i++;
            console.log("uploaded statement");
          } else {
            setUploadstatbank("fail");
          }
        } else {
          setUploadstatbank("fail");
        }
      } catch (error) {
        setUploadstatbank("fail");
      }
      if (i == 4) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const callaadharf = async (e) => {
    console.log(e);
    const arr = e.target.files[0].name.split(".");
    const sizearr = arr.length;
    const dataset = `${await toBase64(e.target.files[0])}`;
    const setme = {
      lead_id: getLeadid,
      docs_id: "1",
      ext: arr[sizearr - 1],
      file: dataset.split(",")[1],
      password: "",
    };
    setAadharfilef(setme);
  };

  const callaadharb = async (e) => {
    console.log(e);
    const arr = e.target.files[0].name.split(".");
    const sizearr = arr.length;
    const dataset = `${await toBase64(e.target.files[0])}`;
    const setme = {
      lead_id: getLeadid,
      docs_id: "2",
      ext: arr[sizearr - 1],
      file: dataset.split(",")[1],
      password: "",
    };
    setAadharfileb(setme);
  };

  const callpan = async (e) => {
    console.log(e);
    const arr = e.target.files[0].name.split(".");
    const sizearr = arr.length;
    const dataset = `${await toBase64(e.target.files[0])}`;
    const setme = {
      lead_id: getLeadid,
      docs_id: "4",
      ext: arr[sizearr - 1],
      file: dataset.split(",")[1],
      password: "",
    };
    setPanfile(setme);
  };

  // const callprofile = async (e) => {
  //   console.log(e);
  //   const arr = e.target.files[0].name.split(".");
  //   const sizearr = arr.length;
  //   const dataset = `${await toBase64(e.target.files[0])}`;
  //   const setme = {
  //     type: "profile_photo",
  //     ext: arr[sizearr - 1],
  //     data: dataset.split(",")[1],
  //     password: "",
  //   };
  //   setProfilephoto(setme);
  // };

  const callbankstatment = async (e) => {
    console.log(e);
    const arr = e.target.files[0].name.split(".");
    const sizearr = arr.length;
    const dataset = `${await toBase64(e.target.files[0])}`;
    const setme = {
      lead_id: getLeadid,
      docs_id: "6",
      ext: arr[sizearr - 1],
      file: dataset.split(",")[1],
    };
    setBankstatement(setme);
  };

  React.useEffect(() => {
    get_state_list();
    // get_years()
    // get_master_religion()
  }, [""]);

  const PopupLoading = (props) => {
    if (props.getLoading !== "") {
      var class1;
      var class2;
      var labelval;
      var icon;
      if (props.getLoading === "loading") {
        class1 = "loader-item loader-1";
        class2 = "material-icons loader-check-icon";
        labelval = "Uploading";
      }
      if (props.getLoading === "success") {
        class1 = "loader-item loader-1 loader-success-completed";
        class2 = "material-icons loader-check-icon loader-check-icon-completed";
        labelval = "Uploaded";
        icon = "check";
      }
      if (props.getLoading === "fail") {
        class1 = "loader-item loader-1 loader-failure-completed";
        class2 =
          "material-icons loader-check-icon loader-failure-icon-completed";
        labelval = "Failed";
        icon = "clear";
      }
      return (
        <>
          <div className="superparentPopup" onClick={(e) => {}}></div>
          <div
            className="superchildPopup loadingpopup"
            style={{ width: "30%", height: "20%" }}
          >
            <div className="loader-wrapper">
              <div className={class1}>
                <i className={class2}>{icon}</i>
              </div>
              <div>
                <label>{labelval}</label>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  // checkbox validation

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setCheckboxError("");
    }
  };

  // loan amount validation
  const handleLoanAmount = (e) => {
    // setPersoanlDetail({
    //   ...getPersoanlDetail,
    //   [e.target.name]: e.target.value,
    // });

    const newValue = e.target.value;

    // Ensure the value is numeric
    if (!/^\d*$/.test(newValue)) {
      setLoanAmountError("Only numeric values are allowed.");
      setPersoanlDetail({
        ...getPersoanlDetail,
        [e.target.name]: newValue,
      });
    }

    // Convert the value to a number for validation
    const numericValue = parseInt(newValue, 10);

    // Validate the numeric value
    if (numericValue < 5000) {
      setLoanAmountError("We don't provide loan less than 5000");
    } else if (numericValue > 100000) {
      setLoanAmountError("We don't provide loan  more than 100000");
    } else {
      setLoanAmountError("");
    }

    // Set the input value if it's numeric
    setPersoanlDetail({
      ...getPersoanlDetail,
      [e.target.name]: newValue,
    });
  };

  // salary amount validation
  const handleSalaryAmount = (e) => {
    // setPersoanlDetail({
    //   ...getPersoanlDetail,
    //   [e.target.name]: e.target.value,
    // })

    const newValue = e.target.value;

    // Ensure the value is numeric
    if (!/^\d*$/.test(newValue)) {
      setSalaryAmountError("Only numeric values are allowed.");
      setPersoanlDetail({
        ...getPersoanlDetail,
        [e.target.name]: newValue,
      });
    }

    // Convert the value to a number for validation
    const numericValue = parseInt(newValue, 10);

    // Validate the numeric value
    if (numericValue <= 25000) {
      setSalaryAmountError("Monthly salary should be above 25000");
    } else {
      setSalaryAmountError("");
    }

    // Set the input value if it's numeric
    setPersoanlDetail({
      ...getPersoanlDetail,
      [e.target.name]: newValue,
    });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps  = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            // labelProps.optional = (
            //   // <Typography variant="caption">Optional</Typography>
            // );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="flex flex-center justify-center full-width mt50">
            <Typography sx={{ mt: 2, mb: 1 }} className="completion_note">
              <div className="form_container">
                <div className="title">
                  <h2>Thank you! Waiting for Approval</h2>
                </div>
                <div className="thankyou_message mt20">
                  <p>
                    Congratulations! Your loan application with SalaryOnTime has
                    been received. Please wait while we process your
                    application. Till then, for any queries, you can contact us
                    anytime
                  </p>
                </div>
              </div>
            </Typography>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 5,
              justifyContent: "center",
            }}
          >
            <Box />
            {/* <Button onClick={handleReset} className="defaultbtnstyle">
              Back to Step 1
            </Button> */}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 0 && (
            <>
              <div className="form_container">
                <p className="note">
                  Enter your 10 digit mobile number to get started
                </p>
                <div className="row flex justify-center gap_30 ">
                  <div className="form_item mobile_number">
                    <label htmlFor="">Enter your mobile number *</label>
                    <input
                      type="text"
                      value={getCustnumber}
                      onChange={handleNumber}
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="agreement mt10">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <p>
                    To process with your loan application, kindly confirm your
                    acceptance of our{" "}
                    <Link to="/termsandconditions">Terms and Conditons</Link>,{" "}
                    <Link to="/privacypolicy">Privacy Policy</Link>, and your
                    consent to fetch your cibil score
                  </p>
                </div>
                <div className="checkbox_error_container">
                  {checkboxerror && (
                    <span className="error">{checkboxerror}</span>
                  )}
                </div>
              </div>
            </>
          )}
          {activeStep === 1 && (
            <>
              <div className="form_container">
                <p className="note">Enter the 4 digit otp for verification</p>
                <div className="row">
                  <div className="form_item mobile_number">
                    <label htmlFor="">
                      Please enter the otp you have received *
                    </label>
                    <input
                      type="text"
                      value={getCustOtp}
                      onChange={handleOTP}
                      maxLength={4}
                    />
                    <div className="otp_resend">
                      {isVisible && (
                        <div className="otp_resent_alert">
                          <span>OTP has been resent</span>
                        </div>
                      )}

                      <span>
                        Didn't receive the otp ? &nbsp;{" "}
                        <span style={{ color: "red" }}>{formatTime(time)}</span>
                        <button
                          onClick={handleResendOTP}
                          disabled={!canResendOTP}
                          className="resend_otp"
                        >
                          Resend OTP
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeStep === 3 && (
            <>
              <div className="form_container">
                <div className="individual_details_row">
                  <div className="individual_details_item">
                    <label htmlFor="">Name *</label>
                    <input type="text" value={getCustname} />
                  </div>
                  <div className="individual_details_item">
                    <label htmlFor="">Email *</label>
                    <input
                      name="email"
                      type="text"
                      onChange={(e) => {
                        setPersoanlDetail({
                          ...getPersoanlDetail,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="individual_details_row">
                  <div className="individual_details_item">
                    <label htmlFor="">Date of Birth *</label>
                    {/* yyyy-mm-dd */}
                    <Cleave
                      type="text"
                      placeholder="yyyy-mm-dd"
                      name="dob"
                      options={{
                        date: true,
                        delimiter: "-",
                        datePattern: ["Y", "m", "d"],
                      }}
                      onChange={(e) => {
                        setPersoanlDetail({
                          ...getPersoanlDetail,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="individual_details_item">
                    <label htmlFor="">State *</label>
                    <select
                      name="state_id"
                      id=""
                      onChange={(e) => {
                        get_city_list(e.target.value);
                        setPersoanlDetail({
                          ...getPersoanlDetail,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      <option value={""}>Select State</option>
                      {getStateList.map((e, index) => {
                        return <option value={e.id}>{e.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="individual_details_row">
                  <div className="individual_details_item">
                    <label htmlFor="">City *</label>
                    <select
                      name="city_id"
                      id=""
                      onChange={(e) => {
                        get_pincode(e.target.value);
                        setPersoanlDetail({
                          ...getPersoanlDetail,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      <option value={""}>Select City</option>
                      {getCityList.map((e, index) => {
                        return (
                          <option value={e.m_city_id}>{e.m_city_name}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="individual_details_item">
                    <label htmlFor="">Pincode *</label>
                    <select
                      name="pincode"
                      id=""
                      onChange={(e) => {
                        setPersoanlDetail({
                          ...getPersoanlDetail,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      <option value={""}>Select Pincode</option>
                      {getPincodeList.map((e, index) => {
                        return <option value={e.name}>{e.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="individual_details_row">
                  <div className="individual_details_item">
                    <label htmlFor="">Loan Amount *</label>
                    <input
                      type="text"
                      name="loan_amount"
                      onChange={handleLoanAmount}
                    />
                    <span className="error absolute">{loanamounterror}</span>
                  </div>
                  <div className="individual_details_item">
                    <label htmlFor="">Salary (Monthly)*</label>
                    <input
                      type="text"
                      name="monthly_salary_amount"
                      onChange={handleSalaryAmount}
                    />
                    <span className="error absolute">{salaryamounterror}</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeStep === 4 && (
            <>
              <div className="form_container">
                <p className="note">Upload Documents</p>

                <div className="row personal_details_row">
                  <div className="form_item mobile_number">
                    <label className="custom_file_upload">
                      Aadhar Front
                      <input
                        type="file"
                        onChange={(e) => {
                          callaadharf(e);
                        }}
                        required
                        className="Enter Email"
                      />
                    </label>

                    <PopupLoading getLoading={getUploadstatAdf} />
                  </div>
                  <div className="form_item mobile_number">
                    <label>
                      Aadhar Back
                      <input
                        type="file"
                        onChange={(e) => {
                          callaadharb(e);
                        }}
                        required
                        className="Enter name"
                      />
                    </label>
                    <PopupLoading getLoading={getUploadstatAdb} />
                  </div>
                </div>
                <div className="row personal_details_row">
                  {/* <div className="form_item mobile_number">
                    <label>Profile Photo</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        callprofile(e);
                      }}
                      required
                      className="date of birth"
                    />
                  </div> */}
                  <div className="form_item mobile_number">
                    <label>
                      PAN
                      <input
                        type="file"
                        onChange={(e) => {
                          callpan(e);
                        }}
                        required
                        className="Enter your city"
                      />
                    </label>
                    <PopupLoading getLoading={getUploadstatpan} />
                  </div>
                  <div className="form_item mobile_number">
                    <label>
                      Bank Statement
                      <input
                        type="file"
                        onChange={(e) => {
                          callbankstatment(e);
                        }}
                        required
                        className="Enter Loan Amount"
                      />
                    </label>
                    <PopupLoading getLoading={getUploadstatbank} />
                  </div>
                </div>
                <div className="row personal_details_row">
                  <div
                    className="form_item mobile_number"
                    style={{ marginTop: "33px" }}
                  >
                    <label>Bank Statement password (if any)</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setStatementpass(e.target.value);
                      }}
                      required
                      className="Enter PIN Code"
                    />
                  </div>
                </div>
                <div className="row personal_details_row">
                  {/* <div className="form_item mobile_number">
                    <label>Salary Slip</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        console.log(e);
                      }}
                      required
                      className="Enter Loan Amount"
                    />
                  </div> */}
                  {/* <div className="form_item mobile_number">
                    <label>Bank Statement password (if any)</label>
                    <input type="text" onChange={(e) => { console.log(getBankstatement); setBankstatement({ ...getBankstatement, password: e.target.value }) }} required className="Enter PIN Code" />
                  </div> */}
                </div>
              </div>
            </>
          )}
          {activeStep === 2 && (
            <>
              <div className="form_container">
                <p className="note">Please enter your PAN Details</p>
                <div className="row mt30 justify-center">
                  <div className="form_item mobile_number">
                    <label htmlFor="">Enter your PAN No *</label>
                    <input
                      type="text"
                      value={getPan}
                      onChange={handlePAN}
                      required
                      maxLength={10}
                    />
                  </div>
                  {/* <div
                    className="form_item mobile_number"
                    style={{ marginTop: "20px" }}
                  >
                      <label htmlFor="">Valid till *</label>
                    <input type="text" required placeholder="dd/mm/yyyy" />
                  </div> */}
                </div>
              </div>
            </>
          )}

          {activeStep === 5 && (
            <>
              <div className="form_container">
                <div className="title">
                  <h2>Thank you! Waiting for Approval</h2>
                </div>
                <div className="thankyou_message mt20">
                  <p>
                    Congratulations! Your loan application with SalaryOnTime has
                    been received. Please wait while we process your
                    application. Till then, for any queries, you can contact us
                    anytime
                  </p>
                </div>
              </div>
            </>
          )}

          <Box className="form_button_container">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              className={
                activeStep === 0
                  ? "none"
                  : activeStep === 5
                  ? "hidden"
                  : "block"
              }
            >
              Previous Step
            </Button>
            <Box />
            {/* {isStepOptional(activeStep) && (
              <Button
                color="inherit"
                onClick={handleSkip}
                sx={{ mr: 1 }}
                className="defaultbtnstyle"
              >
                Skip
              </Button>
            )} */}
            <Button
              onClick={handleNext}
              className={activeStep === 5 ? "hidden" : "defaultbtnstyle"}
            >
              {getLoading == true ? (
                <div className="loadinganim"></div>
              ) : activeStep === 0 ? (
                "Get Otp "
              ) : activeStep === 1 ? (
                "Submit and Proceed"
              ) : activeStep === 2 ? (
                "Submit and Proceed"
              ) : activeStep === 3 ? (
                "Submit and Proceed"
              ) : activeStep === 4 ? (
                "Complete Application"
              ) : (
                ""
              )}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
