import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const Applycompo = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)", // Gradient Update
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow Effects */}
      <Box
        sx={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "rgba(255, 255, 0, 0.3)", // Yellow Glow
          borderRadius: "50%",
          filter: "blur(150px)",
          top: "15%",
          left: "15%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "rgba(0, 128, 255, 0.3)", // Blue Glow
          borderRadius: "50%",
          filter: "blur(150px)",
          bottom: "15%",
          right: "15%",
        }}
      />

      <Container maxWidth="md">
        {/* Glassmorphism Card */}
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            padding: "50px",
            borderRadius: "25px",
            boxShadow: "0px 4px 30px rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Title Animation */}
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                textShadow: "0px 5px 15px rgba(255, 255, 255, 0.3)",
              }}
            >
              💰 Instant Loan in Minutes!
            </Typography>
            <Typography
              variant="h6"
              paragraph
              sx={{
                opacity: 0.9,
                maxWidth: "600px",
                margin: "auto",
                fontSize: "18px",
              }}
            >
              No paperwork, no hassle. Get up to ₹1 Lakh instantly with quick approvals!
            </Typography>
          </motion.div>

          {/* Button Animation */}
          <motion.div initial={{ scale: 3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/apply")}
                sx={{
                  background: "linear-gradient(45deg, #ff5722, #ff9800)", // New Gradient
                  color: "white",
                  padding: "14px 30px",
                  fontSize: "22px",
                  mt: 5,
                  borderRadius: "30px",
                  boxShadow: "0px 5px 15px rgba(255, 98, 0, 0.6)",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0px 10px 25px rgba(255, 98, 0, 0.8)",
                  },
                }}
              >
                Apply Now ⚡
              </Button>
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Applycompo;
