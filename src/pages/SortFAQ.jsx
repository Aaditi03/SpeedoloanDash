import React, { useEffect, useRef, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Paper,
    Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SortFAQ = () => {
    const [isVisible, setIsVisible] = useState(false);
    const faqRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); // Reset animation when the component leaves the view
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the component is visible
            }
        );

        if (faqRef.current) {
            observer.observe(faqRef.current);
        }

        return () => {
            if (faqRef.current) {
                observer.unobserve(faqRef.current);
            }
        };
    }, []);

    return (
        <Container
            className="loan-calculate"
            sx={{
                padding: 4,
                background: '#f0fff0',
            }}
            ref={faqRef}
        >
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#135deg',
                    mb: 4,
                    fontSize: '3rem',
                    fontFamily: 'Arial, sans-serif', // Changed to simple font
                }}
            >
                Frequently Asked Questions
            </Typography>

            <Box
                sx={{
                    padding: '2rem',
                    backgroundColor: '#f7f7f7',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                }}
            >
                <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <div
                        className="accordion-wrapper"
                        style={{
                            transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
                            transition: 'transform 1s ease-in-out',
                        }}
                    >
                        {/* FAQ Accordion Items */}
                        {faqItems.map((faq, index) => (
                            <Accordion
                                key={index}
                                sx={{
                                    marginBottom: '1rem',
                                    backgroundColor: 'white',
                                    animation: isVisible
                                        ? `dropDownAnimation 0.5s ease-in-out ${index * 0.2}s forwards`
                                        : 'none',
                                    opacity: isVisible ? 1 : 0, // Reset opacity when component goes out of view
                                    '@keyframes dropDownAnimation': {
                                        '0%': {
                                            opacity: 0,
                                            transform: 'translateY(-20px)',
                                        },
                                        '100%': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        },
                                    },
                                }}
                            >
                               <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`faq${index}-content`}
                                id={`faq${index}-header`}
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black', // Set text color to black
                                    transition: ' 5s ease-in-out', // Change transition duration and type
                                    '&:hover': {
                                        backgroundColor: 'orange', // Change to orange on hover
                                    },
                                    '&.Mui-expanded': {
                                        backgroundColor: '#ffa726', // Orange color when expanded
                                        color: 'black', // Keep text color black when expanded
                                    },
                                }}
                            >
                                    <Typography sx={{ fontFamily: 'Arial, sans-serif', color: 'black' }}> {/* Simple font and black color */}
                                        {index + 1}. {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ fontFamily: 'Arial, sans-serif', color: 'black' }}> {/* Simple font and black color */}
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </Paper>
            </Box>
        </Container>
    );
};

// FAQ items data
const faqItems = [
    {
        question: 'What is Speedo Loan?',
        answer: 'Speedoloan.com is a digital platform that provides fast and easy personal loans to salaried professionals in India.',
    },
    {
        question: 'Who can apply for a personal loan on Speedo Loan?',
        answer: 'Any salaried individual aged 21 to 60, employed full-time, can apply for a personal loan on Speedoloan.com.',
    },
    {
        question: 'How much loan amount can I get from Speedo Loan?',
        answer: 'We offer personal loans ranging from ₹5,000 to ₹1,00,000, depending on your salary and credit history.',
    },
    {
        question: 'How do I apply for a loan on Speedo Loan?',
        answer: 'Applying for a loan on Speedoloan.com is easy. Just fill out the form, submit the required documents, and receive instant approval from our end.',
    },
    {
        question: 'What documents do I need to apply for a loan?',
        answer: 'The required documents include a valid ID proof, address proof, salary slips, and bank statements.',
    },
];

export default SortFAQ;
