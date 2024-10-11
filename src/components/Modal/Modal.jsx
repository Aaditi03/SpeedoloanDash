import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ModalWrapper } from "./style";
import ContextDashboard from '../../Context/ContextDashboard';

const Modal = ({ onClose, msg }) => {
  const navigate = useNavigate();
  const { eligibilityStatus, usertype } = useContext(ContextDashboard);

  // Function to handle the "Process" button click
  const handleProcessClick = () => {
    navigate('/my-dashboard/eligibility'); // Redirect to the eligibility URL
  };

  // Function to handle the "OK" button click
  const handleOkClick = () => {
    console.log('User type:', usertype); // Log usertype to the console
    
    if (eligibilityStatus === "ELIGIBLE") {
      if (usertype === 'REPEAT' || usertype === 'UNPAID-REPEAT') {
        console.log('Navigating to bank-upload...');
        navigate('/my-dashboard/bank-upload'); // Redirect to bank upload URL
      } else if (usertype === 'NEW') {
        handleProcessClick(); // Redirect to eligibility if usertype is NEW
      }
    } else {
      onClose(); // Close modal if not eligible
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-box">
        <h2>{msg}</h2>
        <div className="modal-buttons">
          <button onClick={handleOkClick}>OK</button>
          {msg === "You are eligible for loan" && (
            <button onClick={handleProcessClick}>Process</button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
