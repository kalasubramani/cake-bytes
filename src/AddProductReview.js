import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";

const AddProductReview = ({ products }) => {
  const navigate = useNavigate();

  const [title,setTitle]= useState('');
  const [comments,setComments]=useState('');
  const [ratings,setRatings]=useState('');


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
      product_id:product.id,
    };
   
    const addreview = async (productId)=>{
      await api.addProductReview(review,productId)     
    }
    addreview(product.id);

    //clear form fields
    setRatings('');
    setTitle('');
    setComments('');

    navigate("/thankforreview");
  } 
  return (
    <div className="reviewContainer">
      <h3>Add your review for the product here</h3>
      <p>{product?.name}</p>
      {/* <img src={`../public/assets/${product.product_image_name}`}></img> */}
      <p>{product?.description}</p>
      <form onSubmit={handleSubmit}>
        <h3>Overall rating</h3>
        <select id="ratings" className="rating" onChange={(e)=>{setRatings(e.target.value)}} required>
            <option value="">Overall Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>         
        </select>
        <hr/>
        <h3>Add a headline for review</h3>
        <input type="text" className="reviewHeadline" required onChange={(e)=>{setTitle(e.target.value)}} placeholder="What's most important to know?"></input>
        <hr/>
        <h3>Add a photo or video</h3>
        <p>Shoppers find images and videos more helpful than text alone.</p>
        <hr/>
        <h3>Add a review</h3>
        <textarea className="reviewText" required onChange={(e)=>{setComments(e.target.value)}} placeholder="What did you like or dislike? Would you recommend this product to other customers?"></textarea>
        <hr/>
        <button className="reviewSubmit">Submit Review</button>
       
      </form>
    </div>
  );
};

export default AddProductReview;
