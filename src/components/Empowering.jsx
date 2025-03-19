import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { FaRegLightbulb, FaLock, FaMoneyCheckAlt } from "react-icons/fa";

const FinancialJourney = () => {
  return (
    <Box
      sx={{
        py: 6,
        minHeight: "70vh",
        background: "#eef9f9", // Updated Light Mint Blue Background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              textShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              textShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",

              color: "#ff6a00",
              // color: "red",
            }}
          >
            Smart Financial Solutions for Your Future 🚀
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              // textShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              // color: "red",

              mt: 2,
              opacity: 0.9,
            }}
          >
            Manage, grow, and secure your finances with our easy-to-use tools.
          </Typography>
        </motion.div>

        {/* Cards Section */}
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
          {[
            {
              icon: <FaRegLightbulb size={50} />,
              title: "Step 1: Smart Planning",
              text: "Analyze your financial needs and set goals with AI-driven insights.",
            },
            {
              icon: <FaLock size={50} />,
              title: "Step 2: Secure Transactions",
              text: "Your money is safe with our bank-level security and encrypted processing.",
            },
            {
              icon: <FaMoneyCheckAlt size={50} />,
              title: "Step 3: Easy Access to Funds",
              text: "Get instant approvals and quick disbursals directly into your account!",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "15px",
                      background: "rgba(255, 255, 255, 0.7)",
                      boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.15)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      color: "#333",
                      // color: "red",

                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.08)",
                        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.25)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2, 
                    
                        color: "#002366  ",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: "#444" }}>
                      {item.text}
                    </Typography>
                  </Box>
                </motion.div>
              </Tilt>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FinancialJourney;
