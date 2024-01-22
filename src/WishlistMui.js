import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { displayPrice } from './Util';
import { Card, CardActions, CardContent, CardMedia, Container, Fab, IconButton, Tooltip, Typography, ImageList, ImageListItem, } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const WishlistMui = ({wishlistItems, products, cartItems, getCartItem, createLineItem, updateLineItem,}) => {

 
  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  }) 
console.log("is this the wishlist products", productIdArray)

  //use the product ids to create an array of the wishlist products
  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })
  console.log("wishlist products are" , wishlistProducts)

  // const allProducts = products?.map((product, index) => {
  //   const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
  //   console.log("cartItems from wishlist", cartItem)
  // })
  // console.log("This is all", allProducts)

  return (
    <Card>
    <ImageList sx={{ width: 950 , height: 700 }}>
      <ImageListItem  key="Subheader" cols={2}>
        <ListSubheader sx={{backgroundColor: "#ffc107"}} component="div">My Wishlist</ListSubheader> 
      </ImageListItem>
      {wishlistProducts.map((item,index) => (
        <ImageListItem key={item.id}>
          <img
           srcSet={`https://source.unsplash.com/random/?${item.name}[${index}]?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`https://source.unsplash.com/random/?${item.name}[${index}]?w=248&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
          />
        
          <ImageListItemBar
            sx={{backgroundColor: "rgba(255,255,255,0.8)"}}
            title={item.name}
            subtitle={item.description}
            actionIcon={
            <>
            <Tooltip title="I changed my mind!">
                <IconButton size="small" sx={{ color: 'red'}}  ><FavoriteBorderIcon /></IconButton>
                {/* deleteWishlistItem(product)  */}
            </Tooltip>
             <Tooltip title="Add to cart!" >
             <IconButton size="small" onClick={() => { cartItem ? updateLineItem(cartItem) : createLineItem(item) }}><ShoppingCartIcon /></IconButton>
           </Tooltip>
            </>
            }
          />
        </ImageListItem>
      ))}
    </ImageList></Card>
  );
}


// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     author: '@helloimnik',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     author: '@nolanissac',
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     author: '@hjrc33',
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     author: '@silverdalex',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     author: '@southside_customs',
//     cols: 2,
//   },
// ];
export default WishlistMui
