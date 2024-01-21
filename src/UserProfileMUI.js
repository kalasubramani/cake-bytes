import React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import Orders from './Orders';
import WishlistMui from './WishlistMui';

const UserProfileMUI = ({
    user, 
    wishlistItems, 
    products, 
    cartItems, 
    createWishlistItem, 
    deleteWishlistItem, 
    orders, 
    lineItems, 
    getCartItem, 
    createLineItem, 
    updateLineItem}) => {



    return (
    <Container>
      <Typography variant="h3" align="center" sx={{ m: 4 }} >
        Profile page for: {user.firstname} {user.lastname}
      </Typography>
      <Accordion  elevation={5} sx={{ mt: 0, mb: 4}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor: '#ffc107'}}
          elevation={5} 
        >
            <Box>
                <Typography variant='h4'>
                    Profile
                </Typography>
                <Typography variant='h6'>
                    View or update your personal information
                </Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <h3> Profile  <Link to='/settings'> Settings </Link>  </h3>
            <ul>
              <li> Username:{ user.username }</li>
              <li> Firstname:{ user.firstname}</li>
              <li> Lastname: { user.lastname}</li>
              <li> Billing Address: </li>
            </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={5} sx={{ mt: 0, mb: 4}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{backgroundColor: '#ffc107'}}
          elevation={5} 
        >
            <Box>
                <Typography variant='h4'>
                    Orders
                </Typography>
                <Typography variant='h6'>
                    Track recent orders or buy again
                </Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Orders orders={orders} products={products} lineItems={lineItems} getCartItem={getCartItem} createLineItem={createLineItem} updateLineItem={updateLineItem} />
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={5} sx={{ mt: 0, mb: 4}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ backgroundColor: '#ffc107'}}
          elevation={5} 
        >
            <Box>
                <Typography variant='h4'>
                    Wishlist
                </Typography>
                <Typography variant='h6'>
                    View and modify your wishlist
                </Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <WishlistMui wishlistItems={wishlistItems} products={products} cartItems={cartItems} createWishlistItem={createWishlistItem} deleteWishlistItem={deleteWishlistItem}/>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default UserProfileMUI;
