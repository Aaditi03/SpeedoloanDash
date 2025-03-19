import React, { useContext, useEffect, useState } from 'react';
import { ProfileHeaderWrapper } from "./style";
import editIcon from "../../../images/edit.svg";
import { useNavigate, Link } from "react-router-dom";
import ContextDashboard from '../../../Context/ContextDashboard';
import { getDashboardData } from '../../../Utils/api';
import { getStorage, isEmpty } from '../../../Utils/common';

function ProfileHeader({ children }) {
  const { message, setMessage, setProfileData, outdata, profileData, setSetps, getProfileDaital } = useContext(ContextDashboard);
  const [dashboard, setDashboard] = useState([]);
  
  const navigate = useNavigate();
  
  // Handle click for repayment redirection
  const handleClick = () => {
    navigate('/my-dashboard/repayment'); // Replace with your desired URL
  };
  
  // Fetch dashboard data on component mount
  useEffect(() => {
    const params = {
      profile_id: getStorage("cust_profile_id") || "",
    };

    getDashboardData(params).then(resp => {
      if (resp?.data?.Status === 1) {
        const dashboardData = resp?.data || {};
        setDashboard(dashboardData);
      }
    });
  }, []);

  // Redirect to upload picture page
  const redirect = (link) => {
    navigate("/my-dashboard/upload-picture");
  };

  // Check if active_loan_details has valid data
  const hasActiveLoanDetails = dashboard?.Data?.active_loan_details && 
    (dashboard?.Data?.active_loan_details?.total_due > 0 || 
    Object.keys(dashboard?.Data?.active_loan_details).length > 0);

  return (
    <ProfileHeaderWrapper>
      <div className="imgBox">
        <img src={dashboard?.Data?.profile_pic} alt="" />
        {/* <div className="editIcon center" onClick={redirect}>
          <img src={editIcon} alt="" />
        </div> */}
      </div>
      <div className="main">
        <div className="textBox">
          {/* Conditionally render Outstanding Amount and Pay Now button */}
          {hasActiveLoanDetails ? (
            <div className="outstandingAmount">
              <h2>
                Outstanding Amount: {dashboard?.Data?.active_loan_details?.total_due || ""}
              </h2>
              <button style={{ float: "right", marginTop: "10px" }} onClick={handleClick}>Pay Now</button>
            </div>
          ) : null}

          <div className="flex">
            <span className="title">Name:</span>
            <span className="value">{dashboard?.Data?.full_name || "NA"}</span>
          </div>
          <div className="flex">
            <span className="title">PAN Card:</span>
            <span className="value">{dashboard?.Data?.profile_details?.pancard || "NA"}</span>
          </div>
          <div className="flex">
            <span className="title">Email:</span>
            <span className="value">
              {dashboard?.Data?.profile_details?.personal_email?.trim()
                ? dashboard?.Data?.profile_details?.personal_email.toLowerCase()
                : "NA"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex bottom">
        <p>
          {/* Don't let uncertainty hold you back. It's time to explore the
          possibilities. */}
          Please Check The Eligibility To Proceed.
        </p>
        {children}
      </div>
    </ProfileHeaderWrapper>
  );
}

export default ProfileHeader;
