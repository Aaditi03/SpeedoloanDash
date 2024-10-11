import React, { useContext, useState } from 'react';
import { SidebarWrapper } from './style';
import icon1 from "../../images/dashBoardIcon.svg";
import icon2 from "../../images/myacountIcon.svg";
import icon3 from "../../images/supportIcon.svg";
import icon4 from "../../images/document.svg";
import icon5 from "../../images/logoutIcon.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import ContextDashboard from '../../Context/ContextDashboard';

const linkList = [
   {
      link: "/my-dashboard/",
      icon: icon1,
      title: "Dashboard"
   },
   {
      link: "/my-dashboard/profile-preview",
      icon: icon2,
      title: "My Account"
   },
   {
      link: "/contact",
      icon: icon3,
      title: "Support"
   },
   {
      link: "/my-dashboard/leads",
      icon: icon1,
      title: "Loan History"
   },
   {
      link: "/termsandconditions",
      icon: icon4,
      title: "Terms and Conditions"
   },
   {
      link: "/privacypolicy",
      icon: icon4,
      title: "Privacy Policy"
   },
   
];

function SideBar({ toggle, setToggle }) {
   const navigate = useNavigate();
   const location = useLocation();
   const { logout, eligibilityStatus, setps } = useContext(ContextDashboard);

   // Log profileData to console
   console.log("Profile Data:", setps);

   const redirect = (link) => {
      if (link === "/my-dashboard/") {
          if (eligibilityStatus === 'ELIGIBLE') {
            link = '/my-dashboard/eligibility'; 
         }
      }

      if (link === "/my-dashboard/profile-preview") {
          if (eligibilityStatus === 'ELIGIBLE') {
            link = '/my-dashboard/lead-preview'; 
         }
      }
   
      // Always navigate to the specified link, regardless of step_complete_percent
      if (link === "") {
         link = "/my-dashboard/";
      }
   
      // Handle mobile toggle
      if (window.innerWidth < 768) {
         setToggle(true);
      }
   
      // Navigate to the link
      navigate(link);
   };
   

   return (
      <SidebarWrapper className={toggle ? "close" : ""}>
         <ul>
            {
               linkList.map((value, index) => {
                  return (
                     <li key={index} onClick={() => redirect(value.link)} className={location.pathname === value.link ? "active pointer" : "pointer"}>
                        <div><img src={value.icon} alt="" /></div><span>{value.title}</span>
                     </li>
                  );
               })
            }
            <li onClick={logout}>
               <div><img src={icon5} alt="" /></div><span>Logout</span>
            </li>
         </ul>
      </SidebarWrapper>
   );
}

export default SideBar;
