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

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate=useNavigate();

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
    navigate('/');
  }

  const logout = ()=> {
    api.logout(setAuth);

    navigate('/');
  }

  return (
    <div className='parentContainer'>
      {
        auth.id ? (
          <>
             <span>
                Welcome { auth.username }!               
              </span>
            
          <h3> Search: </h3> 
          <SearchBar products={products}/>
               <hr/>

            <nav className='navbar'>
              <Link to='/'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>   
              <button onClick={ logout } className='logout'>Logout</button>           
            </nav>
            <main> 
                <Routes>
                  <Route path='/' element={
                                          <Products
                                            auth = { auth }
                                            products={ products }
                                            cartItems = { cartItems }
                                            createLineItem = { createLineItem }
                                            updateLineItem = { updateLineItem }
                                          />}/>
              
                <Route path='/orders' element={
                                            <Orders
                                            orders = { orders }
                                            products = { products }
                                            lineItems = { lineItems }
                                            />
                                          }/>
                <Route path='/cart' element={
                                            <Cart
                                            cart = { cart }
                                            lineItems = { lineItems }
                                            products = { products }
                                            updateOrder = { updateOrder }
                                            removeFromCart = { removeFromCart }
                                            />
                                        }/>
                </Routes>                                
            </main>
            </>
        ):(
          <div>   
           
            <main>
              <Routes>
              <Route path='/' element={<>
                                       <nav className='navbarLogin'>
                                           <Link to='/login' className='login'>Login</Link>            
                                       </nav>
                                          <Products
                                            auth = { auth }
                                            products={ products }
                                            cartItems = { cartItems }
                                            createLineItem = { createLineItem }
                                            updateLineItem = { updateLineItem }
                                          />
                                          </>
                                          }/>
                <Route path='/login' element={<Login login={login}/>}/>
              </Routes>
            </main> 
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
