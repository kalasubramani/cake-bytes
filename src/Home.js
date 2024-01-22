import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Route, Routes, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSideMenu from './AppSideMenu';
import FeaturedProducts from './FeaturedProducts';
import FrequentlyBought from './FrequentlyBought';
import api from './api';
import Cart from './Cart';
import Products from './Products';
import ProductDetails from './ProductDetails';
import EditAProductMUI from './EditAProductMUI';
import AddProductReview from './AddProductReview';
import ThankForReview from './ThankForReview';
import AddNewProduct from './AddNewProduct';
import AllCustomers from './AllCustomers';
import ProfileSettings from './ProfileSettings';
import Orders from './Orders';
import Wishlist from './Wishlist';
import ThankYou from './ThankYou';
import SignUp from './SignUp';
import Checkout from './Checkout';
import UserProfileMUI from './UserProfileMUI';


// https://www.svgrepo.com/svg/419438/baked-cake-cup
// https://www.svgrepo.com/svg/404839/birthday-cake
// https://www.svgrepo.com/svg/501917/cake
// https://www.svgrepo.com/svg/501915/dialog-box

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ffc107'
    },
    secondary: {
      main: '#ff9100'
    },
  },
});

const Home = ({ user, logout, setUser }) => {
  const isLoggedIn = !!user?.id;
  const isAdmin = user?.is_admin;
  const isVip = user?.is_vip;

  //add use state for all dependent modules
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);



  //fetch all products from db
  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  //fetch all orders for the logged in user from db
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  //fetch all orders from db for the admin user
  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      const fetchData = async () => {
        await api.fetchAllOrders(setAllOrders);
      };
      fetchData();
    }
  }, [isLoggedIn, isAdmin]);

  //fetchl all line items for logged in user
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  //fetch wishlist items for the logged in user
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        await api.fetchWishlistItems(setWishlistItems);
      };
      fetchData();
    }
  }, [isLoggedIn]);



  //create new line  in db
  const createLineItem = async (product) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems });
  };

  //update existing line item in db
  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async (order) => {
    await api.updateOrder({ order, setOrders });
  };

  //remove items from cart
  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  //create api connection for removing a single item
  const removeOneItem = async (lineItem) => {
    await api.removeOneItem({ lineItem, cart, lineItems, setLineItems });
  };

  //find all items in cart
  const cart = orders.find((order) => order.is_cart) || {};

  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );

  const cartCount = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  //create an api route to add an item to a users wishlist
  const createWishlistItem = async (product) => {
    await api.createWishlistItem(user, product, wishlistItems, setWishlistItems);
  };

  //create an api route to delete an item from a users wishlist
  const deleteWishlistItem = async (wishlistItem) => {
    await api.deleteWishlistItem(wishlistItem, wishlistItems, setWishlistItems)
  };

  //checks product already in cart and return the corresponding line item
  const getCartItem = (productId) => {
    return cartItems.find(lineItem => lineItem.product_id === productId);
  }

  const getOrderDetails = () => {
    //get list of placed orders
    const placedOrders = orders.filter(order => order.is_cart).map((order) => { return order.id });
    const hasOrders = placedOrders?.length > 0;
    //For all placed orders - get product id from line item
    const orderLineItems = lineItems.filter((lineItem) => placedOrders.includes(lineItem.order_id));
    //for each filtered line item, get all required data from products (name,quantity purchased,order id, order , product id)
    /* passed in price:product.price to pull price info from products to be caluculated in the total order price*/
    const orderedProducts = orderLineItems.map((lineItem) => {

      const product = products.find(product => product.id === lineItem.product_id);
      return { name: product.name, description: product.description, quantity: lineItem.quantity, price: product.price, orderId: lineItem.order_id, id: product.id }
    })
    return orderedProducts;
  }

  const placeOrder=()=>{
    updateOrder({...cart, is_cart: false });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', minHeight: "100vh" }}>
        <CssBaseline />
        <AppHeader isLoggedIn={isLoggedIn} logout={logout} cartCount={cartCount} />
        <AppSideMenu isAdmin={isAdmin} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            // height: '100vh',
            overflow: 'auto',
            paddingTop: '5rem'
          }}
        >

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              {/* display landing page as home page for all users */}
              <Route path="/" element={
                <>
                  <FeaturedProducts />
                  <FrequentlyBought />
                </>
              }></Route>
              {/* display products and product details for all users */}
              <Route
                path="/products"
                element={
                  <Products
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                    createWishlistItem={createWishlistItem}
                    deleteWishlistItem={deleteWishlistItem}
                  />
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProductDetails
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                  />
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/thankyou" element={<ThankYou />} />
              {isLoggedIn &&
                <>
                  <Route path="/user-profile" element={<UserProfile user={user} wishlistItems={wishlistItems} products={products}  cartItems={cartItems}  createWishlistItem={createWishlistItem}
                    deleteWishlistItem={deleteWishlistItem}/>}></Route>
                  <Route 
                    path="/user-profile_mui" 
                    element={
                      <UserProfileMUI 
                        user={user} 
                        wishlistItems={wishlistItems} 
                        products={products}  
                        cartItems={cartItems}  
                        createWishlistItem={createWishlistItem}
                        deleteWishlistItem={deleteWishlistItem}
                        orders={orders} 
                        lineItems={lineItems} 
                        getCartItem={getCartItem} 
                        createLineItem={createLineItem} 
                        updateLineItem={updateLineItem}
                      />
                    }>
                  </Route>
                  <Route
                    path="/cart"
                    element={
                      <Cart
                        cart={cart}
                        lineItems={lineItems}
                        products={products}
                        updateOrder={updateOrder}
                        removeFromCart={removeFromCart}
                        removeOneItem={removeOneItem}
                        updateLineItem={updateLineItem}
                        isVip={isVip}
                      />
                    }
                  />

                  <Route path="/products/:id/edit" element={<EditAProductMUI products={products} setProducts={setProducts} />} />
                  <Route
                    path="/products/:id/review"
                    element={<AddProductReview products={products} />}
                  />
                  {/* added route for wishlist */}
                  {/* <Route
                    path="/wishlist"
                    element={<Wishlist wishlistItems={wishlistItems} products={products}/>}
                  /> */}
                  <Route path="/thankforreview" element={<ThankForReview />} />
                  <Route path="/settings" element={<ProfileSettings user={user} setUser={setUser} />}></Route>
                  <Route
                    path="/orders"
                    element={
                      <Orders
                        orders={orders}
                        products={products}
                        lineItems={lineItems}
                        getCartItem={getCartItem}
                        createLineItem={createLineItem}
                        updateLineItem={updateLineItem}
                      />
                    }
                  />
                  <Route path="/:orderid/checkout" element={<Checkout getOrderDetails={getOrderDetails} placeOrder={placeOrder}/>} />
                  {isAdmin && (
                    <>
                      <Route path='/orders-admin' element={<Orders orders={orders}
                        products={products}
                        lineItems={lineItems}
                        getCartItem={getCartItem}
                        createLineItem={createLineItem}
                        updateLineItem={updateLineItem} />} />
                      <Route path="/add-product" element={<AddNewProduct setProducts={setProducts} />} />
                      <Route path="/customers" element={<AllCustomers isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
                    </>
                  )}

                </>
              }

            </Routes>
          </Container>
        </Box>
      </Box>
      <AppFooter />
    </ThemeProvider >
  );
}

export default Home