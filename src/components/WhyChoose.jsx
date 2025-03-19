import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import yourImage from '../images/8.webp'; 

const WhyChoose = () => {
    return (
        <Paper
            elevation={4}
            sx={{
                padding: 4,
                borderRadius: '40px',
                border: '2px solid gray',
                backgroundColor: 'white', // Background color for the paper
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
                alignItems: 'center',
                margin: '20px 16px', // Add margin to left and right
            }}
        >
            {/* Left Side with Image */}
            <Box 
                sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    maxWidth: { xs: '100%', sm: 'auto' }, // Adjust max width based on screen size
                    mb: { xs: 2, sm: 0 }, // Margin bottom for small screens
                }}
            >
                <Box 
                    component="img"
                    src={yourImage}
                    alt="Loan Processing"
                    sx={{ 
                        width: { xs: '100%', sm: '500px' }, // Increased width for larger screens
                        height: { xs: '200px', sm: 'auto' }, // Maintain aspect ratio and auto height
                        maxHeight: { xs: '200px', sm: '500px' }, // Increased max height for larger screens
                        borderRadius: '40px', // Match Paper's border radius
                    }} 
                />
            </Box>

            {/* Right Side with Content */}
            <Box 
                sx={{ 
                    flex: 2, 
                    paddingLeft: { xs: 0, sm: 2 }, 
                    textAlign: 'left', 
                    justifyContent: 'justify', 
                    display: 'flex', 
                    flexDirection: 'column', 
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                Why waste your time waiting when you can get your loan in just 5 minutes?
                 </Typography>
                
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                With the Speedo Loan’s quickest services, you don’t have to wait for days for financial assistance. Skip the hassle and get a fast-loan-processing experience that puts cash in your bank quickly. Our streamlined application process allows you to secure funds in as little as 5 minutes.                </Typography>

                {/* "Let's Get Started" Button */}
                <Button
                    component={Link}
                    to="/apply-now"
                    variant="contained"
                    sx={{
                        marginTop: 2,
                        backgroundColor: 'white',
                        color: 'black',
                        textTransform: 'none',
                        padding: '6px 12px', 
                        borderRadius: 2,
                        border: '2px solid gray', 
                        ':hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                >
                    Let's Get Started
                </Button>
            </Box>
        </Paper>
    );
};

export default WhyChoose;
