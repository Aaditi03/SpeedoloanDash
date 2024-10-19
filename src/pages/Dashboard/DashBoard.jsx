import React, { useContext, useEffect, useState } from "react";
import { DashboardWrapper } from "./style";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import c1icon from "../../images/c1.png";
import c2icon from "../../images/c2.png";
import c3icon from "../../images/c3.png";
import c4icon from "../../images/c4.png";
import c5icon from "../../images/c5.png";
import banner from "../../images/bannerimg2.png";
import play from "../../images/play-circle.png";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { getStorage, isEmpty } from "../../Utils/common";
import ContextDashboard from "../../Context/ContextDashboard";
import DashboardCard2 from "./DashboardCard2";

const cardList = [
  {
    heading: "PAN Authentication",
    desc: "Please enter your PAN Card number. Your identity is secure with us.",
    img: c1icon,
    complate: true,
    link: "/my-dashboard/pan-details"
  },
  {
    heading: "Personal Information",
    desc: "Share with us a bit about yourself.",
    img: c3icon,
    complate: false,
    link: "/my-dashboard/captur-personal-information"
  },
  {
    heading: "Current Residence Address",
    desc: "Ensure to provide correct residence address. No Surprise Visits, We Promise.",
    img: c2icon,
    complate: false,
    link: "/my-dashboard/captur-address"
  },
  {
    heading: "Income Details",
    desc: "Share your Income Details.",
    img: c4icon,
    complate: false,
    link: "/my-dashboard/captur-income-details"
  },
  {
    heading: "Selfie Upload",
    desc: "Share your selfie and complete the registration.",
    img: c5icon,
    complate: false,
    link: "/my-dashboard/upload-picture"
  },
];

function DashBoard() {
  const [cards, setCards] = useState(cardList);
  const [stepComplate, setStepComplate] = useState(false);
  const [showSteps, setShowSteps] = useState(getStorage("next_step")-2);
  const [toggle, setToggle] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const { message, setMessage, setProfileData, profileData,  eligibilityStatus, getProfileDaital, logout } = useContext(ContextDashboard);

  const navigate = useNavigate();

 

  const redirect = (data) => {
    navigate(data.link);
  };

  const showSteps_ = () => {
    if (eligibilityStatus === 'ELIGIBLE') {
      navigate('/my-dashboard/eligibility'); 
    } else {
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    // Set the progress bar based on the session data only if the active card index is not 0
    if (showSteps > 0) {
      setProgressBar(getStorage("step_percent"));
    }
  }, [showSteps]);

  // useEffect(() => {
  //   if (!isEmpty(setps)) {
  //     checkStep(setps);
  //   }
  // }, [setps]);

  // useEffect(() => {
  //   if (isEmpty(profileData)) return;
  //   getProfileDaital();
  // }, []);

  // function checkStep(data) {
  //   const nextStep = getStorage("next_step");
  //   const steps = nextStep > 2 ? nextStep - 2 : 0; // Calculate showSteps based on next_step
  //   if (data?.step_complete_percent === 100) {
  //     setToggle(false);
  //   }
  //   setShowSteps(steps);
  // }

  return (
    <DashboardWrapper>
      <ProgressBar value={`${progressBar}%`}>
        {!stepComplate ? (
          <div>
            <Button title="Let's Start" onClick={showSteps_} />
          </div>
        ) : <></>}
      </ProgressBar>

      {toggle ? (
        <div className="carde">
          {cards.map((value, index) => {
            return (
              <DashboardCard2
                number={index + 1}  // Adding the card number
                heading={value.heading}
                desc={value.desc}
                img={value.img}
                complate={(index + 1) <= showSteps}
                disable={index !== showSteps}
                key={index}
                onClick={() => redirect(value)}
              />
            );
          })}
          <div className="hideMD"></div>
        </div>
      ) : (
        <>
          <div className="banner flex">
            <div className="card card1">
              <h2>Your Gateway to Quick Easy & Hassle Free Finances.</h2>
            </div>
            <div className="card card2">
              <img src={banner} alt="" />
              <div className="center play">
                <img src={play} alt="play" />
                <h2>JOURNEY STEPS</h2>
              </div>
            </div>
            <div className="card card3">
              <h3>Dive into Financial Freedom!</h3>
              <p>Apply now for our instant personal loan - unlock a world of collateral-free ease, no credit score hassles, a seamless 100% online application process, and the simplicity of minimal documentation. Your journey to hassle-free finances starts here!.</p>
              <Button title="Support" />
            </div>
          </div>
        </>
      )}
    </DashboardWrapper>
  );
}

export default DashBoard;
