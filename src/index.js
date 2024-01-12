import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import api from './api';
import '../public/styles.css'
import SearchBar from './SearchBar'
import ProductDetails from './ProductDetails';
import AddProductReview from './AddProductReview';
import ThankForReview from './ThankForReview';
import Register from './Register';
import CompleteRegistration from './CompleteRegistration';
import AllCustomers from "./AllCustomers";
import EditAProduct from "./EditAProduct";
import AddNewProduct from "./AddNewProduct";
import UserProfile from "./UserProfile";
import AllOrders from "./AllOrders";

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const isLoggedIn = !!auth.id;
  const isAdmin = auth.is_admin;
  const isVip = auth.is_vip;

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  const createLineItem = async (product) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems });
  };

  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async (order) => {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  //create api connection for removing a single item
  const removeOneItem = async (lineItem) => {
    await api.removeOneItem({ lineItem, cart, lineItems, setLineItems });
  };

  const cart = orders.find((order) => order.is_cart) || {};

  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );

  const cartCount = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
    navigate("/");
  };

  const logout = () => {
    api.logout(setAuth);

    navigate("/");
  };

  //formats the product price to decimal
  function displayPrice(price) {
    if (price) {
      //handle numbers less than 2 digits
      var leftDecimal = price.toString().replace(".", ""),
        rightDecimal = "00";

      //handle numbers > 2 digits
      if (leftDecimal.length > 2) {
        rightDecimal = leftDecimal.slice(-2);
        leftDecimal = leftDecimal.slice(0, -2);
      }
      //form the decimal price to be displayed
      var n = Number(leftDecimal + "." + rightDecimal).toFixed(2);
      return n === "NaN" ? price : n;
    }
  }


  return (
    <div className="parentContainer">
      {     
        <>          
          <nav className="navbar">
            {isLoggedIn && (
              <>
              <span>Welcome { auth.username }! </span>
                <Link to="/">Products ({products.length})</Link>
                <Link to="/orders"> Orders ({orders.filter((order) => !order.is_cart).length})</Link>
                {/* if logged in user is admin,display admin menu */}
                    {
                      isAdmin && (
                        <>
                          <Link to="/customers">View all customers</Link>
                          <Link to="/products">Add new product</Link>
                          <Link to="/ordersadmin">View all orders</Link>
                        </>
                      )
                    }
                <Link to="/profile">Profile</Link>
                <Link to="/cart">Cart ({cartCount})</Link>
              </>
            )}

            
            {isLoggedIn ? (
              <button onClick={logout} className="logout">
                Logout
              </button>
            ) : (
              <Link to="/login" className="login">
                Login
              </Link>
            )}
          </nav>

          <main>
          {isAdmin && <h3> ADMIN LOGIN -- PRIVILEGED USER -- EXERCISE CAUTION</h3>}
          {isVip && <h3> VIP MEMBER - Thank you for being a Cake Code VIP!</h3>}
            <Routes>
              <Route path="/login" element={<Login login={login} />} />
              <Route
                path="/"
                element={
                  <Products
                    auth={auth}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                  />
                }
              />
                  {/* ADD REGISTER PATH  */}
                <Route path="/register" element={<Register />} />
                <Route path="/completeregistration" element={<CompleteRegistration/>} />
              <Route
                path="/orders"
                element={
                  <Orders
                    orders={orders}
                    products={products}
                    lineItems={lineItems}
                  />
                  
                }
              />
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
                    displayPrice={displayPrice}
                  />
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProductDetails
                    products={products}
                    displayPrice={displayPrice}
                    auth={auth}
                  />
                }
              />

              <Route
                path="/products/:id/review"
                element={<AddProductReview products={products} />}
              />
              <Route path="/thankforreview" element={<ThankForReview />} />
              <Route path="/customers" element={<AllCustomers auth={auth}/>} />
              <Route path="/products/:id/edit" element={<EditAProduct/>} />
              <Route path="/products" element={<AddNewProduct setProducts={setProducts}/>} />
              <Route path="/profile" element={<UserProfile auth={auth}/>} />
              <Route path="/ordersadmin" element={<AllOrders/>}/>
            </Routes>
          </main>
        </>
              }

    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
