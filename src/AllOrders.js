import React, { useEffect, useState } from "react";
import api from "./api";


const AllOrders = ({isLoggedIn,isAdmin})=>{
  const [allOrders, setAllOrders] = useState([]);

   // finds the order date for given order id
   const getOrderDate = (orderId)=>{
    const date= orders.find((order)=>{ return order.id===orderId})?.created_at;
     return date;
  }
  
  useEffect(() => {
    
    if (isLoggedIn && isAdmin) {    
      const fetchOrders = async () => {
       api.fetchAllOrders(setAllOrders);                
      };
      fetchOrders();
    }
  }, [isLoggedIn,isAdmin]);

  const allOrderData = allOrders?.map((order) => {
    return (
      // displaying the order date, order id and user id for all orders
      <p key={order.id}> 
          Order Placed On:{ new Date(order?.created_at).toString().slice(0,15)} |
          Order Id: {order?.id}|
          User Id: {order?.user_id} 
          Grand Total :    
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