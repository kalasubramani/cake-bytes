import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useParams } from 'react-router-dom';
import Cart from './Cart'



const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, orderDetails, placeOrder, isVip, user) {
  switch (step) {
    case 0:
      return <AddressForm user={user} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review orderDetails={orderDetails} isVip={isVip}/>
    default:
      throw new Error('Unknown step');
  }
}
//add the input props from home and pass it down to AddressForm
export default function Checkout({ getItemsInCart, placeOrder, isVip, user}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const orderDetails = getItemsInCart();
  const { orderid } = useParams();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      placeOrder();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleAddressSubmit = ()=>{
    console.log("handleAddressSubmit fired")
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1" component='div'>
                Your order number is <Box sx={{ color: '#ff9100', display: 'inline' }}>{orderid}</Box>. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <Container component={"form"} onSubmit={handleNext}>              
              {getStepContent(activeStep, orderDetails, placeOrder, isVip, user)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  // onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  type='submit'
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </Container>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}