import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';

export default function PaymentForm({ paymentDetails, setPaymentDetails }) {
  const handlePaymentDetailsChange = (paymentData) => {
    setPaymentDetails({ ...paymentDetails, ...paymentData })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="none"
            variant="standard"
            value={paymentDetails.nameOnCard}
            onChange={
              (e) => {
                handlePaymentDetailsChange({ nameOnCard: e.target.value })
              }
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="none"
            variant="standard"
            inputProps={{ pattern: '^(?:[0-9]{16})$', title: 'Please enter a 16 digit card number', maxLength: 16, minLength: 16 }}
            value={paymentDetails.cardNumber}
            onChange={
              (e) => {
                handlePaymentDetailsChange({ cardNumber: e.target.value })
              }
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
             <TextField
            required
            id="expDate"            
            fullWidth
            autoComplete="none"
            variant="standard"
            type='month'
            inputProps={{ min: `${new Date().toISOString().substring(0, 7)}`, max: `${new Date().getFullYear()+5}-${new Date().toISOString().substring(5,7)}` }}
            value={paymentDetails.cardExpiry}
            onChange={
              (e) => {
                handlePaymentDetailsChange({ cardExpiry: e.target.value })
              }
            }
            helperText="Card expiry date"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="none"
            variant="standard"
            inputProps={{ pattern: '^(?:[0-9]{3})$', title: 'Please enter the 3 digit CVV on the back of your card', maxLength: 3, minLength: 3 }}
            value={paymentDetails.cvv}
            onChange={
              (e) => {
                handlePaymentDetailsChange({ cvv: e.target.value })
              }
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}