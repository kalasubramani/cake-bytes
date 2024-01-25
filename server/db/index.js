const client = require('./client')
const path = require('path')
const fs=require('fs')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  updateUser,
  createUser,
  authenticate,
  fetchAllCustomers,
  findUserByToken,
  updateVipStatus,
  resetPassword,
  fetchAddress,
  updateAddress
} = require('./auth');

const {
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
  fetchAllOrders
} = require('./cart');

const {
  createReview,
  fetchReviews
} = require('./reviews')

const {
  createWishlistItem,
  fetchWishlistItems,  
  deleteWishlistItem
} = require('./wishlist')

//load product images
const loadImage = (filepath)=>{
  return new Promise((resolve,reject)=>{
    const fullPath=path.join(__dirname,filepath);

    //read file
    fs.readFile(fullPath,'base64',(err,result)=>{
        if(err){
          reject(err) //sends back the error msg
        }else{
          resolve(`data:image/jpg;base64,${result}`) //read file and send back
        }
    })

  })
}

// add price and description into the products table..//add firstname and lastname to users table//add img to Product table
// added vip boolean into the users table
// modified vip boolean to price in the products table

const seed = async()=> {
  const product_image = await loadImage('./images/Chocolate.jpg');
  const skittle_image = await loadImage('./images/Skittles.jpg');

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
      is_vip BOOLEAN DEFAULT false NOT NULL,
      address_line1 VARCHAR(25),
      address_line2 VARCHAR(25),
      city VARCHAR(15),
      state VARCHAR(15),
      zip_code NUMERIC (5)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price NUMERIC (5,2) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100),
      vip_price NUMERIC (5,2) DEFAULT 0 NOT NULL,
      product_image TEXT
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
      title VARCHAR(255) NOT NULL,
      comments VARCHAR(255) NOT NULL,
      ratings NUMERIC NOT NULL,
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

  //Added addresses for all current users
  await Promise.all([
    updateAddress({ id: moe.id, address_line1: "4482 Lady Bug Dr", city: "Bronx", state: "NY", zip_code: "10458" }),
    updateAddress({ id: lucy.id, address_line1: "3730 Hartland Ave", city: "Fond Du Lac", state: "WI", zip_code: "54935" }),
    updateAddress({ id: ethyl.id, address_line1: "13 Ersel St", address_line2: "Apt. 5", city: "Smithboro", state: "IL", zip_code: "62284" })
  
  ]);

  //Added price and description
  //Modified VIP booleans to VIP prices
  //Added category to each product
  const [foo, bar, bazz,quq] = await Promise.all([

    createProduct({ name: 'Chocolate cake', price: 425.00, description: 'Yum, Yummy, Yummy, Yum', vip_price:382.5,category:'Birthdays',productImage:product_image}),
    createProduct({ name: 'Fudge cake', price: 425.00, description: 'Yum, Yummy, Yummy, Yum', vip_price:382.5,category:'Birthdays',productImage:skittle_image}),
    createProduct({ name: 'Pumpkin cake', price: 425.00, description: 'Yum, Yummy, Yummy, Yum',vip_price:382.5,category:'Holidays'}),
    createProduct({ name: 'Strawberry short cake', price: 425.00, description:'Yum, Yummy, Yummy, Yum',vip_price:382.5,category:'Holidays'}),
    createProduct({ name: 'Strawberry cake', price: 425.00, description:'Yum, Yummy, Yummy, Yum',vip_price:382.5,category:'Special Occassions'}),
    createProduct({ name: 'Vanilla Cupcakes', price: 425.00, description:'Yum, Yummy, Yummy, Yum',vip_price:382.5,category:'Cup Cakes'}),
    createProduct({ name: 'CHEESECAKE CUPCAKES', price: 425.00, description:'Yum, Yummy, Yummy, Yum',vip_price:382.5,category:'Cup Cakes'})

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
    createReview({ title:'Disappointed',comments: 'Cake was very soggy.	', ratings : 1,product_id: foo.id}),
    createReview({ title:'Awesome',comments: 'Oh! Heavenly cake !',ratings : 5,product_id: foo.id }),
    createReview({ title:'Loved it',comments: 'Was a hit at the bday party',ratings : 5,product_id: bar.id }),
    createReview({ title:'Good',comments: 'what a wonderfully dellicious cake.	',ratings : 4 ,product_id: quq.id}),
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
  fetchAllLineItems,
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
  updateVipStatus,
  resetPassword,
  fetchAddress,
  updateAddress,
  client
};
