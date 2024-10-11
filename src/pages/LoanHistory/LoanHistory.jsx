import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './LoanHistory.css'; 
import { ProfilePreviewWrapper } from "../Dashboard/ProfilePage/style";
import ProfileHeader from "../Dashboard/ProfilePage/ProfileHeader";
import { allLeads } from "../../Utils/api";
import { getStorage } from "../../Utils/common";

function LoanHistory() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const params = {
      pancard: getStorage("pancard"),
    };
    
    allLeads(params).then((resp) => {
      if (resp?.data?.Status === 1) {
        const LeadData = resp?.data?.data;
        setLeads(LeadData) 
      }
    }).catch(error => {
      console.error("Error fetching leads:", error);
      // You can handle the error here (e.g., show a message)
    });
  }, []);

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <ProfilePreviewWrapper>
      <ProfileHeader />
      <div className="loan-history">
        {leads.length > 0 ? (
          leads.map(lead => (
            <Link to={`/my-dashboard/details/${lead.lead_id}`} className="lead-card" key={lead.id}>
              <h3>Lead id: {lead.lead_id}</h3>
              <p>Loan Amount: {lead.loan_amount}</p>
              <p>Status: {lead.status}</p>
              <p>Applied Date: {formatDate(lead.created_on)}</p> {/* Format the date here */}
            </Link>
          ))
        ) : (
          <p>No loan history found.</p>
        )}
      </div>
    </ProfilePreviewWrapper>
  );
}

export default LoanHistory;
