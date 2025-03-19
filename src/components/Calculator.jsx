import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Slider,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Avatar,
    Button,
    IconButton,
    TextField // Import TextField for editing
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';

// import WhatsAppImage from '../images/what-C_g1QWKx.webp';
import FacebookImage from '../images/11.webp';
import InstagramImage from '../images/12.webp';
// import TwitterImage from '../images/twiter.png';
// import YouTubeImage from '../images/youtube1.png';

import expert1 from '../images/WhatsApp Image 2024-10-23 at 5.56.46 PM-D1LZ1HRq.webp';
import expert2 from '../images/14.webp';
import expert3 from '../images/15.webp';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const slideInLeft = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const Calculator = () => {
    const [loanAmount, setLoanAmount] = useState(5000);
    const [loanTenure, setLoanTenure] = useState(1);
    const [interestRate, setInterestRate] = useState(1);
    const [totalAmount, setTotalAmount] = useState(5000);

    const [isEditingAmount, setIsEditingAmount] = useState(false);
    const [isEditingTenure, setIsEditingTenure] = useState(false);
    const [editedLoanAmount, setEditedLoanAmount] = useState(loanAmount);
    const [editedLoanTenure, setEditedLoanTenure] = useState(loanTenure);

    const handleLoanAmountChange = (event, newValue) => {
        setLoanAmount(newValue);
        setEditedLoanAmount(newValue);
    };

    const handleLoanTenureChange = (event, newValue) => {
        setLoanTenure(newValue);
        setEditedLoanTenure(newValue);
    };

    const handleInterestRateChange = (event, newValue) => {
        setInterestRate(newValue);
    };

    const calculateTotalAmount = () => {
        const totalInterest = ((Number(loanAmount) * Number(interestRate)) * Number(loanTenure)) / 100;
        setTotalAmount(Number(loanAmount) + Number( totalInterest));
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [loanAmount, loanTenure, interestRate]);

    // Save the edited values on toggle
    const handleEditAmount = () => {
        if (isEditingAmount) setLoanAmount(editedLoanAmount);
        setIsEditingAmount(!isEditingAmount);
    };

    const handleEditTenure = () => {
        if (isEditingTenure) {
            const newTenure = Number(editedLoanTenure);
            if (!isNaN(newTenure)) {
                setLoanTenure(newTenure);
            }
        }
        setIsEditingTenure(!isEditingTenure);
    }

    const { ref: calculatorRef, inView: calculatorInView } = useInView({ triggerOnce: false });

    return (
        <Box sx={{ padding: '60px 0', background: 'white' }}>
            <Container>
                <Typography variant="h3" align="left" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                    Calculate your Loan
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: 3,
                                borderRadius: '40px',
                                background: 'white',
                                color: 'black',
                                boxShadow: '10px 10px 20px #cccccc, -10px -10px 20px #ffffff',
                                animation: calculatorInView ? `${slideInLeft} 0.5s ease` : 'none',
                                border: '2px solid gray',
                            }}
                            ref={calculatorRef}
                        >
                            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                Loan Amount (₹)
                            </Typography>
                            <Slider
                                value={loanAmount}
                                min={5000}
                                max={100000}
                                onChange={handleLoanAmountChange}
                                valueLabelDisplay="auto"
                                sx={{ marginBottom: 2 }}
                            />

                            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                Loan Tenure (Days)
                            </Typography>
                            <Slider
                                value={loanTenure}
                                min={1}
                                max={90}
                                onChange={handleLoanTenureChange}
                                valueLabelDisplay="auto"
                                sx={{ marginBottom: 2 }}
                            />

                            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                Interest Rate (%)
                            </Typography>
                            <Slider
                                value={interestRate}
                                min={0.5}
                                step={0.1}
                                max={1}
                                onChange={handleInterestRateChange}
                                valueLabelDisplay="auto"
                                sx={{ marginBottom: 2 }}
                            />

                            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '1rem' }}>Loan Amount:</TableCell>
                                            <TableCell sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                                                {isEditingAmount ? (
                                                    <TextField
                                                        type='number'
                                                        value={editedLoanAmount}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setEditedLoanAmount(value);
                                                            setLoanAmount(value ? Number(value) : 0);
                                                        }}
                                                        size="small"
                                                    />
                                                ) : (
                                                    `${loanAmount} ₹`
                                                )}
                                            <IconButton onClick={handleEditAmount} sx={{ ml: 1 }}>
                                            <EditIcon />
                                        </IconButton>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell sx={{ fontSize: '1rem' }}>Interest Rate:</TableCell>
                                            <TableCell sx={{ fontSize: '1rem' }}>{interestRate}%</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell sx={{ fontSize: '1rem' }}>Loan Tenure:</TableCell>
                                            <TableCell sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                                                {isEditingTenure ? (
                                                    <TextField
                                                        value={editedLoanTenure}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setEditedLoanTenure(value);
                                                            setLoanTenure(value ? Number(value) : 0); // Ensure loanTenure updates
                                                        }}
                                                        size="small"
                                                    />
                                                ) : (
                                                    `${loanTenure} days`
                                                )}
                                               
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell sx={{ fontSize: '1rem' }}>Total Amount:</TableCell>
                                            <TableCell sx={{ fontSize: '1rem' }}>{totalAmount} ₹</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Button
                                component={Link}
                                to="/apply-now"
                                variant="contained"
                                sx={{
                                    marginTop: 3,
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textTransform: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 2,
                                    border: '2px solid gray',
                                    ':hover': { backgroundColor: '#f0f0f0' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                Let's Get Started
                                <Box
                                    component="span"
                                    sx={{
                                        width: 0,
                                        height: 0,
                                        borderTop: '6px solid transparent',
                                        borderBottom: '6px solid transparent',
                                        borderLeft: '12px solid black',
                                    }}
                                />
                            </Button>
                        </Paper>
                    </Grid>
{/* Right Side Section for Mortgage Experts */}
<Grid item xs={12} md={4}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: 3,
                                borderRadius: '40px',
                                textAlign: 'left',
                                background: 'gray',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                border: '2px solid gray',
                            }}
                        >
                            {/* Expert Images at the top */}
                            <Box sx={{ display: 'flex', gap: 2, padding: 2, border: '2px solid gray', borderRadius: '40px' }}>
                                <Avatar alt="Expert 1" src={expert1} sx={{ width: 80, height: 80 }} />
                                <Avatar alt="Expert 2" src={expert2} sx={{ width: 80, height: 80 }} />
                                <Avatar alt="Expert 3" src={expert3} sx={{ width: 80, height: 80 }} />
                            </Box>

                            <h2>Speak to our experts</h2>
                            <h4>With 5+ years in digital lending, our consultants provide expert guidance throughout the loan process. We’re here to help you secure your loan quickly and confidently.</h4>
                            <br/>
                            <br/>
                          
                    
                            <Box sx={{ display: 'flex', justifyContent: 'start', gap: 2, marginBottom: 3 }}>
    {/* <Link to="https://wa.me/919099909941">
        <img src={WhatsAppImage} alt="WhatsApp" style={{ width: '30px', height: '30px' }} />
    </Link> */}
    <Link to="https://www.facebook.com/profile.php?id=61567546377871">
        <img src={FacebookImage} alt="Facebook" style={{ width: '30px', height: '30px' }} />
    </Link>
    <a href="https://www.instagram.com/speedo.loan/" target="_blank" rel="noopener noreferrer">
    <img src={InstagramImage} alt="Instagram" style={{ width: '30px', height: '30px' }} />
</a>

    {/* <Link to="https://x.com/speedo_loan">
        <img src={TwitterImage} alt="Twitter" style={{ width: '30px', height: '30px' }} />
    </Link> */}
    {/* <Link to="https://www.youtube.com/@SpeedoLoan" >
        <img src={YouTubeImage} alt="YouTube" style={{ width: '30px', height: '30px' }} />
    </Link> */}
</Box>

{/* Contact Us Button */}
<Button
    component={Link}
    to="/contact"
    variant="contained"
    color="primary"
    sx={{
        alignSelf: 'start',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'white',
        color: 'black',
        justifyContent: 'space-between',
        textTransform: 'none',
        padding: '8px 16px',
        borderRadius: '40px',
        border: '2px solid gray',
        marginTop: 3, // Add margin top to position the button below icons
        ':hover': {
            backgroundColor: '#f0f0f0',
        },
    }}
>
    Contact Us
    <Box
        component="span"
        sx={{
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '12px solid black',
        }}
    />
</Button>

                        </Paper>
                    </Grid>
                </Grid>
                
            </Container>
        </Box>
    );
};

export default Calculator;
