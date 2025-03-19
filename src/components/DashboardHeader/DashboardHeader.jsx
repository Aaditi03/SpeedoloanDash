import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { HeaderWrapper } from './style';
import logo from '../../images/logo.webp';
import logoSm from '../../images/logo.png';
import bar from '../../images/bar.png';
import userIcon from '../../images/userIcon.webp';
import ContextDashboard from '../../Context/ContextDashboard';
import { getDashboardData } from '../../Utils/api';
import { getStorage, isEmpty } from '../../Utils/common';
import Footer from "../../images/footer_bg_2.jpg";

function DashboardHeader({ toggle, setToggle }) {
  const [dashboard, setDashboard] = useState([]);
  const { message, setMessage, setProfileData, profileData, setSetps, getProfileDaital } = useContext(ContextDashboard);
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "",
    };

    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        // Set dashboard data
        const dashboardData = resp?.data || {};
        setDashboard(dashboardData);
      }
    });
  }, []);

  // Handle right flex box click
  const handleRightFlexClick = () => {
    const eligibility = getStorage('eligibility');
    if (eligibility === 1) {
      navigate('/my-dashboard/lead-preview'); 
    } else {
      navigate('/my-dashboard/profile-preview'); 
    }
  };

  return (
    <HeaderWrapper
      style={{
        height: "130px", // Adjust as needed
        marginTop:"10px",
        marginLeft:"20px",
        marginRight:"20px",
        // backgroundImage: `url(${Footer})`,
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7))`,
      }}
      className='flex justify-between'
    >
      <div className="left flex">
        <div className="badgeIcon pointer" onClick={() => setToggle(!toggle)}>
        <img style={{ width: "20px", filter: "brightness(0) invert(0)" }} src={bar} alt="logo" />
        </div>
        <div className="logo">
          <Link to="/">
            <img className='xl' src={logo} alt="logo" />
          </Link>
          <img className='sm' src={logoSm} alt="logo" />
        </div>
      </div>

      <div className="right flex" onClick={handleRightFlexClick}>
        <div className="icon">
          <img src={dashboard?.Data?.profile_pic || getStorage("selfie")} alt="" />
        </div>
        <div className="name"> Hi, {getStorage("fullName") || dashboard?.Data?.profile_details?.first_name}</div>
      </div>
    </HeaderWrapper>
  );
}

export default DashboardHeader;
