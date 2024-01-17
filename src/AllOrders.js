import React, { useEffect, useState } from "react";
import api from "./api";
import Orders from './Orders';

const AllOrders = ({auth, lineItems, products, displayPrice})=>{
  const isLoggedIn = !!auth.id;
  const isAdmin = auth.is_admin;
  const [allOrders, setAllOrders] = useState([]);
 

   // finds the order date for given order id
   const getOrderDate = (orderId)=>{
   
    const date= orders.find((order)=>{ return order.id===orderId})?.created_at;
   
    return date;
  } 

  
// const sum = orderedProducts.reduce((accumulator, lineItem) =>{
//   const findOrder = orders.find((order) =>{
//     return order.id === lineItem.order_id
   
//   })
//   if (order.id === lineItem.order_id) {
//     accumulator += findOrder.price * lineItem.quantity
//   }
//   return accumulator
// }, 0);




  const calculateLineItemTotal =(productPrice, vipPrice, quantity) => {
    if(isVip && vipPrice) {
      return vipPrice * quantity
    } else {
      return productPrice * quantity
    }
  }

  
  useEffect(() => {
    
    if (isLoggedIn && isAdmin) {    
      const fetchOrders = async () => {
       api.fetchAllOrders(setAllOrders);                
      };
      fetchOrders();
    }
  }, [isLoggedIn]);

  const allOrderData = allOrders?.map((order) => {
    // const order= orders.find(order => order.id === lineItems.product_price);
    
    return (
     
      // displaying the order date, order id and user id for all orders
      <p key={order.id}> 
      Order Placed On:{ new Date(order?.created_at).toString().slice(0,15)} |
      Order Id: {order?.id}|
      User Id: {order?.user_id}
      {/* Order Grand Total: {order?.product_price} */}
      </p>
      
    )
    
  })


   return(
     <div>
        <h3>List of all orders placed</h3>
       
        {allOrderData} 
        
      </div>
      
   )
   
}

export default AllOrders;
