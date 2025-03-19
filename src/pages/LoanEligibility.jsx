import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import leftImage from '../images/17.webp'; // Adjust the path to your image

const LoanEligibility = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '50px',
        border: '2px solid gray', // Border color and thickness
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: shadow for a nice effect
       
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={leftImage}
            alt="Eligibility"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '50px', // Keep the image corners consistent with the container
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0b2747' }}>
            Who qualifies for our loans?
          </Typography>
          <Box mt={2}>
            <Typography variant="body1" paragraph>
              1. Those who couldn't secure a loan anywhere else.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Individuals with a low credit score.
            </Typography>
            <Typography variant="body1" paragraph>
              3. Those who have exhausted all other resources.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'gray' }}>
            Don't lose hope if you could not get loans approved till now! Reach out to us, apply now and get it transferred instantly. We specialize in offering quick, hassle-free loans when traditional lenders turn you away. Let us help you get back on track.            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanEligibility;
