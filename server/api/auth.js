const {
  authenticate,
  findUserByToken,
  createUser,
  fetchAllCustomers,
  updateUser,
  updateVipStatus,
  updateAddress,
  resetPassword
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin, isVip } = require('./middleware');
const axios = require('axios');
const { oAuthAuthenticate } = require('../db/auth');

app.post('/login', async (req, res, next) => {
  let token="";
  try {
    //If access token exists, do oauthlogic else do normal authentication
    if (req.body.oAuth?.access_token) {
      //oauth logic //make api call to GoogleUserProfile endpoint
      try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${req.body.oAuth.access_token}`,
              Accept: 'application/json'
            }
          })
        token = await oAuthAuthenticate(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      //normal password authentication
      token = await authenticate(req.body);
    }

    res.send({ token });
  }
  catch (ex) {
    next(ex);
  }
});

app.get('/me', isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  }
  catch (ex) {
    next(ex);
  }
});

//created server response 
app.post('/users/register', async (req, res, next) => {
  try {
    const response = await createUser(req.body);
    res.send(response);
  }
  catch (ex) {
    next(ex);
  }
});


//fetch all customers for admin user login
app.get('/customers', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.send(await fetchAllCustomers())
  } catch (ex) {
    next(ex)
  }
})

//update user db
app.put('/users/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await updateUser({ ...req.body, id: req.params.id }));
  } catch (ex) {
    next(ex);
  }

})

//update customers vip status in db
app.put('/users/:id/updatevipstatus', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.send(await updateVipStatus({ ...req.body, id: req.params.id }));
  } catch (ex) {
    next(ex);
  }

})

//update customers address in db
app.put('/users/:id/address', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await updateAddress({ ...req.body, id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
})

//update user password to DB
app.patch('/users/:id/password', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await resetPassword({ ...req.body, id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
})


module.exports = app;
