const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, firstname, lastname, username, is_admin, is_vip, address_line1, address_line2, city, state, zip_code
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if (!response.rows.length) {
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch (ex) {
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const authenticate = async (credentials) => {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username.trim()]);
  if (!response.rows.length) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if (!valid) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

//oauth authentication- uses the userprofile from google response
//check if the user email exists in DB
//If user email exists in DB, return JWT token
//If user email does not exist in DB, create a new user using data from GoogleUserProfile
  //Then use the new user's email to generate JWT token
//return JWT token
const oAuthAuthenticate = async (credentials) => {
  const SQL = `
  SELECT id
  FROM users
  WHERE username = $1
`;
  const response = await client.query(SQL, [credentials.email.trim()]);
 
  if (!response.rows.length) {   
    const user = {
      firstname: credentials.given_name,
      lastname: credentials.family_name,
      username: credentials.email,
      password: null,
      is_admin: false,
      is_vip: false,
      oauth_enabled: true
    };
    const newUser = await createOAuthUser(user);
   
    return jwt.sign({ id: newUser.id }, process.env.JWT);
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
}

//Create a user in DB using the user profile details from oAuth
const createOAuthUser = async (user) => {
  const SQL = `
  INSERT INTO users (id, firstname, lastname, username, password, is_admin, is_vip, oauth_enabled) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
`;
  const response = await client.query(SQL, [uuidv4(), user.firstname, user.lastname, user.username, user.password, user.is_admin, user.is_vip, user.oauth_enabled]);
  return response.rows[0];
}

//updated to include VIP status
const createUser = async (user) => {
  if (!user.username.trim() || !user.password.trim()) {
    throw Error('must have username and password');
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
    INSERT INTO users (id, firstname, lastname, username, password, is_admin, is_vip, oauth_enabled) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), user.firstname, user.lastname, user.username, user.password, user.is_admin, user.is_vip, user.oauth_enabled]);
  return response.rows[0];
};

const updateAddress = async (user) => {
  const SQL = `
    UPDATE users 
    SET address_line1 = $1, 
    address_line2 = $2, 
    city = $3, 
    state = $4, 
    zip_code = $5
    WHERE id = $6 
    RETURNING *
  `;
  const response = await client.query(SQL, [user.address_line1, user.address_line2, user.city, user.state, user.zip_code, user.user_id]);
  return response.rows[0];
};

//gets all customers
const fetchAllCustomers = async (user) => {
  const SQL = `
  SELECT id, firstname, lastname, username, is_admin, is_vip
  FROM users ORDER BY LOWER(username)
      `;
  const response = await client.query(SQL);
  return response.rows;
}

//declared updateUsers SQL... exported
const updateUser = async (user) => {
  const SQL = `
    UPDATE users
    SET  firstname = $1,
    lastname = $2,
    username = $3
    WHERE id = $4
    RETURNING *
  `;
  const response = await client.query(SQL, [user.firstName, user.lastName, user.userName, user.user_id]);
  return response.rows[0];
};

//Admin to be able to make or remove User VIP status
//vipUser has userId and vipStatus
const updateVipStatus = async (vipUser) => {
  const SQL = `
  UPDATE users
  SET 
  is_vip = $1
  WHERE id = $2
  RETURNING *
   `;
  const response = await client.query(SQL, [vipUser.is_vip, vipUser.id]);
  return response.rows[0];

}

//reset password for a registered user
const resetPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, 5)
  const SQL = `
          UPDATE users
          SET 
          password=$1
          WHERE id = $2;`;
  const response = await client.query(SQL, [user.password, user.id])
  return response.rows[0];
}

module.exports = {
  createUser,
  authenticate,
  findUserByToken,
  fetchAllCustomers,
  updateUser,
  updateVipStatus,
  resetPassword,
  updateAddress,
  oAuthAuthenticate
};
