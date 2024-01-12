const {
  authenticate,
  findUserByToken,
  createUser,
  fetchAllCustomers
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn,isAdmin } = require('./middleware');


app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } 
  catch(ex){
    next(ex);
  }
});

//created server response 
app.post('/users/register',  async(req, res, next)=> {
  try {
    const response = await createUser(req.body);
    res.send(response);
  }
  catch(ex){
    next(ex);
  }
});


//fetch all customers for admin user login
app.get('/customers',isLoggedIn, isAdmin,async (req,res,next)=>{
  try{  
   res.send(await fetchAllCustomers())
  }catch(ex){
    next(ex)
  }
})


module.exports = app;
