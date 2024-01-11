const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

//Added price and description into SQL
const createProduct = async(product)=> {
  const SQL = `
    INSERT INTO products (id, name, price, description,is_vip_product) 
    VALUES($1, $2, $3, $4,$5)
    RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name,product.price,product.description,product.is_vip_product]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct
};
