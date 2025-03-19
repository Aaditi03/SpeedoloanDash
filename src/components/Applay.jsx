import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const Apply = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://crm.speedoloan.com/Api/TaskApi/savelendingpage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Thank you for applying! Our executive will connect with you soon.');
        reset();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong!'}`);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Apply for Loan
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {/* First Name & Loan Amount */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="loan_amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Loan Amount"
                    type="number"
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Monthly Income & PAN */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="monthly_income"
                control={control}
                rules={{ required: 'Monthly Income is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monthly Income"
                    type="number"
                    fullWidth
                    error={!!errors.monthly_income}
                    helperText={errors.monthly_income?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="pan"
                control={control}
                rules={{
                  required: 'PAN Card is required',
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: 'Invalid PAN format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="PAN Card"
                    fullWidth
                    error={!!errors.pan}
                    helperText={errors.pan?.message}
                  />
                )}
              />
            </Grid>

            {/* Mobile & Email */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="mobile"
                control={control}
                rules={{
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Mobile number must be 10 digits',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mobile Number"
                    type="tel"
                    fullWidth
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="email_personal"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Personal Email"
                    fullWidth
                    error={!!errors.email_personal}
                    helperText={errors.email_personal?.message}
                  />
                )}
              />
            </Grid>

            {/* Pincode & Lead Source */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="pin"
                control={control}
                rules={{
                  required: 'Pincode is required',
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Pincode must be 6 digits',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pincode"
                    fullWidth
                    error={!!errors.pin}
                    helperText={errors.pin?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="source"
                control={control}
                rules={{ required: 'Lead Source is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Lead Source"
                    fullWidth
                    error={!!errors.source}
                    helperText={errors.source?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit Application
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Apply;
