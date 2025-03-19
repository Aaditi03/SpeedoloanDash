import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Box } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { SvgIcon } from '@mui/material';

// Loan steps data
const loanSteps = [
  {
    icon: <HowToRegIcon fontSize="large" sx={{ color: 'orange' }} />,
    title: "Apply Online",
    description: "Click on Apply Now, fill out our quick and easy online application."
  },
  {
    icon: <VerifiedUserIcon fontSize="large" sx={{ color: 'orange' }} />,
    title: "Paperless Verification",
    description: "We do paperless verification even for our first-time users."
  },
  {
    icon: <AccountBalanceIcon fontSize="large" sx={{ color: 'orange' }} />,
    title: "Loan Approval",
    description: "Our team reviews and approves your loan in just 5 minutes."
  },
  {
    icon: <CurrencyRupeeIcon fontSize="large" sx={{ color: 'orange' }} />,
    title: "Receive Funds",
    description: "Funds are deposited into your bank account instantly."
  },
];

// Dotted curve and arrow component between steps
const DottedCurve = () => (
  <SvgIcon
    viewBox="0 0 400 100"
    sx={{
      position: 'absolute',
      width: '200px',
      height: '70px',
      top: '30px',
      left: '220px',
      display: { xs: 'none', sm: 'block' }, // Hide on small screens
    }} 
  >
    <path
      d="M 0 50 Q 75 0, 150 50"
      stroke="rgba(0, 0, 0, 0.2)"
      strokeDasharray="5,5"
      fill="transparent"
    />
  </SvgIcon>
);

const LoanProcessDiagram = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: "#fff",
        py: 6,
        px: { xs: 2, sm: 5 }, // Responsive padding
        textAlign: "center",
        position: 'relative',
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "40px",
        overflowX: "hidden", // Prevent horizontal overflow
      }}
    >
      <Typography variant="h4" sx={{ color: 'black', mb: 5, "&:hover": { color: "orange" } }}>
        <h2 style={{ fontSize: { xs: "32px", sm: "48px" } }}>Good credit, Bad credit - We don't discriminate!</h2>
        <h4>At Speedo Loan, we want to help you get your funds in emergency situations or to re-build your credit score.</h4>
      </Typography>

      <Grid container spacing={8} justifyContent="center" alignItems="flex-start" sx={{ position: 'relative' }}>
        {loanSteps.map((step, index) => (
          <Grid
            item
            xs={12}
            sm={2}
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: 'relative',
              mb: 5,
              mx: { xs: 2, sm: 4 },
              animation: inView ? `slideInRight 0.5s ease forwards` : 'none',
              '@keyframes slideInRight': {
                '0%': { opacity: 0, transform: "translateX(100px)" },
                '100%': { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: 4,
                border: '2px solid lightgray',
                boxShadow: "0 12px 36px rgba(0, 0, 0, 0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "80px", sm: "130px" },
                height: { xs: "80px", sm: "130px" },
                mb: 2,
              }}
            >
              {/* Rotating icon only */}
              <Box
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "rotate(360deg)"
                  }
                }}
              >
                {step.icon}
              </Box>
            </Box>
            <Typography variant="h6" gutterBottom>
              {step.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {step.description}
            </Typography>

            {/* Add Dotted Curve between steps */}
            {index < loanSteps.length - 1 && <DottedCurve />}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoanProcessDiagram;
