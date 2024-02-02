import React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import Orders from './Orders';
import Wishlist from './Wishlist';
import ProfileSettings from './ProfileSettings';
import { useTheme } from '@mui/material/styles';

const UserProfile = ({
  user,
  setUser,
  wishlistItems,
  products,
  cartItems,
  createWishlistItem,
  deleteWishlistItem,
  orders,
  lineItems,
  getCartItem,
  createLineItem,
  updateLineItem,
  isProductInWishlist }) => {

  const theme = useTheme();

  return (
    <Container>
      <Accordion elevation={5} sx={{ mt: 0, mb: 4 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor: theme.palette.primary.main}}
          elevation={5}
        >
          <Box>
            <Typography variant='h6'>
              Profile
            </Typography>
            <Typography variant='body2'>
              View or update your personal information
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <ProfileSettings user={user} setUser={setUser} />
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={5} sx={{ mt: 0, mb: 4 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{backgroundColor: theme.palette.primary.main}}
          elevation={5}
        >
          <Box>
            <Typography variant='h6'>
              Orders
            </Typography>
            <Typography variant='body2'>
              Track recent orders or buy again
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Orders orders={orders} products={products} lineItems={lineItems} getCartItem={getCartItem}
            createLineItem={createLineItem} updateLineItem={updateLineItem}
            createWishlistItem={createWishlistItem}
            deleteWishlistItem={deleteWishlistItem}
            isProductInWishlist={isProductInWishlist}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={5} sx={{ mt: 0, mb: 4 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{backgroundColor: theme.palette.primary.main}}
          elevation={5}
        >
          <Box>
            <Typography variant='h6'>
              Wishlist
            </Typography>
            <Typography variant='body2'>
              View and modify your wishlist
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Wishlist wishlistItems={wishlistItems} products={products} getCartItem={getCartItem}
            cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem}
            deleteWishlistItem={deleteWishlistItem}
          />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default UserProfile;
