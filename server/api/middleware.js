const { findUserByToken } = require('../db');

const isLoggedIn = async(req, res, next)=> {
  try {
    const user = await findUserByToken(req.headers.authorization);
    req.user = user;
    next();
  }
  catch(ex){
    next(ex);
  }
};

const isAdmin = (req, res, next)=> {
  if(req.user.is_admin){
    next();
  }
  else {
    const error = Error('must be admin');
    error.status = 401;
    next(error);
  }
};

const isVip = (req, res, next)=> {
  if(req.user.is_vip){
    next();
  }
  else {
    const error = Error('must be vip');
    error.status = 401;
    next(error);
  }
  console.log("is VIP", isVip)
};

module.exports = { isLoggedIn, isAdmin, isVip }
