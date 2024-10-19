import React, { useContext, useEffect, useState } from "react";
import { LoanCalculatorWrapper } from "./style";
import img from "../../images/loan_calculation.png";
import RangeSlider from "../RangeSlider/RangeSlider";
import principalIcon from '../../images/Principal.svg';
import emiIcon from '../../images/EMI.svg';
import paybleIcon from '../../images/Total payble.svg';
import { getStorage,setStorage } from "../../Utils/common";
import Button from "../ui/Button";
import ContextDashboard from "../../Context/ContextDashboard";
import { calculateLoan, generateLoan } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import Select from '../../components/ui/Select';
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const initialData = {
  loanPurpose: ""
};

const options = [
  { label: "Travel", value: "1" },
  { label: "Medical", value: "2" }, 
  { label: "Shopping", value: "3" },
  { label: "Others", value: "4" },
];

function LoanCalculator() {
  const [principal, setPrincipal] = useState(5000);
  const [tenure, setTenure] = useState(40);
  const [emi, setEmi] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [formDataError, setFormDataError,] = useState(initialData);
  const [showSteps, setShowSteps] = useState(-1);
  const [toggle, setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState(getStorage("step_percent"));
  const [loanData, setLoanData] = useState([]);
    
  const { message, setMessage, logout, getProfileDaital, setps } = useContext(ContextDashboard);
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "", 
      event_name: "generate_loan_quote"
    };
    generateLoan(params).then(resp => {
      if (resp?.data?.Status === 1) {
        setLoanData(resp?.data?.Data);
      }
    });
  }, []);

  const submit = (acceptedId) => {
    const param = {
      profile_id: getStorage("cust_profile_id") || "", 
      event_name: "loan_quotation_decision",
      tenure: tenure,
      purpose_id: formData.loanPurpose,
      amount: principal,
      accepted_id: acceptedId // Pass the accepted_id here
    };
  
    setLoading(true);
    calculateLoan(param).then(resp => {
      setLoading(false);
  
      if (resp?.data?.Status === 1) {
        setStorage("next_step",resp?.data?.Data?.next_step)
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "global" });
        // getProfileDaital();
        navigate("/my-dashboard/about-your-company");
      } else if (resp?.data?.Status === 4) {
        logout();
      } else {
        setMessage({ type: 'error', msg: resp?.data?.Message });
      }
    });
  };

  const onChange = (e) => {
    let { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });
    setFormDataError({ ...formDataError, [name]: "" });
  };

  useEffect(() => {
    let si = (principal * tenure) / 100;
    setEmi(si);
  }, [principal, tenure]);

  return (
    <>
      <br />
      <ProgressBar value={`${progressBar}%`}>
        <div></div>
      </ProgressBar>
    
      <LoanCalculatorWrapper className="flex">
        <div className="left">
          <div>
            <p>
              WE HAVE CALCULATED YOUR LOAN ELIGIBILITY BASED ON THE GIVEN DETAILS
              PLEASE CHOOSE THE LOAN AMOUNT AND TENURE AS PER YOUR REQUIREMENTS.
            </p>
          </div>
        </div>
        <div className="right">
          <div className="box">
            <div className="flex space-between">
              <h2>Purpose of Loan <span style={{color: "red"}}>*</span></h2>
            </div>
            <div className="center">
              <Select
                className="selectLoanPurpose"
                name="loanPurpose"
                placeholder="--select--"
                error={formDataError?.loanPurpose}
                onChange={onChange}
                value={formData.loanPurpose} 
                options={options}
              />
            </div>
          </div>
          <div className="box">
            <div className="flex space-between">
              <h2>Principal <span style={{color: "red"}}>*</span></h2>
              <span className="value">₹ {principal}</span>
            </div>
            <div className="center">
              <RangeSlider
                min={loanData?.min_loan_amount}
                step="500"
                max={loanData?.max_loan_amount}
                value={principal}
                setValue={setPrincipal}
              />
            </div>
          </div>
          <div className="box">
            <div className="flex space-between">
              <h2>Tenure <span style={{color: "red"}}>*</span></h2>
              <span className="value"> Tenure fixed for {tenure} Days</span>
            </div>
            <div className="center">
              <RangeSlider 
                min={loanData?.min_loan_tenure}
                step="1"
                max={loanData?.max_loan_tenure}
                value={tenure}
                setValue={setTenure}
              />
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <div className="img">
                <img src={principalIcon} alt="icon" />
              </div>
              <div className="desc">
                <h3>PRINCIPAL</h3>
                <h2>₹ {principal}</h2>
              </div>
            </div>
            <div className="card">
              <div className="img">
                <img src={paybleIcon} alt="icon" />
              </div>
              <div className="desc">
                <h3>TOTAL PAYABLE</h3>
                <h2>₹ {Number(principal) + Number(emi)}</h2>
              </div>
            </div>
          </div>
          <Button title={"Accept"} onClick={() => submit("1")} loading={loading} />
          <Button title={"Reject"} onClick={() => submit("2")} loading={loading} />
        </div>
      </LoanCalculatorWrapper>
    </>
  );
}

export default LoanCalculator;
