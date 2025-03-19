import React from "react";
import "../css/Common.css";
import about_us_img_1 from "../images/about_1.png";
import title_icon from "../images/title_shape_1.svg";
import img1 from "../images/about_feature_1_1.svg";
import img2 from "../images/about_feature_1_2.svg";
import img3 from "../images/about_2.png";
import Number_Statistics from "../components/Number_Statistics";
import { FaCheck } from "react-icons/fa";
import ChatButton from "../components/ChatButton";
import { Link } from "react-router-dom";
import { Typography, Grid, Paper, Box, Container,Button } from '@mui/material';
import ApplicationIcon from '@mui/icons-material/Assignment'; // Example icon
import VerificationIcon from '@mui/icons-material/CheckCircle';
import ApprovalIcon from '@mui/icons-material/Check'; // Make sure this line is included
import RepaymentIcon from '@mui/icons-material/Payment'; // Example icon for repayment

// import './AboutUs.css'; 

import visionImage from '../images/vison-DBwR7l0z.webp'; // import vision image 
import missionImage from '../images/13.webp'; // Import mission image
import aboutUsImage from '../images/4.webp'; // Import about us image
import familyImage from '../images/Downloader-La-270835.jpg'; // Import your rounded person image

import moneybip from "../images/moneybip-color-logo.svg"

