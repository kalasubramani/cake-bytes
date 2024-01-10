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

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate=useNavigate();
  const isLoggedIn = !!auth.id ;

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

  //create api connection for removing a single item
  const removeOneItem = async(lineItem)=> {
    await api.removeOneItem({ lineItem, cart, lineItems, setLineItems });
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

  //formats the product price to decimal
  function displayPrice(price){   
    //handle numbers less than 2 digits
     var leftDecimal = price.toString().replace('.', ''),
         rightDecimal = '00';
     
    //handle numbers > 2 digits
     if(leftDecimal.length > 2){          
       rightDecimal = leftDecimal.slice(-2);
       leftDecimal = leftDecimal.slice(0, -2);
     }
     //form the decimal price to be displayed
     var n = Number(leftDecimal+'.'+rightDecimal).toFixed(2);        
     return (n === "NaN") ? price:n        
   }

  return (
    <div className='parentContainer'>
      {
        // auth.id ? (
          <>
             <span>
                Welcome { auth.username }!               
              </span>
            
          <h3> Search: </h3> 
          <SearchBar products={products}/>
               <hr/>

            <nav className='navbar'>
             
              {isLoggedIn && 
              <>
               <Link to='/'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>  
              </>
              } 
               
            { 
            isLoggedIn? 
            <button onClick={ logout } className='logout'>Logout</button>  
            :  <Link to='/login' className='login'>Login</Link>   
            }   
 
            </nav>
            <main> 
                <Routes>
                <Route path='/login' element={<Login login={login}/>}/>
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
                                            removeOneItem = { removeOneItem }
                                            updateLineItem = { updateLineItem }
                                            />
                                        }/>
                <Route path='/products/:id' element={<ProductDetails products={products} 
                                  displayPrice={displayPrice} auth={auth}/>}/> 

                <Route path='/products/:id/review' element={<AddProductReview products={products}/>}/>
                <Route path='/thankforreview' element={<ThankForReview/>} />
                </Routes>                                
            </main>
            </>
        // ):(
        //   <div>   
           
        //     <main>
        //       <Routes>
        //       <Route path='/' element={<>
        //                                <nav className='navbarLogin'>
        //                                            
        //                                </nav>
        //                                   <Products
        //                                     auth = { auth }
        //                                     products={ products }
        //                                     cartItems = { cartItems }
        //                                     createLineItem = { createLineItem }
        //                                     updateLineItem = { updateLineItem }
        //                                   />
        //                                   </>
        //                                   }/>
        //         <Route path='/products/:id' element={<ProductDetails products={products} 
        //                           displayPrice={displayPrice}/>}/> 
        //         
        //       </Routes>
        //     </main> 
        //   </div>
        // )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
