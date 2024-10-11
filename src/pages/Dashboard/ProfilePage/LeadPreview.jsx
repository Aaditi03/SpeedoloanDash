import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import Button from "../../../components/ui/Button";
import { ProfilePreviewWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import ContextDashboard from "../../../Context/ContextDashboard";
import { getStorage, isEmpty } from "../../../Utils/common";
import { userdata } from "../../../Utils/api";
import Modal from "../../../components/Modal/Modal";
import LeadBox from "./LeadBox";

function formatDate(dateString) {
  if (!dateString) return "NA";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function LeadPreview() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    number: "",
    email: "",
  });
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responce, setResponce] = useState(false);

  const { profileData, logout, getProfileDaital } = useContext(ContextDashboard);
  const [lead, setLead] = useState(getStorage("lead_id") || "");

  const redirect = (link) => {
    navigate(link);
  };

  useEffect(() => {
    if (isEmpty(profileData)) return;
    getProfileDaital();
  }, []);

  useEffect(() => {
    const params = {
      user_id: profileData?.user_id || "",
    };

    userdata(params).then((resp) => {
      if (resp?.data?.Status === 1) {
        const userData = resp?.data?.data; // Accessing the 'data' field directly
        if (userData) {
          setUser({
            name: userData.name || "NA",
            number: userData.mobile || "NA", // Correcting 'mobile' field usage
            email: userData.email || "NA",
          });
        }
      } else if (resp?.data?.Status === 5) {
        logout();
      }
    });
  }, [profileData?.user_id, logout]);

  return (
    <ProfilePreviewWrapper>
      <ProfileHeader />
      <div className="detailBox">
        <LeadBox heading="Application Details">
          <table>
            <tbody>
              <tr>
                <td>Lead Id</td>
                <td>{lead || "NA"}</td>
              </tr>
              <tr>
                <td>Your Name</td>
                <td>{profileData?.full_name || profileData?.short_name || "NA"}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{profileData?.gender || "NA"}</td>
              </tr>
              <tr>
                <td>DOB</td>
                <td>{formatDate(profileData?.dob)}</td>
              </tr>
              <tr>
                <td>Marital Status</td>
                <td>
                  {profileData?.marital_status
                    ? profileData?.marital_status === "1"
                      ? "Single"
                      : "Married"
                    : "Divorced"}
                </td>
              </tr>
              <tr>
                <td>Personal Email</td>
                <td>{profileData?.email ? profileData?.email.toLowerCase() : "NA"}</td>
              </tr>
            </tbody>
          </table>
        </LeadBox>

        <LeadBox heading="Credit Manager">
  <table>
    <tbody>
      <tr>
        <td>Executive Name</td>
        <td>{user.name || "NA"}</td>
      </tr>
      <tr>
        <td>Executive Number</td>
        <td>
          <a style={{color:"#26b9db"}} href={`tel:${user.number || ""}`} onClick={(e) => !user.number && e.preventDefault()}>
            {user.number || "NA"}
          </a>
        </td>
      </tr>
      <tr>
        <td>Executive Email</td>
        <td>
          <a style={{color:"#26b9db"}} href={`mailto:${user.email || ""}`} onClick={(e) => !user.email && e.preventDefault()}>
            {user.email || "NA"}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</LeadBox>


        <LeadBox heading="Application Status">
          <table>
            <tbody>
              <tr>
                <td>Status</td>
                <td>{profileData?.status || "NA"}</td>
              </tr>
              <tr>
                <td>Repayment Amount</td>
                <td>{profileData?.repayment_amount || "NA"}</td>
              </tr>
              <tr>
                <td>Repayment Date</td>
                <td>{formatDate(profileData?.repayment_date)}</td>
              </tr>
            </tbody>
          </table>
        </LeadBox>
      </div>
    </ProfilePreviewWrapper>
  );
}

export default LeadPreview;
