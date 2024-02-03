const client = require('./client')
const path = require('path')
const fs = require('fs')

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
const loadImage = (filepath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filepath);

    //read file
    fs.readFile(fullPath, 'base64', (err, result) => {
      if (err) {
        reject(err) //sends back the error msg
      } else {
        resolve(`data:image/jpg;base64,${result}`) //read file and send back
      }
    })

  })
}

// add price and description into the products table..//add firstname and lastname to users table//add img to Product table
// added vip boolean into the users table
// modified vip boolean to price in the products table

const seed = async () => {
  // const beatlesCake_image = await loadImage('./images/beatles-cake.jpg');
  const beatlesCake_image = 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const rufflesCake_image = 'https://images.unsplash.com/photo-1511348398635-8efff213a280?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk0fHxmbG93ZXIlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const flashCake_image = 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D';
  const goldBlackCake_image = 'https://images.unsplash.com/photo-1582180834946-f3d376b18376?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8';
  const helloKitty_image = 'https://images.unsplash.com/photo-1571050045617-cbbd5e68d181?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8';
  const princessCake_image = 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGtpZHMlMjBiaXJ0aGRheSUyMGNha2VzfGVufDB8fDB8fHww';
  const rainbowCake_image = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtpZHMlMjBiaXJ0aGRheSUyMGNha2VzfGVufDB8fDB8fHww';
  const skittlesCake_image = 'https://images.unsplash.com/photo-1557979619-445218f326b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGJpcnRoZGF5JTIwQ2FrZXN8ZW58MHx8MHx8fDA%3D';
  const soccerDirtCake_image = 'https://images.unsplash.com/photo-1587015692860-f3a8481e9865?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5JTIwQ2FrZXN8ZW58MHx8MHx8fDA%3D';
  const unicornCake_image = 'https://images.unsplash.com/photo-1697157202877-622683269d7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const bunnyCake_image = 'https://images.unsplash.com/photo-1586221266208-e3cc0e170a60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJpcnRoZGF5JTIwQ2FrZXN8ZW58MHx8MHx8fDA%3D';
  const blossom_cake_image = 'https://images.unsplash.com/photo-1619413922783-13d5a4ed3e84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHxmbG93ZXIlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const batman_cake_image='https://images.unsplash.com/photo-1525097522700-a4b80b773931?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGNlbGVicmF0aW9uJTIwY2FrZXN8ZW58MHx8MHx8fDA%3D';
  const soccer_cake_image='https://plus.unsplash.com/premium_photo-1664206613176-26583f3c80f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29jY2VyJTIwY2FrZXN8ZW58MHx8MHx8fDA%3D';
 
  //cupcakes
  const coconutCupcake_image = 'https://images.unsplash.com/photo-1474625342403-1b8a2c0f7215?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGtpZHMlMjBiaXJ0aGRheSUyMGNha2VzfGVufDB8fDB8fHww';
  const cupcakeLetters_image = 'https://plus.unsplash.com/premium_photo-1663839412209-77c3eba0cf59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3VwY2FrZXN8ZW58MHx8MHx8fDA%3D';
  const earlGreyCupcakes_image = 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3VwY2FrZXN8ZW58MHx8MHx8fDA%3D';
  const elmoCupcakes_image = 'https://images.unsplash.com/photo-1623246123320-0d6636755796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN1cGNha2VzfGVufDB8fDB8fHww';
  const keylimeCupcakes_image = 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGN1cGNha2VzfGVufDB8fDB8fHww';
  const prettyInPinkCupcake_image = 'https://images.unsplash.com/photo-1603532553059-3facb851d937?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGN1cGNha2VzfGVufDB8fDB8fHww';
  const pooEmoji_image = 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VwY2FrZXN8ZW58MHx8MHx8fDA%3D';
  const chocolate_fudge_cupcake_image = 'https://images.unsplash.com/photo-1615832494873-b0c52d519696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQzfHxmbG93ZXIlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D';

  //holidays
  const flowerpotCupcakes_image = 'https://images.unsplash.com/photo-1600002415506-dd06090d3480?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGN1cGNha2VzfGVufDB8fDB8fHww';
  const halloweenCupcakes_image = 'https://images.unsplash.com/photo-1638258906751-4e09d7f334dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhhbGxvd2VlbiUyMGN1cGNha2VzfGVufDB8fDB8fHww';
  const christmasTrainCakes_image = 'https://images.unsplash.com/photo-1595930142063-797ef7b5bbbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNocmlzdG1hcyUyMENha2VzfGVufDB8fDB8fHww';
  const mistletoeCake_image = 'https://images.unsplash.com/photo-1626803775151-61d756612f97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const snowHouseCake_image = 'https://images.unsplash.com/photo-1576956555607-18c2df9a47f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hyaXN0bWFzJTIwY2FrZXN8ZW58MHx8MHx8fDA%3D';
  const thanksgivingCake_image = 'https://images.unsplash.com/photo-1702745100328-fe7a353d11e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHB1bXBraW4lMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const valentinesDayCake_image = 'https://plus.unsplash.com/premium_photo-1674068280486-d1dedf4a56e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHx2YWxlbnRpbmUlMjBDYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const yellow_cakesicles_image = 'https://images.unsplash.com/photo-1693464347973-12f8aacb9c31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGdlbmRlciUyMHJldmVhbCUyMGNha2VzfGVufDB8fDB8fHww';
  const fall_pastries_image = 'https://images.unsplash.com/photo-1696902686522-a6cb8babe5a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFsbCUyMGNha2VzfGVufDB8fDB8fHww';
  
  //special occasions
  const babyBabyCake_image = 'https://images.unsplash.com/photo-1605499502603-e7a7866a9066?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxiaXJ0aGRheSUyMENha2VzfGVufDB8fDB8fHww';
  const jungleCake_image = 'https://plus.unsplash.com/premium_photo-1667761256003-69273b261bce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHdlZGRpbmclMjBDYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const cactusCake_image = 'https://images.unsplash.com/photo-1533864584121-714289e0e746?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FjdHVzJTIwQ2FrZXN8ZW58MHx8MHx8fDA%3D';
  const flowerCake_image = 'https://images.unsplash.com/photo-1578237407404-cbe8d05e2300?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJpcnRoZGF5JTIwQ2FrZXN8ZW58MHx8MHx8fDA%3D';
  const maybeImCrazyCake_image = 'https://images.unsplash.com/photo-1694837492769-76b4b4a87f17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByZXR0eSUyMENha2VzfGVufDB8fDB8fHww';
  const fig_mountainCake_image = 'https://images.unsplash.com/photo-1565661834013-d196ca46e14e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHdlZGRpbmclMjBDYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const oreoCake_image = 'https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdlZGRpbmclMjBDYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const peonyCake_image = 'https://images.unsplash.com/photo-1557803056-4acbacad87d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxiaXJ0aGRheSUyMENha2VzfGVufDB8fDB8fHww';
  const weddingCake_image = 'https://plus.unsplash.com/premium_photo-1674498802496-c9a5983ef176?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlZGRpbmclMjBDYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const weddingcake_flowers_image='https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZsb3dlciUyMGNha2VzfGVufDB8fDB8fHww';
  const fathers_day_cupcake_image ='https://images.unsplash.com/photo-1555526148-0fa555bb2e78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGN1cGNha2VzfGVufDB8fDB8fHww';
  const baby_shower_cake_image= 'https://images.unsplash.com/photo-1644785421461-33fa77c147d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhYnklMjBzaG93ZXIlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D';
  const mango_cake_image = 'https://images.unsplash.com/photo-1688458297155-228a3b1e5b49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuZ28lMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D';

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
    createUser({ firstname: "Moesha", lastname: "Norwood", username: 'moe', password: '1234', is_admin: false, is_vip: false }),
    createUser({ firstname: "Lucinda", lastname: "Hall", username: 'lucy', password: '1234', is_admin: false, is_vip: true }),
    createUser({ firstname: "Ethyleen", lastname: "Sims", username: 'ethyl', password: '1234', is_admin: true, is_vip: true })
  ]);

  //Added addresses for all current users
  await Promise.all([
    updateAddress({ user_id: moe.id, address_line1: "4482 Lady Bug Dr", city: "Bronx", state: "NY", zip_code: "10458" }),
    updateAddress({ user_id: lucy.id, address_line1: "3730 Hartland Ave", city: "Fond Du Lac", state: "WI", zip_code: "54935" }),
    updateAddress({ user_id: ethyl.id, address_line1: "13 Ersel St", address_line2: "Apt. 5", city: "Smithboro", state: "IL", zip_code: "62284" })

  ]);

  //Added price and description
  //Modified VIP booleans to VIP prices
  //Added category to each product
  const [foo, bar, bazz, quq] = await Promise.all([

    createProduct({ name: 'Adorable Dreams', price: 425.00, description: "This cake is not just a treat for the taste buds but a feast for the eyes. Perfect for capturing adorable moments with the birthday baby. Soft pastels with touches of baby blue, pink, and sunshine yellow.  Layers of moist vanilla sponge filled with light and fluffy strawberry cream, capturing the essence of pure sweetness.", vip_price: 382.5, category: 'Special Occasions', productImage: babyBabyCake_image }),
    createProduct({ name: 'Decadent Chocolate Bliss', price: 200.00, description: ' Indulge in the rich and velvety layers of our Decadent Chocolate Bliss cake. Each bite is a symphony of deep, dark chocolate flavors that dance on your taste buds, creating a sensory celebration for chocolate enthusiasts. Adorned with a dusting of cocoa powder and dark chocolate curls, this cake is a visual feast as much as it is a culinary delight. Perfect for any occasion, this chocolate masterpiece is equally suitable for intimate gatherings, birthdays, or as a decadent treat for no reason at all.', vip_price: 0, category: 'Birthdays', productImage: beatlesCake_image }),
    createProduct({ name: 'Safari Adventure Delight', price: 350.00, description: "Embark on a wild journey with our Safari Adventure Delight, a jungle-themed cake that brings the magic of the wild right to your celebration.Vibrant greens, earthy browns, and pops of tropical colors create a visually stunning edible jungle landscape. Adorable edible giraffes, lions, elephants, and monkeys peek out from lush fondant foliage, adding a touch of safari charm. The cake layers transport you to a delicious jungle scene, with edible 'mud' frosting at the base, chocolate 'rocks' scattered around, and a river of blue fondant winding its way through the tiers. ", vip_price: 0, category: 'Special Occasions', productImage: jungleCake_image }),
    createProduct({ name: 'Desert Bloom Delight', price: 300.00, description: ' Immerse yourself in the beauty of the desert with our "Desert Bloom Delight" cactus-themed cake. Beneath the edible succulents lies a delectable surprise. Layers of moist vanilla sponge complemented by a subtle hint of prickly pear or agave nectar-infused filling, creating a harmonious blend of flavors.', vip_price: 0, category: 'Special Occasions', productImage: cactusCake_image }),
    createProduct({ name: 'Frosty Spirits Elegance', price: 150.00, description: `Our "Frosty Spirits Elegance" Winter Rum Cake is a delightful celebration of the season's charm, bringing together the cozy warmth of winter with the rich, spirited essence of rum.The cake is draped in a velvety layer of winter-white fondant, resembling freshly fallen snow, creating a picturesque canvas for the seasonal masterpiece. `, vip_price: 135.00, category: 'Holidays', productImage: christmasTrainCakes_image }),
    createProduct({ name: 'Effervescent Elegance', price: 150.00, description: 'Our "Effervescent Elegance" Pink Champagne Cupcakes are a celebration in every bite, boasting a delicate pink hue that adds a touch of sophistication to any occasion. Complementing the champagne infusion is a hint of fresh strawberry puree, adding a sweet and fruity note that perfectly harmonizes with the bubbly undertones.', vip_price: 135.00, category: 'Cupcakes', productImage: cupcakeLetters_image }),
    createProduct({ name: 'Velvet Indulgence', price: 75.00, description: 'Dive into a world of culinary luxury with our "Velvet Indulgence" Red Velvet Cupcakes. The signature deep red hue of these cupcakes is a visual prelude to the indulgence that awaits. Perfect for any occasion, from casual gatherings to formal celebrations. "Velvet Indulgence" Red Velvet Cupcakes are a versatile treat that elevates every moment.', vip_price: 0, category: 'Cupcakes', productImage: earlGreyCupcakes_image }),
    createProduct({ name: 'Waffle Cap Delights', price: 100.00, description: 'Indulge in the perfect marriage of breakfast comfort and dessert luxury with our "Waffle Cap Delights" cupcakes. These treats seamlessly blend the warmth of waffles with the sweetness of cupcakes. The cupcakes boast a light and fluffy texture, mirroring the delicate crispiness of waffles. The golden-brown edges add a charming visual appeal, inviting you to savor every bite.', vip_price: 0, category: 'Cupcakes', productImage: elmoCupcakes_image }),
    createProduct({ name: 'Ruffled Elegance', price: 400.00, description: `Our "Ruffled Elegance Masterpiece" is a visual feast that combines the art of baking with the grace of intricate design. Each layer is meticulously adorned with delicate fondant or frosting ruffles, creating a stunning display of culinary craftsmanship.  Choose from a spectrum of colors that harmonize with your celebration theme. Whether it's soft pastels, vibrant hues, or a monochromatic masterpiece, the Ruffles Cake is customizable to suit your taste.`, vip_price: 360.00, category: 'Birthdays', productImage: rufflesCake_image }),
    createProduct({ name: 'Pistachio Bliss', price: 150.00, description: 'Revel in the perfect balance of nuttiness and sweetness, as the pistachio-infused cake layers unfold a delicate flavor profile. The cake boasts a velvety texture that melts in your mouth, creating a luxurious and satisfying sensation. The pistachio essence enhances the overall richness, making it a true treat for the senses.', vip_price: 0, category: 'Birthdays', productImage: flashCake_image }),
    createProduct({ name: 'Blooms of Elegance', price: 200.00, description: `The color palette mirrors the soft hues of a spring garden—pastel pinks, blues, and greens. It's a visual feast that evokes the freshness and vibrancy of blooming flowers in full bloom.  Whether it's a wedding, bridal shower, or a birthday celebration, "Blooms of Elegance" adds a touch of natural beauty and sophistication to any special occasion.`, vip_price: 180.00, category: 'Special Occasions', productImage: flowerCake_image }),
    createProduct({ name: "Botanical Blooms Delight", price: 250.00, description: "Each cupcake is a miniature masterpiece, featuring delicately crafted edible flowers that bloom in a symphony of colors and shapes. From daisies to lavender buds, every petal is a work of art. Whether it's a lavender-infused vanilla, rose-petal kissed frosting, or a hibiscus-infused surprise, the flavors are as delicate and delightful as the flowers themselves.", vip_price: 225.00, category: 'Holidays', productImage: flowerpotCupcakes_image }),
    createProduct({ name: 'Rose Dreams', price: 150.00, description: `Our "Rose Petal Dreams" birthday cake is a breathtaking creation that brings the timeless beauty of roses to the forefront. Layers of moist cake are adorned with delicate fondant roses, creating a sumptuous and visually stunning centerpiece for your celebration. Delight in the subtle infusion of rose essence within each layer. The cake's flavor profile mirrors the delicate fragrance of roses, offering a sensory experience that is both indulgent and refined.`, vip_price: 0, category: 'Birthdays', productImage: goldBlackCake_image }),
    createProduct({ name: 'Haunted Delights', price: 150.00, description: ` Our "Haunted Delights" Halloween cupcakes are a wickedly delightful treat that brings the spirit of Halloween to your taste buds. Each bite is a journey through a world of spooky flavors and festive fun. Delve into the rich and decadent chocolate flavors that make these cupcakes a sinister delight. Each cupcake is generously crowned with a tangy lime frosting, mimicking the signature tartness of a Margarita. `, vip_price: 0, category: 'Holidays', productImage: halloweenCupcakes_image }),
    createProduct({ name: 'Classic Vanilla Celebration', price: 200.00, description: 'Dive into layers of moist and velvety vanilla sponge that offer a delicate crumb and a melt-in-your-mouth experience. Savor the rich aroma and distinct sweetness of Madagascar vanilla, infusing every bite with a warm and comforting essence. The cake is generously coated with a luscious layer of smooth vanilla buttercream, adding a creamy and dreamy finish. ', vip_price: 0, category: 'Birthdays', productImage: helloKitty_image }),
    createProduct({ name: 'Citrus Splash Delight', price: 100.00, description: ` Our "Citrus Splash Delight" Margarita Cupcakes are a sweet tropical escape in every bite. Inspired by the classic cocktail, these cupcakes bring the lively and refreshing flavors of a Margarita to your dessert table. `, vip_price: 0, category: 'Cupcakes', productImage: keylimeCupcakes_image }),
    createProduct({ name: "Gone Wild", price: 250.00, description: "Brace yourself for a wild flavor adventure! Each layer of this crazy cake is a different explosion of flavors, from cotton candy dreams to zesty citrus twirls, creating a rollercoaster for your taste buds.", vip_price: 0, category: 'Special Occasions', productImage: maybeImCrazyCake_image }),
    createProduct({ name: 'Fusion Delight', price: 300.00, description: 'Experience a delightful crunch with every mouthful as an assortment of nuts—walnuts, almonds, and hazelnuts—adds a layer of nutty perfection. The nuts are generously scattered throughout the cake, creating a textural masterpiece that adds depth to each slice. ', vip_price: 0, category: 'Holidays', productImage: mistletoeCake_image }),
    createProduct({ name: 'Figgy Elegance ', price: 300.00, description: 'Immerse yourself in the indulgent flavor of ripe figs that permeate every layer of the cake. From the sponge to the filling, the essence of figs adds a subtle sweetness and earthy depth that tantalizes the taste buds.', vip_price: 0, category: 'Special Occasions', productImage: fig_mountainCake_image }),
    createProduct({ name: 'Cookie Delight', price: 150.00, description: 'The entire cake is enveloped in a cloud of whipped vanilla frosting, adding a light and airy touch to the indulgent treat. The vanilla complements the chocolate and Oreo flavors, creating a well-rounded and delightful dessert. This Oreo Cookies Cake is a guaranteed hit at any celebration.', vip_price: 0, category: 'Special Occasions', productImage: oreoCake_image }),
    createProduct({ name: 'Blushing Blossom', price: 150.00, description: 'The cupcakes boast a light and airy vanilla base that perfectly complements the gentle pink tones. The subtle sweetness creates a delightful harmony that dances on the taste buds with every bite.', vip_price: 0, category: 'Cupcakes', productImage: prettyInPinkCupcake_image }),
    createProduct({ name: 'Petals & Macaron Whispers', price: 250.00, description: "The cake features layers of velvety pink sponge, delicately infused with a hint of vanilla. Each bite is a journey through a cloud-like crumb, creating a sensation of pure indulgence. Adorning the cake are an array of dainty macarons, gracefully cascading down the sides like edible jewels. The macarons, in shades complementing the pastel pink, add a touch of French elegance and whimsy to the overall design.", vip_price: 0, category: 'Birthdays', productImage: princessCake_image }),
    createProduct({ name: 'Rainbow Symphony', price: 200.00, description: `A cascade of edible confetti in matching rainbow shades adorns the top, creating a festive rain of colors. The confetti is a joyful touch that adds movement and excitement to the cake's presentation.  Each bite is a delightful journey through the rainbow spectrum.`, vip_price: 180.00, category: 'Birthdays', productImage: rainbowCake_image }),
    createProduct({ name: 'Candy Kaleidoscope', price: 200.00, description: 'This cake is a celebration of color, fun, and the irresistible crunch of these candy-coated chocolate gems. Adorning the cake are cascading waterfalls of M&M candies in every color of the rainbow. The candies create a playful and dynamic design, ensuring that each slice is a delightful journey through a candy wonderland.', vip_price: 0, category: 'Birthdays', productImage: skittlesCake_image }),
    createProduct({ name: 'Enchanting Peony', price: 200.00, description: "The color palette of soft pinks, creams, and blush tones mirrors the delicate hues of peonies in full bloom. The cake exudes a sense of romance and sophistication, making it a perfect centerpiece for weddings, anniversaries, or any celebration of love.", vip_price: 0, category: 'Special Occasions', productImage: peonyCake_image }),
    createProduct({ name: 'Gingerbread Frost', price: 200.00, description: ' Edible gingerbread houses, adorned with intricate icing details, create a charming village scene atop the cake. ', vip_price: 0, category: 'Holidays', productImage: snowHouseCake_image }),
    createProduct({ name: 'Wafer Bliss', price: 200.00, description: "Surrounding the cake sits a crown of wafer rolls, standing tall and proud. These wafer roll peaks invite you to embark on a delightful journey of alternating textures — the smoothness of chocolate, the moistness of cake, and the satisfying crunch of wafer rolls.", vip_price: 0, category: 'Birthdays', productImage: soccerDirtCake_image }),
    createProduct({ name: 'Harvest Spice Delight', price: 200.00, description: 'Immerse yourself in a symphony of spices — cinnamon, nutmeg, and cloves — that dance together harmoniously. The warm spices complement the pumpkin, creating a medley of flavors that evokes the nostalgia of autumn gatherings and cozy evenings by the fireplace.', vip_price: 0, category: 'Holidays', productImage: thanksgivingCake_image }),
    // createProduct({ name: 'Unicorn Cake', price: 200.00, description: 'This delightful unicorn cake is cute and yummy! Inside, you will find a plethora of colored vanilla cake layers, ranging from red to purple. Sweet vanilla frosting coats the outside, with adorable unicorn decorations, perfect for the young ones in your life.', vip_price: 0, category: 'Birthdays', productImage: unicornCake_image }),
    // createProduct({ name: 'Hearts Cake', price: 150.00, description: "This heart-shaped cake is perfect for Valentine’s day. Its moist layers of pink velvet cake are alternated with a juicy jam filling. The outside is enveloped in decadent raspberry buttercream, with carefully piped flowers.", vip_price: 135.00, category: 'Holidays', productImage: valentinesDayCake_image }),
    // createProduct({ name: 'Peaches & Cream Wedding Cake', price: 500.00, description: 'This four tiered wedding cake is composed of buttermilk cake, peach buttercream, and filled with peach compote.  The outside is covered in a silky French vanilla buttercream.  Delicate handmade flowers wrap around the outside of the cake.', vip_price: 0, category: 'Special Occasions', productImage: weddingCake_image }),
    // createProduct({ name: 'Bunny Cake', price: 250.00, description: 'An adorable birthday cake for the young ones in your life, with looks that are most uncanny to a real koala. Is it a koala, or is it cake? No one knows! Rich chocolate cake is topped with a velvety caramel buttercream, finished with koala and flower decorations.', vip_price: 225.00, category: 'Birthdays', productImage: bunnyCake_image }),
    // createProduct({ name: 'Cupcakes with Gems', price: 100.00, description: 'This elevated cupcake starts with a chocolate cake drizzled with a rum soak.  The top features a smooth coconut almond frosting sprinkled with toasted coconut for extra crunch.', vip_price: 0, category: 'Cupcakes', productImage: coconutCupcake_image }),
    // createProduct({ name: 'Chocolate Cupcakes', price: 150.00, description: 'These whimsical cupcakes are sure to get a smile at any event.  They are made with a chocolate cake and a milk chocolate frosting that will make any chocolate lover happy.', vip_price: 135.00, category: 'Cupcakes', productImage: pooEmoji_image }),
    // createProduct({ name: 'Wedding Cake', price: 500.00, description: 'This four tiered wedding cake is composed of buttermilk cake, peach buttercream, and filled with peach compote.  The outside is covered in a silky French vanilla buttercream.  Delicate handmade flowers wrap around the outside of the cake.', vip_price: 0, category: 'Special Occasions', productImage: weddingcake_flowers_image }),
    // createProduct({ name: 'Blossom Cake', price: 250.00, description: 'An adorable birthday cake for the young ones in your life, with looks that are most uncanny to a real subflower. Rich chocolate cake is topped with a velvety caramel buttercream, finished with rustic and flower decorations.', vip_price: 225.00, category: 'Birthdays', productImage: blossom_cake_image }),
    // createProduct({ name: 'Chocolate Fudge Cupcakes', price: 150.00, description: 'These fudge cupcakes are sure to get a smile at any event.  They are made with a chocolate cake and a milk chocolate frosting that will make any chocolate lover happy.', vip_price: 135.00, category: 'Cupcakes', productImage: chocolate_fudge_cupcake_image }),
    // createProduct({ name: 'Fathers Day Cupcake', price: 150.00, description: 'These cupcakes are a must for those wonderful dads.  The vanilla cupcake base is filled with raspberry jam. It is then covered with a creamy raspberry frosting, which is then topped with a white chocolate and raspberry candy shard.', vip_price: 0, category: 'Cupcakes', productImage: fathers_day_cupcake_image }),
    // createProduct({ name: 'Batman Cake', price: 350.00, description: "This cake is a must for all those batman fans!  The figures can be customized upton request.  At the bottom, there is a chocolate chip cake and frosting layer on top.", vip_price: 0, category: 'Birthdays', productImage: batman_cake_image }),
    // createProduct({ name: 'Soccer Cake', price: 200.00, description: 'This sports themed cake is perfect for the Soccer fanatic in your life. On the inside, layers of thick chocolate cake are covered with a salted caramel buttercream. On the outside of the cake, you have yummy white chocolate frosting, with carefully piped decorations.', vip_price: 0, category: 'Birthdays', productImage: soccer_cake_image }),
    // createProduct({ name: 'Yellow Cakesicles', price: 10.00, description: 'This cakesicle is perfect for any special birthday parties or anniversaries.  This can easily be decorated with the topper of your choice.  The frosting is a silky vanilla buttercream layered between rich vanilla pound cake, ensuring it is a delicious cake that everyone will enjoy.', vip_price: 0, category: 'Special Occasions', productImage: yellow_cakesicles_image }),
    // createProduct({ name: 'Baby Shower Cake', price: 455.00, description: "This adorable baby shower cake can be customized in pink, blue, or as seen here, gender-neutral yellow. The interior can also be customized to pink or blue making a great gender-reveal cake. The cake itself is flavored with Mexican vanilla and a hint of cinnamon.", vip_price: 382.5, category: 'Special Occasions', productImage: baby_shower_cake_image }),
    // createProduct({ name: 'Fall Pastries', price: 100.00, description: 'This fall pastry is a delight.  The base is lightly flavored with pistachios.', vip_price: 0, category: 'Holidays', productImage: fall_pastries_image }),
    // createProduct({ name: 'Mango Cake', price: 120.00, description: 'This mango is perfect for any special birthday parties or anniversaries.  This is decorated with fresh mango slices.  The frosting is a silky vanilla buttercream layered between rich vanilla pound cake, ensuring it is a delicious cake that everyone will enjoy.', vip_price: 0, category: 'Special Occasions', productImage: mango_cake_image }),
    
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id });
  cart.is_cart = false;
  await updateOrder(cart);

  //create review records
  await Promise.all([
    createReview({ title: 'Disappointed', comments: 'Cake was very soggy.	', ratings: 1, product_id: foo.id }),
    createReview({ title: 'Awesome', comments: 'Oh! Heavenly cake !', ratings: 5, product_id: foo.id }),
    createReview({ title: 'Loved it', comments: 'Was a hit at the bday party', ratings: 5, product_id: bar.id }),
    createReview({ title: 'Good', comments: 'what a wonderfully dellicious cake.	', ratings: 4, product_id: quq.id }),
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
