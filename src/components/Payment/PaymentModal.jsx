// PaymentModal.js
import React from 'react';
import './PaymentModal.css'; // Keep the existing CSS
import payU from '../../images/payu.webp'
import razorpay from '../../images/razorpay.png'

const PaymentModal = ({ onClose, onRazorpay, onPayU, isLoading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Choose Payment Method</h3>
        <div className="modal-actions">
          
          <img 
            src={razorpay}
            alt="Pay with Razorpay" 
            className="pay-image" 
            onClick={onRazorpay} 
            style={{borderRadius:"18px", width:"12%",marginBottom:"1.8%", cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.5 : 1 }} 
          />
          {/* <img 
            src={payU} 
            alt="Pay with PayU" 
            className="pay-image" 
            onClick={onPayU} 
            style={{width:"10%", cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.5 : 1 }} 
          /> */}
          
        </div>
        <button 
            className="cancel-button" 
            onClick={onClose}
          >
            Cancel
          </button>
      </div>
    </div>
  );
};

export default PaymentModal;
