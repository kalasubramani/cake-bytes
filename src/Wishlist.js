import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import React, { useState } from "react";
import { Card, IconButton, Tooltip, Typography, ImageList, ImageListItem, Snackbar, } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';

const Wishlist = ({ wishlistItems, products, getCartItem, createLineItem, updateLineItem, deleteWishlistItem }) => {

  const theme = useTheme();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  })

  //use the product ids to create an array of the wishlist products
  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })

  const handleAddToCart = (product) => {
    const cartItem = getCartItem(product.id);
    //add item to cart
    cartItem ? updateLineItem(cartItem) : createLineItem(product)
    //remove item from wishlist
    deleteWishlistItem(product)

    // show toast notification
    setShowToast(true);
    setToastMessage("Product moved to cart.")
  }

  const handleDeleteWishlistItem = (product) => {
    //delete item from wishlist
    deleteWishlistItem(product)
    // show toast notification
    setShowToast(true);
    setToastMessage("Product removed from wishlist.")
  }

  const handleClose = () => {

    setShowToast(false);
    setToastMessage("");
  }

  return (
    <Card>
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={handleClose}
        message={toastMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      // key={product.id}
      />
      <ImageList>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader sx={{backgroundColor: theme.palette.primary.main}} component="div">My Wishlist</ListSubheader>
        </ImageListItem>
        {wishlistProducts?.length ?
          wishlistProducts.map((product) => (
            <ImageListItem key={product.id}>
              <img
                src={`${product.product_image}?w=164&h=464&fit=crop&auto=format`}
                alt={product.name}
                loading="lazy"
              />

              <ImageListItemBar
                sx={{ backgroundColor: "rgba(0,0,0,0.6)",color:"rgb(0,0,0)" }}
                title={product.name}
                subtitle={product.description}                
                actionIcon={
                  <>
                    <Tooltip title="I changed my mind! Remove from Wishlist.">
                      <IconButton size="small" sx={{ color: 'red' }} onClick={() => { handleDeleteWishlistItem(product) }}><FavoriteIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Add to cart!" >
                      <IconButton size="small" onClick={() => handleAddToCart(product)}><ShoppingCartIcon /></IconButton>
                    </Tooltip>
                  </>
                }
              />
            </ImageListItem>
          ))
          :
          <Card sx={{ mt: "1rem", p: "1rem" }} >
            <Typography>
              There are no items in your wishlist.
            </Typography>
          </Card>
        }
      </ImageList></Card>
  );
}
export default Wishlist
