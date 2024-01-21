const {
  authenticate,
  findUserByToken,
  createUser,
  fetchAllCustomers,
  updateUser,
  updateVipStatus
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn,isAdmin, isVip } = require('./middleware');


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

//update user db
app.put('/users/:id', isLoggedIn, async(req, res, next) => {
  try {
      res.send(await updateUser({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }

})

//update customers vip status in db
app.put('/users/:id/updatevipstatus', isLoggedIn, isAdmin, async(req, res, next) => {
    try {
      res.send(await updateVipStatus({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }

})

module.exports = app;
