import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { displayPrice } from "./Util";
import { Card, Container, CardContent, CardMedia, Typography, Divider, Paper, Rating } from "@mui/material";


const ProductDetails = ({ products, isLoggedIn }) => {
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
      <Card key={review.id} sx={{ width: "62rem", mt: "1rem", mb: "1rem", p: "1rem"}} variant="outlined">
        <Rating name="read-only" value={review.ratings} readOnly />
        <Typography>
          {review.comments}
        </Typography>

      </Card>
    );
  });

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }} maxWidth="xl">
        <Card sx={{ display: 'flex', width: "62rem" }}>
          <CardMedia
            sx={{ height: "25rem", p: "1rem" }}
            image={`https://source.unsplash.com/random/?${selectedProduct?.name}`}
            component="img"
          />
          <CardContent sx={{ width: "35rem" }}>
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
              {selectedProduct?.vip_price ? `${displayPrice.format(selectedProduct?.vip_price)}  **VIP only discount!**` : ""}
            </Typography>
            <Divider />
          </CardContent>

        </Card>

      </Container>
      <Container sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }} maxWidth="xl">
        <Paper sx={{ mt: "1rem", mb: "1rem", width: "62rem" }}>
          <Typography variant="h5" sx={{ p: "1rem" }}>
            Customer Reviews
          </Typography>
        </Paper>

        {productReviews?.length > 0 && productReviews}

      </Container>
      <div>

        {/* {productReviews.length > 0 ? ( */}
        {/* <div>          
          {isLoggedIn &&
            <button onClick={() => {
              navigate(`/products/${selectedProduct?.id}/review`);
            }}>Write a product review</button>
          }
          {productReviews?.length > 0 && <ul>{productReviews}</ul>}
        </div> */}
        {/* ) : (   */}
        {/* {!productReviews.length &&
          <div>
            <p>There are no reviews for this product.</p>
          </div>
        } */}
        {/* ) 
      }*/}
      </div>
    </>
  );
};

export default ProductDetails;
