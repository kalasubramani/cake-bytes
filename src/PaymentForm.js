import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
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
            inputProps={{pattern:'^(?:[0-9]{16})$',title:'Please enter a 16 digit card number',maxLength:16,minLength:16}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            // label="Expiry date"
            fullWidth
            autoComplete="none"
            variant="standard"
            type='month'
            inputProps={{min:`${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth()}`}}
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
            inputProps={{pattern:'^(?:[0-9]{3})$',title:'Please enter the 3 digit CVV on the back of your card',maxLength:3,minLength:3}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}