const About = () => {
  return (
    <>

      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>About Us</h2>
            <div style={{ marginTop: "10px" }}>
              <Link 
                to="/" 
                style={{ 
                  color: "#26b9db", 
                  fontWeight: "600", 
                  fontSize: "14px", 
                  textDecoration: "none" 
                }}
              >
                Home
              </Link>
              <span style={{ color: "white", fontSize: "16px", margin: "0 10px" }}>→</span>
              <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                About Us
              </span>
            </div>
          </div>
        </div>
        <section className="company_info_section">
  <div className="company_info_wrapper">
    <div className="title_section">
      <h2 className="full-width text-center">Welcome to Speedo Loan</h2>
    </div>
    <p className="text-center company_info_content">
      Speedo Loan is your trusted provider of personal loans for salaried professionals in India, offering quick and flexible financial solutions for unexpected expenses, medical emergencies, and home improvements—all at your fingertips! As part of an RBI-registered NBFC, we are committed to empowering millennials with innovative loan options, ensuring fast approvals with customer-friendly terms. Our experienced leadership and skilled team have positioned us as one of the fastest-growing and most trusted fintech companies, dedicated to providing seamless and reliable financial support.
    </p>
  </div>
</section>

              {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <h3>Why Choose Speedo Loan for their Services?</h3>
          <div className="why-choose-us__items">
            <div className="choose-us__item">
              <h4>Trusted by Thousands</h4>
              <p>
              Speedo Loan is a trusted digital lending partner for thousands of salaried individuals in India, known for the fast, fair, and reliable service.              </p>
            </div>
            <div className="choose-us__item">
              <h4>Security and Privacy</h4>
              <p>
              At Speedo Loan, your data security is our priority. We use advanced encryption and security measures to protect your information, fully complying with India’s data privacy laws.              </p>
            </div>
            <div className="choose-us__item">
              <h4>Customer-Centric Approach</h4>
              <p>
              At Speedo Loan, we prioritize our customers with dedicated support for applications, repayments, and financial advice, ensuring exceptional service at every step. </p>
            </div>
            <div className="choose-us__item">
              <h4>Flexible and Inclusive</h4>
              <p>
              We believe in financial access for all. Our inclusive criteria offer loan options for young professionals and experienced workers alike, accommodating various credit scores, including those with less-than-perfect histories.  </p>
            </div>
          </div>
        </div>
      </section>
      <section className="join-Speedoloan">
  <div
    className="container text-center"
    style={{
      border: '2px solid gray',
      borderRadius: '50px',
      padding: '20px',
      marginBottom: '20px', // Adjusted bottom margin for all screens
    }}
  >
    <img
      src={familyImage}
      alt="Join Speedoloan Family"
      className="rounded-circle"
      style={{
        width: '100px',
        height: '100px',
        border: '2px solid gray',
        borderRadius: '50%',
      }}
    />
    <Typography variant="h4" gutterBottom>
      Join the Speedo Loan Family Today
    </Typography>
    <Typography variant="body1" paragraph>
      Experience convenient personal lending with Speedo Loan. Whether you need a quick loan for unexpected expenses or a long-term solution, we’re here to help.
    </Typography>
    <Typography variant="body1" paragraph>
      Apply today and take control of your financial future with Speedo Loan.
    </Typography>
  </div>
</section>

<section className="loan-process-section">
          <Typography variant="h3" align="center" gutterBottom sx={{ color: 'black' }}  className="loan-process-title">
            Our Loan Process
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'black', mb: 2 }} // Adding margin-bottom of 2 (8px)
          >
            At Speedo Loan, we have simplified the loan process to make it as easy and straightforward as possible. Here’s how it works:
          </Typography>

       {/* Process Steps */}
      <Container sx={{ padding: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={4} className="process-card">
            <Box className="icon-box">
              <ApplicationIcon className="process-icon" />
            </Box>
            <Typography variant="h5" align="center" className="process-title">
              Online Application
            </Typography>
            <Typography variant="body2" align="center">
              Start by filling out our quick and easy loan application form online. You’ll need to provide some basic personal information, employment details, and the loan amount you wish to apply for.
            </Typography>
          </Paper>
        </Grid>

      

        <Grid item xs={12} md={4}>
          <Paper elevation={4} className="process-card">
            <Box className="icon-box">
              <VerificationIcon className="process-icon" />
            </Box>
            <Typography variant="h5" align="center" className="process-title">
              Instant Verification
            </Typography>
            <Typography variant="body2" align="center">
              Our advanced technology allows us to verify your documents and creditworthiness immediately. Within minutes, you will receive a preliminary decision on your loan application.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={4} className="process-card">
            <Box className="icon-box">
              <ApprovalIcon className="process-icon" />
            </Box>
            <Typography variant="h5" align="center" className="process-title">
              Approval and Disbursal
            </Typography>
            <Typography variant="body2" align="center">
            Once your loan is approved, the funds will be transferred directly to your bank account. In most cases, this happens within 24-48 hours of approval, but with us, you can get it in mere 5 minutes.            </Typography>
          </Paper>
        </Grid>

        {/* <Grid item xs={12} md={4}>
          <Paper elevation={4} className="process-card">
            <Box className="icon-box">
              <RepaymentIcon className="process-icon" />
            </Box>
            <Typography variant="h5" align="center" className="process-title">
              Easy Repayment
            </Typography>
            <Typography variant="body2" align="center">
            Repaying your loan is as easy as applying. Choose a repayment schedule that suits your budget, and make payments through our website or mobile app. We offer various options, including NACH, bank transfers, UPIs, and online payment gateways.         </Typography>
          </Paper>
        </Grid> */}
        </Grid>
        </Container>
        <Box
            className="call-to-action"
            sx={{
              backgroundColor: 'white',
              borderRadius:'40px',
              padding: { xs: '10px', sm: '20px' }, // Reduced padding
              textAlign: 'center',
              minHeight: { xs: '80px', sm: 'auto' }, // Adjust minimum height
            }}
          >
          <Typography
  variant="h3"
  sx={{
    fontSize: { xs: '1.5rem', sm: '2rem' },
    mx: { xs: '1rem', sm: '2rem', md: '3rem' } // Adjust as per screen size
  }}
>
  Enquire for Loan
</Typography>

            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            We're here to help you out! Contact us for any queries or concerns about our services. Your feedback is important to us.
                        </Typography>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#333', // Button color
                  color: 'white', // Text color
                  borderRadius:'50px',
                  padding: '10px 20px', // Button padding
                  '&:hover': {
                    backgroundColor: 'orange', // Hover color
                  },
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>
        </section>

      </div>
      <ChatButton />
    </>
  );
};

export default About;
