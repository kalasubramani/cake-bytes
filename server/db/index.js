const client = require('./client')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  fetchAllCustomers,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');

const {
  createReview,
  fetchReviews
} = require('./reviews')

// add price and description into the products table
const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS reviews;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      firstname VARCHAR(100) NOT NULL,
      lastname VARCHAR(100) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price NUMERIC (5,2) NOT NULL,
      description TEXT NOT NULL,
      is_vip_product BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      comments VARCHAR(255) NOT NULL,
      ratings INTEGER NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CHECK (ratings>0 AND ratings<6)
    );

  `;
  await client.query(SQL);
//Added firstname & lastname to columns to table
  const [moe, lucy, ethyl] = await Promise.all([
    createUser({firstname: "Moesha", lastname: "Norwood", username: 'moe', password: '1234', is_admin: false}),
    createUser({ firstname: "Lucinda", lastname: "Hall", username: 'lucy', password: '1234', is_admin: false}),
    createUser({ firstname: "Ethyleen", lastname: "Sims", username: 'ethyl', password: '1234', is_admin: true})
  ]);

  //Added price and description 
  const [foo, bar, bazz,quq] = await Promise.all([
    createProduct({ name: 'foo', price: 425.00, description:'Yum, Yummy, Yummy, Yum',is_vip_product:true}),
    createProduct({ name: 'bar', price: 425.00, description:'Yum, Yummy, Yummy, Yum',is_vip_product:true }),
    createProduct({ name: 'bazz', price: 425.00, description:'Yum, Yummy, Yummy, Yum',is_vip_product:false}),
    createProduct({ name: 'quq', price: 425.00, description:'Yum, Yummy, Yummy, Yum',is_vip_product:false }),
  ]);
  
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);

   //create review records
   await Promise.all([
    createReview({ comments: 'comments pencil tips breaks frequetly', ratings : 1,product_id: foo.id}),
    createReview({ comments: 'comments writes smoothly. Tips dont break',ratings : 5,product_id: foo.id }),
    createReview({ comments: 'comments Sturdy and strong for kids daily work',ratings : 5,product_id: bar.id }),
    createReview({ comments: 'comments marker dries off quickly',ratings : 2 ,product_id: quq.id}),
  ]);
  
};



module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,  
  findUserByToken,
  seed,
  fetchReviews,
  createUser,
  fetchAllCustomers,
  client
};
