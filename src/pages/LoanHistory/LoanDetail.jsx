import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './LoanHistory.css'; 
import { ProfilePreviewWrapper } from "../Dashboard/ProfilePage/style";
import ProfileHeader from "../Dashboard/ProfilePage/ProfileHeader";
import { loanDetail } from "../../Utils/api";

function LoanHistory() {
  const { lead_id } = useParams();
  const [loan, setLoan] = useState(null);
  const [collection, setCollection] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await loanDetail(lead_id);
        const loanData = response?.data?.data[0]; 
        const collectionData = response?.data?.collection; // Get all collection data
        setLoan(loanData);
        setCollection(collectionData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [lead_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      <div className="loan-history-card">
        {loan ? (
          <>
            <h2>Loan Details</h2>
            <p><strong>Lead ID:</strong> {loan.lead_id}</p>
            <p><strong>Customer Name:</strong> {loan.cust_full_name.trim()}</p>
            <p><strong>Loan Amount:</strong> {loan.loan_amount}</p>
            <p><strong>Mobile:</strong> {loan.mobile}</p>
            <p><strong>Application Status:</strong> {loan.status}</p>
            <p><strong>Loan Date:</strong> {loan.lead_final_disbursed_date}</p>
             <br/>
            <h2>Payment History</h2>
            <div className="collection-container">
              {collection.length > 0 ? (
                collection.map((item, index) => (
                  <div key={index} className="collection-card">
                    <p><strong>Received Amount:</strong> {item.received_amount}</p>
                    <p><strong>Date of Received:</strong> {formatDate(item.date_of_recived)}</p>
                    <p><strong>Remarks:</strong> {item.remarks}</p>
                  </div>
                ))
              ) : (
                <p>No Payment History available.</p>
              )}
            </div>
          </>
        ) : (
          <p>No loan details available.</p>
        )}
      </div>
    </ProfilePreviewWrapper>
  );
}

export default LoanHistory;
