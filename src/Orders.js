import SearchBar from "./SearchBar"
import React, { useState } from "react"


const Orders = ({ orders, products, lineItems })=> {
  const [orderDetails, setOrderDetails] = useState ([])
 
  return (
    <div>
      <h2>Orders</h2>
      {/* <SearchBar searchList={orders}/> */}
      <ul>
          {/* {orderList} */}
      </ul>
    </div>
  );
};

export default Orders;
