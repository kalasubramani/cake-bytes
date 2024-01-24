import { Password } from '@mui/icons-material';
import axios from 'axios';

const getHeaders = () => {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async (setProducts) => {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchOrders = async (setOrders) => {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

//fetch all orders to display in admin tab, fetch all orders, created a new route called /current for admin user
const fetchAllOrders = async (setAllOrders) => {
  const response = await axios.get('/api/orders/current', getHeaders());
  setAllOrders(response.data);
}

// fetch line items for the logged in user
const fetchLineItems = async (setLineItems) => {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

// fetch all line items for admin 
const fetchAllLineItems = async (setAllLineItems) => {
  const response = await axios.get('/api/lineItems/current', getHeaders());
  setAllLineItems(response.data);
};

const createLineItem = async ({ product, cart, lineItems, setLineItems }) => {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async ({ lineItem, cart, lineItems, setLineItems }) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
};

const updateOrder = async ({ order, setOrders }) => {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const removeFromCart = async ({ lineItem, lineItems, setLineItems }) => {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter(_lineItem => _lineItem.id !== lineItem.id));
};

//fetch reviews for the product
const fetchProductReviews = async (productId, setReviews) => {
  const response = await axios.get(`/api/products/${productId}/reviews`, getHeaders());
  setReviews(response.data);
};

//add a product review
const addProductReview = async (review, productId) => {
  const response = await axios.post(`/api/products/${productId}/reviews`,
    review,
    getHeaders());
}

//removes one item from the cart
const removeOneItem = async ({ lineItem, cart, lineItems, setLineItems }) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity - 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
};

const attemptLoginWithToken = async (setAuth) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch (ex) {
      if (ex.response.status === 401) {
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async ({ credentials, setAuth }) => {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const logout = (setAuth) => {
  window.localStorage.removeItem('token');
  setAuth({});
}

//fetch all customers to display in admin tab
const fetchAllCustomers = async (setCustomers, user) => {
  const response = await axios.get('/api/customers', getHeaders());
  setCustomers(response.data);
}


//add new product to db 
const addNewProduct = async (product, setProducts) => {
  const response = await axios.post('/api/products', product, getHeaders())
  setProducts((prds) => { return [...prds, response.data] })
}

//updateProducts in db 
const updateProduct = async (product, setProducts) => {
  const response = await axios.put(`/api/products/${product.productId}`, product, getHeaders());
  setProducts(products => products.map(cake => cake.id === response.data.id ? response.data : cake))
};


//updateUser in db use 
const updateProfile = async (user, setAuth) => {
  const response = await axios.put(`/api/users/${user.user_id}`, user, getHeaders());
  //use setAuth() to update the state 
  setAuth(response.data)
};

//fetch all wishlist items for a user
const fetchWishlistItems = async (setWishlistItems) => {
  const response = await axios.get('/api/wishlist', getHeaders())
  setWishlistItems(response.data)
};

//add product to a users wishlist
const createWishlistItem = async (user, product, wishlistItems, setWishlistItems) => {
  const response = await axios.post(`/api/wishlist`, {
    user_id: user.id,
    product_id: product.id
  }, getHeaders());
  setWishlistItems([...wishlistItems, response.data])
};

//delete a product from a users wishlist
const deleteWishlistItem = async (product, wishlistItems, setWishlistItems) => {
  const response = await axios.delete(`/api/wishlist/${product.id}`, getHeaders());
  setWishlistItems(wishlistItems.filter(_wishlistItem => _wishlistItem.product_id !== product.id));
};
//update user, can also update VIP status
const updateVipStatus = async (customer, customers, setCustomers) => {
  const { data } = await axios.put(`/api/users/${customer.id}/updatevipstatus`, customer, getHeaders());
  setCustomers(customers.map((customer) => customer.id === data.id ? data : customer ));
};

//update user, can also update VIP status
const updateAddress = async(user, setUser) =>{
  const response = await axios.put(`/api/users/${user.user_id}/address`,user, getHeaders());
  setUser(response.data)
}; 

//reset user password
const resetPassword = async(password,userId)=>{
  const response = await axios.patch(`/api/users/${userId}/password`,{password},getHeaders());
}

const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  updateOrder,
  removeFromCart,
  removeOneItem,
  fetchProductReviews,
  addProductReview,
  attemptLoginWithToken,
  fetchAllCustomers,
  addNewProduct,
  attemptLoginWithToken,
  updateProduct,
  fetchAllOrders,
  updateProfile,
  fetchWishlistItems,
  createWishlistItem,
  deleteWishlistItem,
  updateVipStatus,
  updateAddress,
  resetPassword
};

export default api;
