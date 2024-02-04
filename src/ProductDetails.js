import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { displayPrice } from "./Util";
import { Card, Container, CardContent, CardMedia, Typography, Rating, Button, Box, CardActions, Tooltip, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ProductDetails = ({ products, cartItems, createLineItem, updateLineItem, isLoggedIn, isAdmin, isProductInWishlist, createWishlistItem, deleteWishlistItem }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  //get the product id from url
  const { id } = useParams();

  //find selected product from products list
  const selectedProduct = products?.find((product) => {
    return product.id === id;
  });

  useEffect(() => {
    if (selectedProduct) {
      //fetch reviews from db
      const fetchReviews = async (productId) => {
        await api.fetchProductReviews(productId, setReviews);
      };
      fetchReviews(selectedProduct.id);
    }
  }, [selectedProduct]);

  const productReviews = reviews?.map((review) => {
    return (
      <Card key={review.id} sx={{ mt: "1rem", p: "1rem" }} variant="outlined">
        <Rating name="read-only" value={Number(review.ratings)} precision={0.5} readOnly />
        <Typography variant="h6">
          {review.title}
        </Typography>
        <Typography>
          {review.comments}
        </Typography>

      </Card>
    );
  });

  //need cart item details for add to cart functionality - to check if item is already added to cart
  const cartItem = cartItems.find(lineItem => lineItem.product_id === selectedProduct.id);

  return (

    selectedProduct && (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              sx={{ p: "1rem", width: "35rem"}}
              image={selectedProduct.product_image}
              component="img"
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
              <Typography gutterBottom variant="caption" component="span">
                {selectedProduct?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {selectedProduct?.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayPrice.format(selectedProduct?.price)}
              </Typography>
              <Typography variant="caption" className="vipDiscount">
                {selectedProduct?.vip_price > 0 ? `${displayPrice.format(selectedProduct?.vip_price)}  **VIP only discount!**` : ""}
              </Typography>

              {isLoggedIn &&
                <>
                  <CardActions>
                    {
                      isProductInWishlist(selectedProduct) ?
                        <Tooltip title="I changed my mind! Remove from Wishlist.">
                          <IconButton size="small" sx={{ color: 'red' }} onClick={() => { deleteWishlistItem(selectedProduct) }}><FavoriteIcon /></IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="I want this cake someday! Add to Wishlist.">
                          <IconButton size="small" onClick={() => { createWishlistItem(selectedProduct) }}><FavoriteIcon /></IconButton>
                        </Tooltip>
                    }

                    <Tooltip title="Add to Cart">
                      <IconButton size="small" onClick={() => { cartItem ? updateLineItem(cartItem) : createLineItem(selectedProduct) }}><ShoppingCartIcon /></IconButton>
                    </Tooltip>
                    {
                      isAdmin && (
                        <Tooltip title="Edit Product">
                          <IconButton size="small" onClick={() => { navigate(`/products/${selectedProduct.id}/edit`) }}><EditNoteIcon /></IconButton>
                        </Tooltip>
                      )
                    }
                  </CardActions>

                  <Box sx={{ mt: "auto", alignSelf: "end" }}>

                    <Typography variant="h6" >Review this product
                    </Typography>
                    <Typography variant="body2">Share your thoughts with other customers</Typography>
                    <Button sx={{ width: "fit-content", m: "auto", fontWeight: 700 }} onClick={() => { navigate(`/products/${selectedProduct.id}/review`) }}>Write a product review</Button>

                  </Box>
                </>

              }
            </CardContent>

          </Card>
          <Card sx={{ mt: "1rem" }} >
            <CardContent>
              <Typography variant="h5">
                Customer Reviews
              </Typography>
            </CardContent>
          </Card>
          {productReviews?.length > 0 ? productReviews :
            <Card sx={{ mt: "1rem", p: "1rem" }} variant="outlined">
              <Typography>
                There are no reviews for this product.
              </Typography>
            </Card>
          }
        </Container>
      </>
    )
  )

};

export default ProductDetails;
