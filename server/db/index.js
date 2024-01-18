const client = require('./client')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  updateUser,
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
  fetchOrders,
  fetchAllOrders,
} = require('./cart');

const {
  createReview,
  fetchReviews
} = require('./reviews')

const {
  createWishlistItem,
  fetchWishlistItems,  
  deleteWishlistItem,
  updateNewCart,
} = require('./wishlist')


// add price and description into the products table..//add firstname and lastname to users table//add img to Product table
// added vip boolean into the users table
// modified vip boolean to price in the products table

const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS wishlist;
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
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price NUMERIC (5,2) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100),
      vip_price NUMERIC (5,2) DEFAULT 0 NOT NULL
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

    CREATE TABLE wishlist(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT user_and_product_key UNIQUE(user_id, product_id)
    );

  `;
  await client.query(SQL);

  //Added VIP status
  //Added firstname & lastname to columns to table
  const [moe, lucy, ethyl] = await Promise.all([
    createUser({firstname: "Moesha", lastname: "Norwood", username: 'moe', password: '1234', is_admin: false, is_vip: false }),
    createUser({ firstname: "Lucinda", lastname: "Hall", username: 'lucy', password: '1234', is_admin: false, is_vip: true }),
    createUser({ firstname: "Ethyleen", lastname: "Sims", username: 'ethyl', password: '1234', is_admin: true, is_vip: true })
  ]);

  //Added price and description
  //Modified VIP booleans to VIP prices
  //Added category to each product
  const [foo, bar, bazz,quq] = await Promise.all([

    createProduct({ name: 'Chocolate cake', price: 425.00, description: 'Yum, Yummy, Yummy, Yum', vip_price:382.5,category:'Birthdays'}),
    createProduct({ name: 'Fudge cake', price: 425.00, description: 'Yum, Yummy, Yummy, Yum', vip_price:382.5,category:'Birthdays'}),
    createProduct({ name: 'Pumpkin cake', price: 425.00, description: 'Yum, Yummy, Yummy, Yum', vip_price:0, category:'Holidays'}),
    createProduct({ name: 'Strawberry short cake', price: 425.00, description:'Yum, Yummy, Yummy, Yum', vip_price:0, category:'Holidays'}),
    createProduct({ name: 'Strawberry cake', price: 425.00, description:'Yum, Yummy, Yummy, Yum', vip_price:0, category:'Special Occassions'}),
    createProduct({ name: 'Vanilla Cupcakes', price: 425.00, description:'Yum, Yummy, Yummy, Yum', vip_price:0, category:'Cup Cakes'}),
    createProduct({ name: 'CHEESECAKE CUPCAKES', price: 425.00, description:'Yum, Yummy, Yummy, Yum', vip_price:0, category:'Cup Cakes'})

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

  //Created wishlist items for current users
  await Promise.all([
    createWishlistItem({ user_id: moe.id, product_id: bar.id }),
    createWishlistItem({ user_id: moe.id, product_id: bazz.id }),
    createWishlistItem({ user_id: lucy.id, product_id: bazz.id })
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
  fetchAllOrders,
  updateUser,
  createWishlistItem,
  fetchWishlistItems,
  deleteWishlistItem,
  client
};
