import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, IconButton, Tooltip, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { displayPrice } from './Util';

const Orders = ({ orders, products, lineItems, getCartItem, createLineItem, updateLineItem, isProductInWishlist, createWishlistItem, deleteWishlistItem, isAdmin, customers }) => {
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();

  const getOrderDetails = (orderId) => {
    return orders.find((order) => { return order.id === orderId })
  }

  const getCustomerName = (customerId) => {
    const selectedCustomer = customers.find((customer) => customer.id === customerId);
    return `${selectedCustomer.firstname} ${selectedCustomer.lastname}`;
  }

  //get list of placed orders
  const placedOrders = orders?.filter(order => !order.is_cart).map((order) => { return order.id });
  const hasOrders = placedOrders?.length > 0;
  //For all placed orders - get product id from line item
  const orderLineItems = lineItems.filter((lineItem) => placedOrders.includes(lineItem.order_id));
  //for each filtered line item, get all required data from products (name,quantity purchased,order id, order , product id)
  /* passed in price:product.price to pull price info from products to be caluculated in the total order price*/
  const orderedProducts = orderLineItems.map((lineItem) => {

    const product = products?.find(product => product.id === lineItem.product_id);
    return {
      name: product?.name, description: product?.description, quantity: lineItem?.quantity, price: product?.price,
      orderId: lineItem?.order_id, orderDate: getOrderDetails(lineItem?.order_id)?.created_at, id: product?.id
    }

  });

  /* added the total order price to be diplayed for each order */
  const calculateLineItemTotal = (productPrice, quantity) => {
    return productPrice * quantity
  }

  const renderMessage = () => {
    return (
      <Card sx={{ mt: "1rem", p: "1rem", width: "50rem" }} variant="outlined">
        <Typography variant='h6'>
          There are no products that matches the search.
        </Typography>
      </Card>
    );
  }

  const showSearchResults = (searchResults) => {
    return searchResults?.length > 0 ? showProductDetails(searchResults) : renderMessage()
  }

  const showProductDetails = (products) => products.map((product) => {
    const cartItem = getCartItem(product.id);
    return (
      <Card key={`card-for-order-${product.orderId}-product-${product.id}`}
        sx={{ display: 'flex', mb: "1rem" }} variant='outlined'>
        <Badge badgeContent={`Qty:${product.quantity}`} color='secondary' overlap='circular'>
          <CardMedia
            sx={{ p: "1rem", width: "200px", height: "200px", cursor: 'pointer' }}
            image={`https://source.unsplash.com/random/?${product?.name}`}
            component="img"
            onClick={() => { navigate(`/products/${product.id}`); }}
          />
        </Badge>
        <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography gutterBottom variant="caption" component="span">
            {product?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product?.description}
          </Typography>

          {
            !isAdmin &&
            <>
              <CardActions>
                {
                  isProductInWishlist(product) ?
                    <Tooltip title="I changed my mind! Remove from Wishlist.">
                      <IconButton size="small" sx={{ color: 'red' }} onClick={() => { deleteWishlistItem(product) }}><FavoriteIcon /></IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="I want this cake someday! Add to Wishlist.">
                      <IconButton size="small" onClick={() => { createWishlistItem(product) }}><FavoriteIcon /></IconButton>
                    </Tooltip>
                }
                <Tooltip title="Buy it again">
                  <IconButton size="small" onClick={() => { cartItem ? updateLineItem(cartItem) : createLineItem(product) }}>
                    <ShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Box sx={{ mt: "auto", alignSelf: "end" }}>
                <Button sx={{ width: "fit-content", m: "auto" }} onClick={() => { navigate(`/products/${product.id}/review`) }}>Write a product review</Button>
              </Box>
            </>
          }
        </CardContent>
      </Card>
    )
  });


  const showOrderDetails = (orderId) => {
    const currentOrder = getOrderDetails(orderId);
    //get order placed date
    const orderDate = currentOrder?.created_at
    //get all products in an order
    const productsInOrder = orderedProducts.filter((order) => {
      return (
        order.orderId === orderId
      )
    })

    const grandTotal = productsInOrder.reduce((total, product) => {
      return total + calculateLineItemTotal(product.price, product.quantity);
    }, 0)


    //for each product in the order, form the product details elements to be displayed 
    //This returns all products in a given order
    const productData = showProductDetails(productsInOrder);

    //for displaying app products under the order date heading - form the html elements
    const orderData = (
      <Card key={`card-for-order-${orderId}`} sx={{ mb: "1rem" }}>
        <CardHeader sx={{ backgroundColor: "#ffc107" }} subheader={
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Order placed on</Typography>
              <Typography>{new Date(orderDate).toString().slice(0, 15)}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Total</Typography>
              <Typography>{displayPrice.format(grandTotal)}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Order # {orderId}</Typography>
              {isAdmin && <Typography>Order placed by {getCustomerName(currentOrder.user_id)}</Typography>}
            </Box>
          </Container>
        } />
        <CardContent key={`content-for-order-${orderId}`}>
          {productData}
        </CardContent>
      </Card>
    );
    return orderData;
  }

  const showOrders = () => {
    return (
      hasOrders ?
        placedOrders.map((order) => {
          return showOrderDetails(order)
        })
        :
        <Card sx={{ mt: "1rem", p: "1rem" }} >
          <Typography>
            There are no orders to display.
          </Typography>
        </Card>)
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "2rem 0" }}>
        <Typography variant='h5'>Orders</Typography>
        {
          hasOrders &&
          <SearchBar searchList={orderedProducts} onSearch={(results) => { setSearchResults(results) }} />
        }
      </Box>
      {
        // display order details by default. If the searchResults are available, then display only search results
        searchResults ? showSearchResults(searchResults)
          : showOrders()
      }

    </Container>
  );
};

export default Orders;
