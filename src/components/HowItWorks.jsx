import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { PersonAdd, Lock, ThumbUp, TrendingUp } from "@mui/icons-material";

const steps = [
  {
    title: "Easy Sign-Up",
    description: "Register within minutes & get started instantly!",
    icon: PersonAdd,
    color: "#FFD700", // Gold
  },
  {
    title: "Secure & Private",
    description: "Your information is protected with top-grade security.",
    icon: Lock,
    color: "#FF4500", // Orange Red
  },
  {
    title: "Quick Approval",
    description: "Get approved in no time & access funds instantly!",
    icon: ThumbUp,
    color: "#00FF7F", // Spring Green
  },
  {
    title: "Grow Your Credit",
    description: "Timely repayments improve your credit health!",
    icon: TrendingUp,
    color: "#1E90FF", // Dodger Blue
  },
];

const HowItWorks = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1B1464, #6A11CB, #2575FC)", // Blue-Purple Theme
        background: "#eef9f9", // Same Background as How It Works

        py: 10,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          sx={{
            color: "black",
            mb: 6,
            background: "linear-gradient(135deg, #ff6a00, #ff9800)", // Vibrant Orange Gradient (Same as How It Works)
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            }}
        >
          How It Works ?
        </Typography>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: "15px",
                    background: "rgba(255, 255, 255, 0.95)",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))",
                    },
                  }}
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
                    {React.createElement(step.icon, {
                      sx: { fontSize: 50, color: step.color, mb: 2 },
                    })}
                  </motion.div>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mt: 2, mb: 1, color: "#222" }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
