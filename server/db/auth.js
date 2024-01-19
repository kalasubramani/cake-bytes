const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByToken = async(token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, firstname, lastname, username, is_admin, is_vip
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if(!response.rows.length){
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch(ex){
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const authenticate = async(credentials)=> {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if(!response.rows.length){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if(!valid){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

//updated to include VIP status
const createUser = async(user)=> {
  if(!user.username.trim() || !user.password.trim()){
    throw Error('must have username and password');
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
    INSERT INTO users (id, firstname, lastname, username, password, is_admin, is_vip) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), user.firstname, user.lastname, user.username, user.password, user.is_admin, user.is_vip ]);
  return response.rows[0];
};

//gets all customers
const fetchAllCustomers = async(user)=>{
  const SQL = `
  SELECT id, firstname, lastname, username, is_admin, is_vip
  FROM users
      `;
const response = await client.query(SQL);
return response.rows;
}

//declared updateUsers SQL... exported
const updateUser = async(user)=> {
  user.password = await bcrypt.hash(user.password, 5)
  const SQL = `
    UPDATE users
    SET  firstname = $1,
    lastname = $2,
    username = $3,
    password = $4,
    WHERE id = $5
    RETURNING *
  `;
  const response = await client.query(SQL, [ user.firstName, user.lastName, user.userName, user.password, user.user_id]);
  return response.rows[0];
};

//Admin to be able to make or remove User VIP status
//vipUser has userId and vipStatus
const updateVipStatus = async(vipUser) =>{
   const SQL = `
  UPDATE users
  SET 
  is_vip = $1
  WHERE id = $2
  RETURNING *
   `;
   const response = await client.query( SQL, [ vipUser.is_vip, vipUser.id]);
   return response.rows[0];

}

module.exports = {
  createUser,
  authenticate,
  findUserByToken,
  fetchAllCustomers,
  updateUser,
  updateVipStatus
};
