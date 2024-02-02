import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { Alert, Box, Button, Card, CardContent, CardMedia, Container, Rating, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddProductReview = ({ products }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [ratings, setRatings] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [hover, setHover] = React.useState(-1);


  const labels = {
    0.5: 'Would not recommend',
    1: 'Would not recommend',
    1.5: 'Poor',
    2: 'Poor',
    2.5: 'Ok',
    3: 'Ok',
    3.5: 'Good',
    4: 'Good',
    4.5: 'Excellent',
    5: 'Excellent',
  };


  //get the product id from url
  const { id } = useParams();

  //find selected product from products list
  const product = products?.find((product) => {
    return product.id === id;
  });

  //on form submit - add review to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ratings", ratings)
    if(ratings>0)
    {
    //create review obj to send to db
    const review = {
      title,
      comments,
      ratings,
      product_id: product.id,
    };

    const addreview = async (productId) => {
      await api.addProductReview(review, productId)
    }
    addreview(product.id);

    //clear form fields
    setRatings('');
    setTitle('');
    setComments('');
 
    navigate("/thankyou?sentFrom=Review");
  }else{
    setShowAlert(true);
  }
  }


  return (
    <Container component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          sx={{ p: "1rem", width: "200px", height: "200px" }}
          image={product.product_image}
          component="img"
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
          <Typography gutterBottom variant="caption" component="span">
            {product?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product?.description}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: "1rem" }}>
        <CardContent>
          <Typography variant="h5">Add your review for the product</Typography>
          <Box sx={{ mt: 1 }}>
            <Rating name="productRating"              
              placeholder="Rating is Required"
              value={ratings}
              precision={0.5}
              onChange={(event, newValue) => {
                setRatings(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {ratings !== null && (
              <Box sx={{ ml: ".35rem" }}>{labels[hover !== -1 ? hover : ratings]}</Box>
            )}
            {
              showAlert &&
              <Alert severity="error">Please provide ratings for the purchase.</Alert>
            }

            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Add a headline for review"
              inputProps={{ minLength: 4, maxLength: 50 }}
              name="title"
              autoFocus
              autoComplete="none"
              value={title}
              onChange={(event) => { setTitle(event.target.value) }}
              placeholder="Review title is Required"
            />
            <Typography variant="h6">Add a photo or video</Typography>
            <Typography variant="body2">Shoppers find images and videos more helpful than text alone.</Typography>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload file
              <input type="file" hidden />
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              name="comments"
              label="Add a review"
              id="comments"
              rows={4}
              autoFocus
              autoComplete="none"
              inputProps={{ minLength: 15, maxLength: 200 }}
              value={comments}
              onChange={(event) => { setComments(event.target.value) }}
              placeholder="Review comment is Required"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Review
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddProductReview;


