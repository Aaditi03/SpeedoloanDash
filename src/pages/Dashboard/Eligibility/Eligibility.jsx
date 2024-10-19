import React, { useContext, useEffect, useState } from "react";
import c1icon from "../../../images/c1.png";
import c2icon from "../../../images/c2.png";
import c4icon from "../../../images/c4.png";
import { useNavigate } from "react-router-dom";
import { getStorage, isEmpty } from "../../../Utils/common";
import ContextDashboard from "../../../Context/ContextDashboard";
import { DashboardWrapper } from "../style";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import DashboardCard2 from "../DashboardCard2";

const cardList = [

  {
    heading: "Loan Calculator",
    desc: "Choose the loan amount and tenure.",
    img: c1icon,
    link: "/my-dashboard/calculate-loan",
  },
  {
    heading: "Employment Information",
    desc: "Share about your work status.",
    img: c2icon,
    link: "/my-dashboard/about-your-company",
  },
  {
    heading: "Upload Your Documents",
    desc: "Share your documents to verify your details",
    img: c4icon,
    link: "/my-dashboard/adhar-upload",
  },
  {
    heading: "Banking Details",
    desc: "Share your banking details",
    img: c2icon,
    link: "/my-dashboard/bank-detail",
  },
  
];

function Eligibility() {
  const [cards, setCards] = useState(cardList);
  const [progressBar, setProgressBar] = useState(getStorage("step_percent"));
  const { setps } = useContext(ContextDashboard);
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(3);

  const redirect = (data) => {
    navigate(data.link);
  };

  // useEffect(() => {
  //   if (!isEmpty(setps)) {
  //     checkStep(setps);
  //   }
  // }, [setps]);

  // function checkStep(data) {
  //   setProgressBar(data?.step_complete_percent);

  //   // Check completion status of each step
  //   const isFirstCardComplete = data?.documents_uploads === "DONE";
  //   const isSecondCardComplete = data?.company_info === "DONE";

  //   // Activate next card based on completion
  //   if (isFirstCardComplete && activeCardIndex === 0) {
  //     setActiveCardIndex(1);
  //   } 
  //   if (isFirstCardComplete && isSecondCardComplete && activeCardIndex === 1) {
  //     setActiveCardIndex(2);
  //   }
  // }

  useEffect(() => {
    setCards((prevCards) =>
      prevCards.map((card, index) => ({
        ...card,
        complate: (index === 0 && setps?.documents_uploads === "DONE") ||
                  (index === 1 && setps?.company_info === "DONE") ||
                  (index === 2 && setps?.loan_cal === "DONE"),
      }))
    );
  }, [setps]);

  return (
    <DashboardWrapper>
      <ProgressBar value={`${progressBar}%`} />
      <div className="carde">
        {cards.map((value, index) => {
          const isActive = index === activeCardIndex;
          return (
            <DashboardCard2
              number={index + 1}
              heading={value.heading}
              desc={value.desc}
              img={value.img}
              complate={value.complate}
              disable={!isActive}
              key={index}
              onClick={() => isActive && redirect(value)} // Only redirect if the card is active
            />
          );
        })}
        <div className="hideMD"></div>
      </div>
    </DashboardWrapper>
  );
}

export default Eligibility;



// import React, { useContext, useEffect, useState } from "react";



// import c1icon from "../../../images/c1.png";
// import c2icon from "../../../images/c2.png";
// import c3icon from "../../../images/c3.png";
// import c4icon from "../../../images/c4.png";
// import c5icon from "../../../images/c5.png";
// import banner from "../../../images/bannerimg2.png";
// import play from "../../../images/play-circle.png";
// import Button from "../../../components/ui/Button";
// import { useNavigate } from "react-router-dom";
// import { getStorage, isEmpty } from "../../../Utils/common";
// import ContextDashboard from "../../../Context/ContextDashboard";
// import { DashboardWrapper } from "../style";
// import ProgressBar from "../../../components/ProgressBar/ProgressBar";
// import DashboardCard from "../DashboardCard";

// const cardList = [
//   {
//     heading: "Loan Calculator",
//     desc: "Choose the loan amount and tenure.",
//     img: c1icon,
//     complate: true,
//     link: "/my-dashboard/calculate-loan",
//   },
//   {
//     heading: "Employment Information",
//     desc: "Share about your work status.",
//     img: c2icon,
//     complate: false,
//     link: "/my-dashboard/about-your-company",
//   },
//   {
//     heading: "Upload Your Documents",
//     desc: "Share your documents to verify your details",
//     img: c4icon,
//     complate: false,
//     link: "/my-dashboard/aadhar-upload",
//   }
 
// ];



// function Eligibility() {
//   const [cards, setCards] = useState(cardList);
//   const [stepComplate, setStepComplate] = useState(false);
//   const [showSteps, setShowSteps] = useState(-1);
//   const [toggle, setToggle] = useState(true);
//   const [progressBar,setProgressBar] = useState("0")
//   const {setps} = useContext(ContextDashboard);

//   const navigate = useNavigate();
//   const {message,setMessage,setProfileData,profileData} = useContext(ContextDashboard);

//   const redirect = (data) =>{
//     console.log(data);
//     navigate(data.link)
//   }

//   const showSteps_ = ()=>{

//    setToggle(!toggle)
//   }
  

//   // useEffect(()=>{
//   //   console.log("setps",setps)
//   //   if(!isEmpty(setps)){
//   //     checkStep(setps);
//   //   }
   
//   // },[setps]);

// // function checkStep(data){
 
// //       setProgressBar(data?.step_complete_percent);
// //       const steps = (data?.step_stage - 1) ;
// //       if(data?.step_complete_percent === 100){
// //         setToggle(false)
// //       }
// //       setShowSteps(steps);
      
     
  
// //   }


// useEffect(()=>{
//   setCards([
//     {
//       heading: "Loan Calculator",
//       desc: "Choose the loan amount and tenure.",
//       img: c1icon,
//       complate:setps?.loan_cal === "DONE",
//       link: "/my-dashboard/calculate-loan",
//     },
//     {
//       heading: "Employment Information",
//       desc: "Share about your work status.",
//       img: c2icon,
//       complate:setps?.company_info === "DONE",
//       link: "/my-dashboard/about-your-company",
//     },
//     {
//       heading: "Upload Your Documents",
//       desc: "Share your documents to verify your details",
//       img: c4icon,
//       complate:setps?.documents_uploads === "DONE",
//       link: "/my-dashboard/adhar-upload",
//     }
//   ])
// },[setps])

//   return (
//     <DashboardWrapper>
//       <ProgressBar value={`${progressBar}%`} title="Loan Application"  >
//       </ProgressBar>

//      {<div className="carde">
//         {cards.map((value, index) => {
//           return (
//             <DashboardCard
//               heading={value.heading}
//               desc={value.desc}
//               img={value.img}
//                complate={value.complate}
//               disable={false}
//               key={index}
//               onClick={() =>redirect(value)}
//             />
//           );
//         })}
//        <div className="hideMD"></div>
//       </div>
      
//       }
      
//     </DashboardWrapper>
//   );
// }

// export default Eligibility;