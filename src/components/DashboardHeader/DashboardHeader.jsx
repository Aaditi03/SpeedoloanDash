import React, { useContext, useEffect } from 'react';
import { HeaderWrapper } from './style';
import logo from '../../images/logo.png';
import logoSm from '../../images/logo.png';
import bar from '../../images/bar.png';
import userIcon from '../../images/userIcon.webp';
import ContextDashboard from '../../Context/ContextDashboard';
import { getDashboardData } from '../../Utils/api';
import { getStorage, isEmpty } from '../../Utils/common';
import Footer from "../../images/footer_bg_2.jpg";

function DashboardHeader({ toggle, setToggle }) {
  const { message, setMessage, setProfileData, profileData, setSetps, getProfileDaital } = useContext(ContextDashboard);

  useEffect(() => {
    getProfileDaital();
  }, []);

  return (
    <HeaderWrapper
      style={{
        backgroundImage: `url(${Footer})`,
        backgroundSize: 'cover',
        backgroundColor:"#082654",
      }}
      className='flex justify-between'
    >
      <div className="left flex">
        <div className="badgeIcon pointer" onClick={() => setToggle(!toggle)}>
          <img style={{width:"32px"}} src={bar} alt="logo" />
        </div>
        <div className="logo">
          <img className='xl' src={logo} alt="logo" />
          <img className='sm' src={logoSm} alt="logo" />
        </div>
      </div>
      <div className="right flex">
        <div className="icon">
          <img src={profileData.profile_pic_path || ""} alt="" />
        </div>
        <div className="name"> Hi, {profileData.short_name || ""}</div>
      </div>
    </HeaderWrapper>
  );
}

export default DashboardHeader;
