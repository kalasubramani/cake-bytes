import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm({deliveryAddress,setDeliveryAddress}) {
  const onAddressUpdate = (addressField)=>{
  setDeliveryAddress({...deliveryAddress,...addressField});
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name" 
            fullWidth
            autoComplete="none"
            variant="standard"
            value={deliveryAddress.firstname}
            inputProps={{minLength:2, maxLength:15}}
            onChange={
                    (e)=>{
                      onAddressUpdate({firstname:e.target.value});
                    }
                  }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="none"
            variant="standard" 
            value={deliveryAddress.lastname} 
            inputProps={{minLength:2, maxLength:15}} 
            onChange={
              (e)=>{
                onAddressUpdate({lastname:e.target.value});
              }
            }        
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="none"
            variant="standard" 
            value={deliveryAddress.address_line1}
            inputProps={{minLength:3, maxLength:20}}  
            onChange={
              (e)=>{
                onAddressUpdate({address_line1:e.target.value});
              }
            }   
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="none"
            variant="standard"
            value={deliveryAddress.address_line2?deliveryAddress.address_line2:''}
            onChange={
              (e)=>{
                onAddressUpdate({address_line2:e.target.value});
              }
            }
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="none"
            variant="standard"
            value={deliveryAddress.city}
            onChange={
              (e)=>{
                onAddressUpdate({city:e.target.value});
              }
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            required
            value={deliveryAddress.state}
            onChange={
              (e)=>{
                onAddressUpdate({state:e.target.value});
              }
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="none"
            variant="standard"
            inputProps={{pattern:'^(?:[0-9]{5})$',title:'Please enter a 5 digit zip code',maxLength:5,minLength:5}}
            value={deliveryAddress.zip_code}
            onChange={
              (e)=>{
                onAddressUpdate({zip_code:e.target.value});
              }
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}