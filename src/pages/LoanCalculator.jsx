import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";

const LoanCalculate = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <Container
      sx={{
        padding: 4,
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src="https://publicramlella.s3.ap-south-1.amazonaws.com/public_assets/SpeedoLoanPublicAssests/Navy+Pink+Social+Marketer+YouTube+Thumbnail+(2)+(2)-Dwlc-zzw.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          mb: 4,
          fontSize: "3rem",
          "&:hover": {
            color: "orange",
          },
        }}
      >
        Where we can be a life saver
      </Typography>

      <Grid container spacing={4} ref={ref}>
        {["Health", "Unexpected Expenses", "Credit Card Pay", "Vacation"].map(
          (title, index) => (
            <Grid item lg={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  color: "#000",
                  minHeight: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(-20px)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "white",
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                    color: "black",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "24px",
                      color: "white",
                      backgroundColor: "darkgray",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {index + 1}
                  </span>
                  <Typography variant="h6" component="strong" color="inherit">
                    {title}
                  </Typography>
                </div>
                <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
                  {title === "Health" &&
                    "At Speedo Loan we provide immediate financial assistance by way of loan, for your untimely medical bills or emergencies. You can take care of your loved ones without any financial fears!"}
                  {title === "Unexpected Expenses" &&
                    "Speedo Loan helps you handle unexpected expenses in just a fraction of second. Whether it's a medical bill, car repair, or wedding costs, our quick application gets you funds in as little as 5 minutes with flexible loan options."}
                  {title === "Credit Card Pay" &&
                    "At Speedo Loan, we consolidate your high-interest loans into a single loan with fixed terms, allowing you to manage your payments more easily and pay off debt faster!"}
                  {title === "Vacation" &&
                    "Your well-deserved vacation doesn’t have to be put on hold due to the lack of finances! With our Speedo Loan’s quickest services, you can enjoy your dream trip without any delay!"}
                </Typography>
              </Paper>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default LoanCalculate;
