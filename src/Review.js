import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, Badge } from '@mui/material';
import { displayPrice } from './Util';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review({orderDetails, isVip}) {
 //grand total
 const orderTotal = orderDetails?.reduce((total, cartItem) => {
  let itemPrice = cartItem.price;
  if (isVip && cartItem.vipPrice > 0) {
    itemPrice = cartItem.vipPrice;
  }
  
  return total + (itemPrice * cartItem.quantity)
}, 0)

const calculateLineItemTotal = (productPrice, vipPrice, quantity) => {
  if (isVip && vipPrice > 0) {
    return vipPrice * quantity
  } else {
    return productPrice * quantity
  }
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orderDetails?.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar sx={{mr:'1rem'}}>
              <Badge
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                badgeContent={product.quantity}
                color="secondary"
              >
                <Avatar variant="square" src={`https://source.unsplash.com/random/?${product.name}`} alt={product.name}  sx={{ width: '5rem', height: '5rem' }}></Avatar>
              </Badge>
            </ListItemAvatar>

            <ListItemText primary={product.name} secondary={isVip && product.vipPrice > 0 ? product.vipPrice : product.price} />
            <Typography variant="body2">{displayPrice.format(calculateLineItemTotal(product.price, product.vipPrice, product.quantity))}</Typography>

          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" inset primaryTypographyProps={{sx:{fontWeight: 700,pl:'10rem'}}} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {displayPrice.format(orderTotal)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}