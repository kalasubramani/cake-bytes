import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";

const Orders = ({ orders, products, lineItems })=> {
  const [searchResults,setSearchResults] = useState();
  const navigate = useNavigate();

  // finds the order date for given order id
  const getOrderDate = (orderId)=>{
    const date= orders.find((order)=>{ return order.id===orderId})?.created_at;
    return date;
  }

  //get list of placed orders
 const placedOrders=  orders.filter(order => !order.is_cart).map((order)=>{return order.id});
 //For all placed orders - get product id from line item
 const orderLineItems = lineItems.filter((lineItem)=>placedOrders.includes(lineItem.order_id)) ;
 //for each filtered line item, get all required data from products (name,quantity purchased,order id, order , product id)
 const orderedProducts = orderLineItems.map((lineItem)=>{  
 const product = products.find(product => product.id === lineItem.product_id);
    return {name:product.name,quantity:lineItem.quantity,orderId:lineItem.order_id,orderDate:getOrderDate(lineItem.order_id),productId:product.id}

})

const showSearchResults = (searchResults) => {
  return (
       searchResults.map((product)=>{return (
      <div key={product.id}>  
          <div
            className="product"
            onClick={() => {
              navigate(`/products/${product.productId}`);
            }}
          >
            {product.name}
          </div>
      
      Quantity Purchased : {product.quantity} |
      Order Total : TBD |
      Order ID : {product.orderId}
  </div>
       )}
  ))
}

const showOrderDetails=(orderId)=>{
  //get order placed date
  const orderDate = getOrderDate(orderId)
  //get all products in an order
 const productsInOrder = orderedProducts.filter((order)=>{return (
    order.orderId === orderId
  )})

  //for each product in the order, form the product details elements to be displayed 
  //This returns all products in a given order
 const productData= productsInOrder.map((product)=>{return (
                  <div key={product.id}>   
                      <div
                            className="product"
                            onClick={() => {
                              navigate(`/products/${product.productId}`);
                            }}
                          >
                        {product.name} 
                    </div> |
                    Quantity Purchased : {product.quantity} |
                    Order Total : TBD |
                    Order ID : {product.orderId}
                </div>
  )});
  //for displaying app products under the order date heading - form the html elements
  const orderData = <div className='orderData'>
                        Order Placed On :  <span >{ new Date(orderDate).toString().slice(0,15) }</span>
                        {productData}
                    </div>
 return orderData;
}
          
  return (
    <div>
      <h2>Orders</h2>
      <SearchBar searchList={orderedProducts} onSearch={(results)=>{setSearchResults(results)}}/> 
      <ul>
        {
          // display order details by default. If the searchResults are available, then display only search results
          searchResults ? showSearchResults(searchResults) 
          : placedOrders.map((order)=>{return ( 
                      <li key={order}>{showOrderDetails(order)}</li>
           )})
        }
      </ul>
    </div>
  );
};

export default Orders;
