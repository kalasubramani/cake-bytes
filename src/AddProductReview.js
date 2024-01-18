import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { Box, Button, Card, CardContent, CardMedia, Container, Rating, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddProductReview = ({ products }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [ratings, setRatings] = useState(0);
  // const [value, setValue] = React.useState(2);
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

    navigate("/thankforreview");
  }
  return (
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            sx={{ p: "1rem", width: "200px", height: "200px" }}
            image={`https://source.unsplash.com/random/?${product?.name}`}
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Add a headline for review"
                name="title"
                autoFocus
                value={title}
                onChange={(event)=>{setTitle(event.target.value)}}
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
                multiline
                rows={4}
                value={comments}
                onChange={(event)=>{setComments(event.target.value)}}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
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
