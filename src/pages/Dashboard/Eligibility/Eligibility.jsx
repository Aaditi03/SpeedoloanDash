import React, { useContext, useEffect, useState } from "react";



import c1icon from "../../../images/c1.png";
import c2icon from "../../../images/c2.png";
import c3icon from "../../../images/c3.png";
import c4icon from "../../../images/c4.png";
import c5icon from "../../../images/c5.png";
import banner from "../../../images/bannerimg2.png";
import play from "../../../images/play-circle.png";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { getStorage, isEmpty } from "../../../Utils/common";
import ContextDashboard from "../../../Context/ContextDashboard";
import { DashboardWrapper } from "../style";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import DashboardCard2 from "../DashboardCard2";

const cardList = [
  
  {
    heading: "Upload Your aadhar",
    desc: "Share your aadhar to verify your details",
    img: c4icon,
    complate: false,
    link: "/my-dashboard/aadhar-upload",
  },
  {
    heading: "Upload Your PAN",
    desc: "Share your PAN to verify your details",
    img: c4icon,
    complate: false,
    link: "/my-dashboard/pan-upload",
  },
  // {
  //   heading: "eKYC Verification",
  //   desc: "Authenticate yourself using eKYC",
  //   img: c2icon,
  //   complate: false,
  //   link: "/my-dashboard/kyc",
  // },
  {
    heading: "Upload Bank Statement",
    desc: "Share your bank statements.",
    img: c3icon,
    complate: false,
    link: "/my-dashboard/bank-upload",
  },
  {
    heading: "Upload Salary Slip",
    desc: "Share your salary slip.",
    img: c4icon,
    complate: false,
    link: "/my-dashboard/upload-salaryslip",
  },
  {
    heading: "Upload Utility Bill",
    desc: "Share your utility bill.",
    img: c4icon,
    complate: false,
    link: "/my-dashboard/upload-utilitybill",
  },
  {
    heading: "Employment Information",
    desc: "Share about your work status.",
    img: c2icon,
    complate: false,
    link: "/my-dashboard/about-your-company",
  },
  {
    heading: "Loan Calculator",
    desc: "Choose the loan amount and tenure.",
    img: c1icon,
    complate: true,
    link: "/my-dashboard/calculate-loan",
  }
  
 
];



function Eligibility() {
  const [cards, setCards] = useState(cardList);
  const [stepComplate, setStepComplate] = useState(false);
  const [showSteps, setShowSteps] = useState(-1);
  const [toggle, setToggle] = useState(true);
  const [progressBar,setProgressBar] = useState("0")
  const {setps} = useContext(ContextDashboard);

  const navigate = useNavigate();
  const {message,setMessage,setProfileData,profileData} = useContext(ContextDashboard);

  const redirect = (data) =>{
    console.log(data);
    navigate(data.link)
  }

  const showSteps_ = ()=>{

   setToggle(!toggle)
  }
  

  useEffect(()=>{
    console.log("setps",setps)
    if(!isEmpty(setps)){
      checkStep(setps);
    }
   
  },[setps]);

function checkStep(data){
 
      setProgressBar(data?.step_complete_percent);
      const steps = (data?.step_stage - 1) ;
      if(data?.step_complete_percent === 100){
        setToggle(false)
      }
      setShowSteps(steps);
      
     
  
  }


useEffect(()=>{
  setCards([
    
    {
      heading: "Upload Your aadhar",
      desc: "Share your aadhar to verify your details",
      img: c4icon,
    complate:setps?.documents_uploads === "DONE",
      link: "/my-dashboard/adhar-upload",
    },
    {
      heading: "Upload Your PAN",
      desc: "Share your PAN to verify your details",
      img: c4icon,
      complate:setps?.documents_uploads === "DONE",
      link: "/my-dashboard/pan-upload",
    },
    // {
    //   heading: "eKYC Verification",
    //   desc: "Authenticate yourself using eKYC",
    //   img: c2icon,
    //   complate: false,
    //   link: "/my-dashboard/kyc",
    // },
    {
      heading: "Upload Your Bank Statements",
      desc: "Share your bank statements.",
      img: c4icon,
      complate:setps?.documents_uploads === "DONE",
      link: "/my-dashboard/bank-upload",
    },
    {
      heading: "Upload Salary Slip",
      desc: "Share your salary slip.",
      img: c4icon,
      complate:setps?.documents_uploads === "DONE",
      link: "/my-dashboard/upload-salaryslip",
    },
    {
      heading: "Upload Utility Bill",
      desc: "Share your utility bill.",
      img: c4icon,
      complate:setps?.documents_uploads === "DONE",
      link: "/my-dashboard/upload-utilitybill",
    },
    {
      heading: "Employment Information",
      desc: "Share about your work status.",
      img: c2icon,
      complate:setps?.company_info === "DONE",
      link: "/my-dashboard/about-your-company",
    },
    {
      heading: "Loan Calculator",
      desc: "Choose the loan amount and tenure.",
      img: c1icon,
      complate:setps?.loan_cal === "DONE",
      link: "/my-dashboard/calculate-loan",
    }
    
  ])
},[setps])

  return (
    <DashboardWrapper>
      <ProgressBar value={`${progressBar}%`}>
        {!stepComplate ? (
          <div >
            
          </div>
        ) : <></>}
      </ProgressBar>

     {<div className="carde">
        {cards.map((value, index) => {
          return (
            <DashboardCard2
            number={index + 1}
              heading={value.heading}
              desc={value.desc}
              img={value.img}
               complate={value.complate}
              disable={false}
              key={index}
              onClick={() =>redirect(value)}
            />
          );
        })}
       <div className="hideMD"></div>
      </div>
      
      }
      
    </DashboardWrapper>
  );
}

export default Eligibility;