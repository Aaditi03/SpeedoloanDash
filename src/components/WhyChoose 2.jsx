import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Security, Bolt, Savings, SupportAgent } from "@mui/icons-material";

const features = [
  {
    icon: <Security fontSize="large" sx={{ color: "#FFD700" }} />, // Gold
    title: "Highly Secure Transactions",
    description: "We use advanced encryption to protect your financial data 24/7.",
  },
  {
    icon: <Bolt fontSize="large" sx={{ color: "#FF4500" }} />, // Bright Orange
    title: "Instant Loan Approval",
    description: "AI-powered verification ensures quick loan disbursal with zero paperwork.",
  },
  {
    icon: <Savings fontSize="large" sx={{ color: "#32CD32" }} />, // Lime Green
    title: "Smart Financial Planning",
    description: "Get flexible EMI options tailored to your financial needs.",
  },
  {
    icon: <SupportAgent fontSize="large" sx={{ color: "#1E90FF" }} />, // Deep Sky Blue
    title: "24/7 Customer Support",
    description: "Our experts are available anytime to assist you at every step.",
  },
];

const WhyChoose = () => {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
        background: "#eef9f9", // Same Background as How It Works

      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={5}
        sx={{
          background: "linear-gradient(135deg, #ff6a00, #ff9800)", // Vibrant Orange Gradient (Same as How It Works)
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        Why Choose SpeedoLoan? 
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 4,
                borderRadius: "15px",
                textAlign: "center",
                background: "#fff", // White Background for Clarity
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.08)",
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
                  background: "#f8f9fa", // Light Grey on Hover
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: "#222" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }} mt={1}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyChoose;
