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
    INSERT INTO products (id, name, price, description, vip_price,category,product_image) 
    VALUES($1, $2, $3, $4, $5,$6,$7)
    RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.price, product.description, product.vip_price,product.category,product.productImage]);
  return response.rows[0];
};
//declared updateProduct SQL... exported
const updateProduct = async(product)=> {
  const SQL = `
    UPDATE products 
    SET  name = $1,
    price = $2,
    description = $3,
    vip_price =$4,
    product_image = $5,
    category = $6
    WHERE id = $7
    RETURNING *
  `;
  const response = await client.query(SQL, [ product.name,product.price,product.description,product.vip_price,product.productImage, product.category,product.id]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct,
};
