import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { displayPrice } from './Util';
import { Card, CardActions, CardContent, CardMedia, Container, Fab, IconButton, Tooltip, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Wishlist = ({ wishlistItems, products, cartItems, createWishlistItem, deleteWishlistItem }) => {

  console.log("wishlist.js")
  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  })

  //use the product ids to create an array of the wishlist products
  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })
  console.log("wishlist products are" , wishlistProducts)

  const allProducts = products?.map((product, index) => {
    const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
    console.log("cartItems from wishlist", cartItem)
  })

  //displays wishlist
  return (

    <div>
      <h2>My Wishlist</h2>
      <ul key={productIdArray[0]}>
        {wishlistProducts?.length > 0 ?
          (
            wishlistProducts?.map((product) => {
              return (
                <>
                  <li key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </li>
                  {
                    products?.map((product, index) => {
                      const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
                      <>
                      
                        <Tooltip title="I changed my mind!">
                          <IconButton size="small" sx={{ color: 'red' }} onClick={() => { cartItem ? createWishlistItem(cartItem) : deleteWishlistItem(product) }}><FavoriteBorderIcon /></IconButton>
                          {/* deleteWishlistItem(product)  */}
                        </Tooltip>
                        <Tooltip title="Add to cart!">
                          <IconButton size="small" onClick={() => { cartItem ? updateLineItem(cartItem) : createLineItem(product) }}><ShoppingCartIcon /></IconButton>
                        </Tooltip>

                      </>
                    })
                  }
                </>
              )
            })
          ) : (
            <h3>Add a product to your wishlist to get started.</h3>
          )
        }
      </ul>
    </div>
  )
}

export default Wishlist