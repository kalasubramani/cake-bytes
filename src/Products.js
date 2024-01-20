import React, { useEffect, useState } from 'react';
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

  //to clear search as the user navigates along the menu items
  useEffect(()=>{
    setSearchResults();
  },[productCategory])

  //display search results in the page
  const showSearchResults = (searchResults) => {
    return searchResults?.length > 0 ? renderProducts(searchResults) : renderMessage();
  }

  const renderMessage = () => {
    return(    
    <Card sx={{ mt: "1rem", p: "1rem",width:"50rem" }} variant="outlined">
      <Typography variant='h6'>
        There are no products that matches the search.
      </Typography>
    </Card>
    );
  }

  const renderProducts = (productsToDisplay) => {
    return productsToDisplay?.map((product, index) => {
      const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
      return (
        <Card key={product.id} sx={{ width: "14rem" }}>
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
                  <IconButton size="small" sx={{ color: 'red' }} onClick={() => { cartItem ? createWishlistItem(cartItem) : deleteWishlistItem(product) }}><FavoriteBorderIcon /></IconButton>
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
      );
    })
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

    const allProducts = renderProducts(productsToDisplay)
    return allProducts;
  }

  return (
    <div>
      <h2>Products</h2>
      {/* key renders new searchbar everytime the product category changes */}
      <SearchBar key={`searchbar-for-${productCategory}`} searchList={products} onSearch={(results) => { setSearchResults(results) }} />
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
