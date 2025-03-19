import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, Paper, Divider } from "@mui/material";
import { Fade } from "@mui/material";

const CancellationRefundPolicy = () => {
  const sections = [
    {
      content: [
        "By using our Services, you agree to our Cancellation & Refund Policy. Please take a moment to familiarize yourself with the details below, outlining our commitment to fairness and customer-centric practices.",
      ],
    },
    {
      title: "1. Pre-Disbursement Cancellation",
      content: [
        "Cancellation is allowed if the loan has been sanctioned but not disbursed.",
      ],
    },
    {
      title: "2. Cancellation After Disbursement",
      content: [
        "If the applicant wishes to cancel the service after loan disbursement within 24 hours, the principal amount must be repaid.",
      ],
    },
    {
      title: "3. Refund of Excess Payments",
      content: [
        "Any Excess payments made will be refunded within 5-7 days after the reconciliation of loan repayment.",
      ],
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const policyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true); // Set visibility to true when in view
      } else {
        setIsVisible(false); // Set visibility to false when out of view
      }
    });

    if (policyRef.current) {
      observer.observe(policyRef.current);
    }

    return () => {
      if (policyRef.current) {
        observer.unobserve(policyRef.current);
      }
    };
  }, []);

  return (
    <div ref={policyRef}>
      <Container maxWidth="lg">
        {/* Prominent Heading */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Fade in={isVisible} timeout={1000}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "2.8rem",
                letterSpacing: "0.05em",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Cancellation & Refund Policy:{" "}
            </Typography>
          </Fade>
        </Box>

        {/* Policy Content */}
        <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <Box
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Fade in={isVisible} timeout={1000 + sectionIndex * 500}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {section.title}
                  </Typography>
                </Fade>
                {section.content.map((line, lineIndex) => (
                  <Fade
                    in={isVisible}
                    timeout={1200 + sectionIndex * 500 + lineIndex * 500}
                    key={lineIndex}
                  >
                    <Typography>{line}</Typography>
                  </Fade>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />
            </div>
          ))}
          <Typography>
            By using Speedo Loan, you acknowledge that you have read,
            understood, and agree to these Cancellation and Refund Policy. Thank
            you for choosing us as your business loan partner!
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default CancellationRefundPolicy;
