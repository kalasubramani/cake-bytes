const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

//insert reviews into table 
const createReview = async(review)=> {
  const SQL = `
  INSERT INTO reviews (comments,ratings,product_id,id) 
  VALUES($1, $2, $3,$4) 
  RETURNING *;
`;
 const response = await client.query(SQL, [review.comments,review.ratings, review.product_id,uuidv4()]);
 
  return response.rows[0];
};

//fetch all reviews
const fetchReviews = async(productId)=> { 
  const SQL = `
    SELECT *
    FROM reviews
    WHERE product_id=$1;
  `;
  const response = await client.query(SQL,[productId]);
 
  return response.rows;
};

module.exports = {
  createReview,
  fetchReviews
};