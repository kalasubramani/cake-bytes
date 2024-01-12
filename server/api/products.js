const {
  fetchProducts, fetchReviews,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');
const { createReview } = require('../db/reviews');
const { createProduct, updateProduct } = require('../db/products');

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

//Add new product //
app.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  res.send(await createProduct(req.body));
});

//Edit a product//
 
app.put('/:id', isLoggedIn, isAdmin, async(req, res, next) => {
  try {
      res.send(await updateProduct({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }

})


//Fetch reviews for a given product
app.get('/:id/reviews', async (req, res, next)=> {   
    res.send(await fetchReviews(req.params.id));
});

//a logged in user - Adds review for a given product
app.post('/:id/reviews', isLoggedIn, async (req, res, next)=> {  
      res.send(await createReview(req.body));
  });



module.exports = app;
