const {
  fetchProducts, fetchReviews,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');
const { createReview } = require('../db/reviews');

//fetch all products
app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

//fetch product by Id
app.get('/:id', async(req, res, next)=> {
  try {
   res.send(req.params.id);
  }
  catch(ex){
    next(ex);
  }
});

//Add new product
app.put('/:id', isLoggedIn, isAdmin, (req, res, next)=> {
  res.send('hello world');
});

//Fetch reviews for a given product
// app.get('/:id/reviews', isLoggedIn, async (req, res, next)=> {
  app.get('/:id/reviews', async (req, res, next)=> {    
  res.send(await fetchReviews(req.params.id));
});

//Add reviews for a given product
// app.put('/:id/reviews', isLoggedIn, async (req, res, next)=> {
  app.post('/:id/reviews', async (req, res, next)=> {    
      res.send(await createReview(req.body));
  });



module.exports = app;
