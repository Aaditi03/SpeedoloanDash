import React, { useContext, useEffect, useState } from "react";
import { LoanCalculatorWrapper } from "./style";
import img from "../../images/loan_calculation.png";
import RangeSlider from "../RangeSlider/RangeSlider";
import principalIcon from '../../images/Principal.svg';
import emiIcon from '../../images/EMI.svg';
import paybleIcon from '../../images/Total payble.svg';
import { getStorage } from "../../Utils/common";
import Button from "../ui/Button";
import ContextDashboard from "../../Context/ContextDashboard";
import { calculateLoan, getDashboardData } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import Select from '../../components/ui/Select';
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const initialData = {
  loanPurpose: ""
};

const options = [
  { label: "Travel", value: "TRAVEL" },
  { label: "Medical", value: "MEDICAL" }, 
  { label: "Shopping", value: "SHOPPING" },
  { label: "Others", value: "OTHERS" },
];


function LoanCalculator() {
  const [principal, setPrincipal] = useState(5000);
  const [tenure, setTenure] = useState(40);
  const [emi, setEmi] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [formDataError, setFormDataError] = useState(initialData);
  const [showSteps, setShowSteps] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [progressBar, setProgressBar] = useState(0);
    
  const { message, setMessage, logout, getProfileDaital,setps } = useContext(ContextDashboard);
  const navigate = useNavigate();

  const submit = () => {
    const param = {
      lead_id: getStorage("lead_id") || "",
      token: getStorage("token") || "",
      tenure: tenure,
      purpose: formData.loanPurpose,
      loan_amount: principal,
    };
  
    setLoading(true);
    calculateLoan(param).then(resp => {
      setLoading(false);
  
      if (resp?.data?.Status === 1) {
        setMessage({ type: 'success', msg: resp?.data?.Message, place: "globle" });
        getProfileDaital();
        navigate("/my-dashboard/congratulations");
      } else if (resp?.data?.Status === 5) {
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

  useEffect(() => {
    const params = {
      lead_id: getStorage("lead_id") || "",
      token: getStorage("token") || "",
      mobile: getStorage("mobile") || "",
    };
  
    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        const dashboardData = resp?.data?.Steps?.data || {};
        if (dashboardData) {
          setFormData(prev => ({
            ...prev,
            loanPurpose: dashboardData.purpose || "", 
          }));
  
          if (dashboardData.loan_amount) {
            setPrincipal(dashboardData.loan_amount);
          }
          if (dashboardData.tenure) {
            setTenure(dashboardData.tenure);
          }
          setProgressBar(resp?.data?.Steps?.steps?.step_complete_percent);
        }
      } else if (resp?.data?.Status === 5) {
        logout();
      }
    });
  }, [logout]);

  return (
    <><br/>
    <ProgressBar value={`${progressBar}%`}>
          <div >
          
          </div>
         <></>
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
            <h2>Purpose of Loan <span style={{color:"red"}}>*</span></h2>
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
            <h2>Principal <span style={{color:"red"}}>*</span></h2>
            <span className="value">₹ {principal}</span>
          </div>
          <div className="center">
            <RangeSlider
              min="5000"
              step="500"
              max="100000"
              value={principal}
              setValue={setPrincipal}
            />
          </div>
        </div>
        <div className="box">
          <div className="flex space-between">
            <h2>Tenure <span style={{color:"red"}}>*</span></h2>
            <span className="value"> Tenure fixed for {tenure} Days</span>
          </div>
          <div className="center">
            <RangeSlider 
              min="7"
              step="1"
              max="40"
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
          {/* <div className="card">
            <div className="img">
              <img src={emiIcon} alt="icon" />
            </div>
            <div className="desc">
              <h3>EMI</h3>
              <h2>₹ {emi}</h2>
            </div>
          </div> */}
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
        <Button title={"Accept"} onClick={submit} loading={loading} />
        <Button title={"Reject"} loading={loading} />
      </div>
    </LoanCalculatorWrapper>
    </>
  );
}

export default LoanCalculator;
