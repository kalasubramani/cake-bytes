import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, useNavigate, Route, Routes } from 'react-router-dom';
import api from './api';
import Home from './Home';
import SignIn from './SignIn';
import Products from './Products';

const App = () => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  // //create an api route to add an item to a users wishlist
  // const createWishlistItem = async (product) => {
  //   await api.createWishlistItem({ user, product, wishlistItems, setWishlistItems });
  // };

  // //create an api route to delete an item from a users wishlist
  // const deleteWishlistItem = async (wishlistItem) => {
  //   await api.deleteWishlistItem({ wishlistItem, wishlistItems, setWishlistItems })
  // };

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
    navigate("/");
  };

  const logout = () => {
    api.logout(setAuth);
    navigate("/");
   }; 

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home user={auth} logout={logout} setUser={setAuth} />} />
      <Route path="/sign-in" element={<SignIn login={login} />} />
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);