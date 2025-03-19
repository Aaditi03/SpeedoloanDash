import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from "@mui/material";

const Processingcompo = () => {
  const [formData, setFormData] = useState({
    loanAmount: 50000,
    apr: 35,
    tenure: 12,
    processingFee: 1000,
    gstOnProcessingFee: 180,
    amountDisbursed: 48820,
    emi: 5625,
    totalRepayment: 67500,
    totalInterest: 17500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = Number(value);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <Box
      sx={{
        p: 5,
        minHeight: "50vh",
        background: "#eef9f9", // Updated Light Mint Blue Background

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
<Typography
  variant="h4"
  fontWeight="bold"
  mb={3}
  textAlign="center"
  sx={{
    background: "linear-gradient(135deg, #ff6a00, #ff9800)", // Orange Gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Soft Shadow for Depth
  }}
>
  Unlock Your Financial Freedom 
</Typography>

{/* <Typography
  variant="h6"
  textAlign="center"
  sx={{
    textShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
    color: "#ff6a00", // Vibrant Orange
  }}
>
  {/* Smart Financial Solutions for Your Future 🚀 */}


      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background:
                  "linear-gradient(135deg, #002f4b, #005792, #00a8cc)", // Professional Blue Gradient
              }}
            >
              {[
                "Amount",
                "APR",
                "Tenure",
                "Processing Fee",
                "GST on Fee",
                "Amount Disbursed",
                "EMI",
                "Total Repayment",
                "Total Interest",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "12px",
                    fontSize: "16px",
                    color: "white", // White text for contrast
                    textShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)", // Soft shadow for better readability
                    borderRadius: "0px", // 🛑 Border Radius Removed
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              hover
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              {Object.keys(formData).map((key, index) => (
                <TableCell
                  key={index}
                  sx={{ textAlign: "center", padding: "12px" }}
                >
                  <TextField
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        background: "#ff6a00",
color:"black",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                          background:
                            "linear-gradient(135deg, rgba(63, 81, 181, 0.1), rgba(255, 64, 129, 0.1))",
                        },
                      },
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Processingcompo;
