import React, { useContext, useEffect, useState, useRef } from 'react';
import { BoxWrapper } from '../../../style';
import arrowIcon from "../../../images/arrow.png";
import PanInput from '../../../components/OtpInput/PanInput';
import { FormWrapper } from '../../../components/loan/style';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import { verifyPan, getDashboardData } from '../../../Utils/api'; // Import getDashboard
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { getStorage, goBack, setStorage, isEmpty } from '../../../Utils/common';
import { regexPan } from '../../../Utils/formValidation';
import ContextDashboard from '../../../Context/ContextDashboard';
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

const initialData = {
  monthlyIncome: "",
  loanamount: "",
};

function PanDetails() {
  const [pan, setPan] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [showSteps, setShowSteps] = useState(-1);
  const [toggle, setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState("0");
  const { setps } = useContext(ContextDashboard);
  const [formData, setFormData] = useState(initialData);
  const inputRefs = useRef([]);
  const [formDataError, setFormDataError] = useState(initialData);

  const navigate = useNavigate();
  const { message, setMessage, logout } = useContext(ContextDashboard);

  const submit = () => {
    let panData = pan?.join("").toUpperCase();

    // Check if the salary is less than 25000
    if (parseFloat(formData.monthlyIncome) < 25000) {
      setMessage({ type: 'error', msg: "Salary must be greater than 25,000." });
      return;
    }

    if (!regexPan.test(panData)) {
      setMessage({ type: 'error', msg: "Please enter a valid PAN number" });
      return;
    }

    const param = {
      lead_id: getStorage("lead_id") || "",
      panNumber: panData,
      token: getStorage("token") || "",
      monthly_salary_amount: formData.monthlyIncome,  
      loan_amount: formData.loanamount,              
    };

    setLoading(true);
    verifyPan(param).then(resp => {
      setLoading(false);
      if (resp?.data?.Status === 1) {
        setStorage("pancard", panData);
        setResponse(resp?.data);
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });

        // Call getDashboard API
        getDashboardData({ token: getStorage("token") || "", lead_id: getStorage("lead_id") || "", mobile: getStorage("mobile") || "" }).then(dashboardResp => {
          const userType = dashboardResp?.data?.Steps?.data.user_type;

          // Navigate based on user_type
          if (userType === 'REPEAT' || userType === 'UNPAID-REPEAT') {
            navigate("/my-dashboard/profile-preview");
          } else {
            navigate("/my-dashboard/captur-personal-information");
          }
        }).catch(error => {
          // Handle error for getDashboard API
          setMessage({ type: 'error', msg: "Failed to retrieve dashboard information." });
        });
      } else if (resp?.data?.Status === 5) {
        logout();
      } else {
        setPan(["", "", "", "", "", "", "", "", "", ""]); 
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus(); 
        }
        setMessage({ type: 'error', msg: resp?.data?.Message });
      }
    });
  };

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormDataError({ ...formDataError, [name]: "" });
  };

  const showSteps_ = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (!isEmpty(setps)) {
      checkStep(setps);
    }
  }, [setps]);

  function checkStep(data) {
    setProgressBar(data?.step_complete_percent);
    const steps = data?.step_stage - 1;
    if (data?.step_complete_percent === 100) {
      setToggle(false);
    }
    setShowSteps(steps);
  }

  return (
    <>
      <ProgressBar value={`${progressBar}%`}>
        <div></div>
        <></>
      </ProgressBar><br />
      <BoxWrapper className="w100">
        <div className="formmainBox flex">
          <div className="left">
            <div className='center gap4 pointer' onClick={() => goBack(navigate, "/my-dashboard/")}>
              <img src={arrowIcon} alt="" /> <span>Back</span>
            </div>
          </div>
          <div className="right">
            <h2>PAN Authentication <span style={{color:'red'}}>*</span></h2>
            <p>Please enter your PAN Card number. Your identity is secure with us.</p>

            <FormWrapper>
              <Alert setMessage={setMessage} message={message} />
              <div className="inputBox panBox">
                <PanInput
                  type="text"
                  setOtp={setPan}
                  otp={pan}
                  isDisable={false}
                  placeholder="*"
                  number={false}
                  inputRefs={inputRefs}
                />
              </div>
              <br />
              <Input
                label="Salary"
                name="monthlyIncome"
                error={formDataError?.monthlyIncome}
                onChange={onChange}
                value={formData?.monthlyIncome}
                required={true}
                type='number'
              />
              <br />
              <Input
                label="Required Loan Amount"
                name="loanamount"
                error={formDataError?.loanamount}
                onChange={onChange}
                value={formData?.loanamount}
                required={true}
                type='number'
              />
              <div className="button">
                <Button title="Continue" onClick={submit} loading={loading} disabled={parseFloat(formData.monthlyIncome) < 25000} />
              </div>
            </FormWrapper>
          </div>
        </div>
      </BoxWrapper>
    </>
  );
}

export default PanDetails;
