const {
  fetchOrders,
  updateOrder,
  fetchAllOrders
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.put('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await updateOrder({ ...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
}); 

app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchOrders(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

//fetch all orders, created a new route called /current for admin user
app.get('/current', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    res.send(await fetchAllOrders());
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;
