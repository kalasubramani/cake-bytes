import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";

const Orders = ({ orders, products, lineItems })=> {
  const [searchResults,setSearchResults] = useState();
  const navigate = useNavigate();

  // finds the order date for given order id
  const getOrderDate = (orderId)=>{
    const date= orders.find((order)=>{ return order.id===orderId})?.created_at;
    //console.log("created at", date)
    return date;
  }

  //get list of placed orders
 const placedOrders=  orders.filter(order => !order.is_cart).map((order)=>{return order.id});
 //For all placed orders - get product id from line item
 const orderLineItems = lineItems.filter((lineItem)=>placedOrders.includes(lineItem.order_id)) ;
 //for each filtered line item, get all required data from products (name,quantity purchased,order id, order , product id)
 /* passed in price:product.price to pull price info from products to be caluculated in the total order price*/
 const orderedProducts = orderLineItems.map((lineItem)=>{  
 const product = products.find(product => product.id === lineItem.product_id);
    return {name:product.name,quantity:lineItem.quantity,price:product.price,orderId:lineItem.order_id,orderDate:getOrderDate(lineItem.order_id),productId:product.id}

})


/* added the total order price to be diplayed for each order */
const calculateLineItemTotal =(productPrice, quantity) => {
   return productPrice * quantity
}

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
          {/* added the total order price to be diplayed for each order */}
      Quantity Purchased : {product.quantity} |
      Order Total :${calculateLineItemTotal(product.price, product.quantity)}|
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
                    {/* added the total order price to be diplayed for each order */}
                    Quantity Purchased : {product.quantity} |
                    Item Total : ${calculateLineItemTotal(product.price, product.quantity)}|
                    Order ID : {product.orderId}
                </div>
  )});


 const grandTotal = productsInOrder.reduce((total,product)=>{
      return total + calculateLineItemTotal(product.price, product.quantity);
 },0)


  //for displaying app products under the order date heading - form the html elements
  const orderData = <div className='orderData'>
    {/* add in the grand total for each order after the Order placed on  */}
                        Order Placed On :  <span >{ new Date(orderDate).toString().slice(0,15) }</span>
                        {/* added the grand total here */}
                        
      <span><b> Order Grand Total: ${grandTotal} </b></span>
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
