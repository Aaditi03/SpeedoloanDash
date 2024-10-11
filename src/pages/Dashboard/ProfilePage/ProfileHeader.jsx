import React, { useContext, useEffect } from 'react'
import { ProfileHeaderWrapper } from "./style";
import editIcon from "../../../images/edit.svg";
import user from "../../../images/userIcon.webp";
import { useNavigate,Link } from "react-router-dom";
import ContextDashboard from '../../../Context/ContextDashboard';
import { getDashboardData } from '../../../Utils/api';
import { getStorage, isEmpty } from '../../../Utils/common';

function ProfileHeader({ children }) {
  const{message,setMessage,setProfileData,outdata,profileData,setSetps,getProfileDaital}=useContext(ContextDashboard);
  const handleClick = () => {
    navigate('/my-dashboard/repayment'); // Replace with your desired URL
  };
  useEffect(() =>{
      getProfileDaital();
    },[]);

    const navigate = useNavigate();
    const redirect = (link) =>{
      
        
          navigate("/my-dashboard/upload-picture");
        }
  return (
    <ProfileHeaderWrapper>
      <div className="imgBox">
        <img src={profileData.profile_pic_path || ""} alt="" />
        <div className="editIcon center" onClick={redirect}>
          <img src={editIcon} alt="" />
        </div>
      </div>
      <div className="main">
        <div className="textBox">
        <div className="outstandingAmount">
            <h2>
  Outstanding Amount: {outdata?.repayment_data?.total_due_amount || ""}
  </h2>
  <button style={{float:"right",marginTop:"10px"}} onClick={handleClick}>Pay Now</button>

            </div>
            <div className="flex">
                <span className="title">Name:</span>
                <span className="value">{profileData.short_name || ""}</span>
            </div>
            <div className="flex">
                <span className="title">PAN Card:</span>
                <span className="value">{profileData.pancard || ""}</span>
            </div>
            <div className="flex">
                <span className="title">Email:</span>
                <span className="value">{profileData.email || ""}</span>
            </div>
            {/* <div className="flex">
                <span className="title">Email:</span>
                <span className="value">amit@gmail.com</span>
            </div> */}
        </div>
      </div>
      <div className="flex bottom">
        <p>
          Don't let uncertainty hold you back. It's time to explore the
          possibilities. Click below to check your eligibility today!
        </p>
        {children}
      </div>
    </ProfileHeaderWrapper>
  );
}

export default ProfileHeader;
