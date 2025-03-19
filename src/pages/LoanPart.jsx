import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import AmountImage from '../images/rupees.png'; 
import TenureImage from '../images/tenure.png'; 
import UnsecureLoanImage from '../images/unsecure.png'; // Replace with your unsecure loan icon image path
import PaperlessDisbursal from '../images/7.webp';
import disbursal from '../images/9.webp';

const LoanPart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.03 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Container ref={containerRef} sx={{ mt: 6, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          animation: {
            xs: 'none',
            md: isVisible ? 'marquee 20s linear infinite' : 'none',
          },
        }}
      >
        {/* Amount Box */}
        <Box sx={commonBoxStyles}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Loan Amount
          </Typography>
          <img
            src={AmountImage}
            alt="Loan Amount Icon"
            style={{ width: 50, height: 50, marginBottom: '8px' }}
          />
          <Typography variant="body1" sx={{ color: 'black' }}>
            Loan from ₹5000 - ₹100000
          </Typography>
        </Box>

        {/* Tenure Box */}
        <Box sx={commonBoxStyles}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Loan Tenure
          </Typography>
          <img
            src={TenureImage}
            alt="Loan Tenure Icon"
            style={{ width: 50, height: 50, marginBottom: '8px' }}
          />
          <Typography variant="body1" sx={{ color: 'black' }}>
            Tenure from 7 to 40 days
          </Typography>
        </Box>

        {/* Paperless Disbursal */}
        <Box sx={commonBoxStyles}>
          <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
            100% Paperless
          </Typography>
          <img
            src={PaperlessDisbursal}
            alt="Paperless Disbursal Icon"
            style={{ width: 60, height: 60, marginBottom: '8px' }}
          />
          <Typography variant="body1" sx={{ color: 'black' }}>
            100% Paperless Verification Process
          </Typography>
        </Box>

        {/* Instant Disbursal */}
        <Box sx={commonBoxStyles}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Instant Loan
          </Typography>
          <img
            src={disbursal}
            alt="Instant Disbursal Icon"
            style={{ width: 70, height: 70, marginBottom: '8px' }}
          />
          <Typography variant="body1" sx={{ color: 'black' }}>
            Swift Payout
          </Typography>
        </Box>

        {/* Unsecure Loan Box */}
        <Box sx={commonBoxStyles}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            Unsecured Loan
          </Typography>
          <img
            src={UnsecureLoanImage}
            alt="Unsecure Loan Icon"
            style={{ width: 50, height: 50, marginBottom: '8px' }}
          />
          <Typography variant="body1" sx={{ color: 'black' }}>
            Start now
          </Typography>
        </Box>
      </Box>

      {/* Define keyframes for animations */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Container>
  );
};

// Common styles for each box
const commonBoxStyles = {
  backgroundColor: 'white',
  borderRadius: 2,
  padding: 2,
  boxShadow: 3,
  textAlign: 'center',
  height: { xs: '150px', md: '200px' },
  width: { xs: '90%', md: '300px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: 6,
  },
  margin: '16px',
};

export default LoanPart;
