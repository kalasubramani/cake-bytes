import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from './SearchBar';
import { displayPrice } from './Util';
import { Card, CardActions, CardContent, CardMedia, Container, Fab, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';


const Products = ({ products, cartItems, createLineItem, updateLineItem, isLoggedIn, isAdmin, createWishlistItem, deleteWishlistItem }) => {
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const productCategory = queryParams.get("category");

  //display search results in the page
  const showSearchResults = (searchResults) => {
    return (
      searchResults.map((product) => {
        return (
          <div key={product.id}>
            <div
              className="product"
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            >
              {product.name}
            </div>
            {displayPrice.format(product.price)}
          </div>
        )
      }
      ))
  }
  //Display products based on category selected from side menu
  const showProducts = (category) => {
    let productsToDisplay;
    if (category && category !== "All Cakes") {
      productsToDisplay = products.filter((product) => {
        return (product.category === category)
      })
    } else {
      //for "all cakes" and /producs path - display all products   
      productsToDisplay = products;
    }



    const allProducts = productsToDisplay?.map((product, index) => {
      const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
          return (
        <>

          <Card sx={{ width: "14rem" }}>
            <CardMedia
              sx={{ height: "12rem", cursor: 'pointer' }}
              image={`https://source.unsplash.com/random/?${product.name}[${index}]`}
              title={"Click to view details"}
              onClick={() => { navigate(`/products/${product.id}`) }}
            />
            <CardContent>
              <Typography gutterBottom variant="caption" component="span">
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayPrice.format(product.price)}
              </Typography>
              <Typography variant="caption" className="vipDiscount">
                {product.vip_price > 0 ? `${displayPrice.format(product.vip_price)}  **VIP only discount!**` : ""}
              </Typography>
            </CardContent>

            {
              isLoggedIn && (
                <CardActions>
                  <Tooltip title="I want this cake someday!">
                    <IconButton size="small" sx={{ color: 'red' }} onClick={() => { cartItem ? createWishlistItem(cartItem) : createWishlistItem(product) }}><FavoriteIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="I changed my mind!">
                    <IconButton size="small" sx={{ color: 'red' }} onClick={() => {cartItem ? createWishlistItem(cartItem) : deleteWishlistItem(product)}}><FavoriteBorderIcon /></IconButton>
                    {/* cartItem ? createWishlistItem(cartItem) : deleteWishlistItem(product)  */}
                  </Tooltip>
                  <Tooltip title="Add to cart!">
                    <IconButton size="small" onClick={() => { cartItem ? updateLineItem(cartItem) : createLineItem(product) }}><ShoppingCartIcon /></IconButton>
                  </Tooltip>
                  {
                    isAdmin && (
                      <Tooltip title="Edit Product">
                        <IconButton size="small" onClick={() => { navigate(`/products/${product.id}/edit`) }}><EditNoteIcon /></IconButton>
                      </Tooltip>
                    )
                  }
                </CardActions>
              )}
          </Card>         
        </>
      );
    })
    return allProducts;
  }

  return (
    <div>
      <h2>Products</h2>
      <SearchBar searchList={products} onSearch={(results) => { setSearchResults(results) }} />
      {
        isAdmin && (
          <Tooltip title={"Add new product"}>
            <Fab color="primary" aria-label="add" sx={{ float: 'right' }} onClick={() => navigate("/add-product")}>
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      <Container sx={{ display: 'flex', gap: '1rem', flexWrap: "wrap" }} maxWidth="xl">
        {
          // display order details by default. If the searchResults are available, then display only search results
          searchResults ? showSearchResults(searchResults)
            : showProducts(productCategory)
        }
      </Container>
    </div>
  );
};

export default Products;
