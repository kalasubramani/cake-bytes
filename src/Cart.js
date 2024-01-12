import React from 'react';
import Products from './Products';
import { useParams } from "react-router-dom";

const Cart = ({ updateOrder, removeFromCart, updateLineItem, removeOneItem, lineItems, cart, products, displayPrice })=> {
  //adds grand total price in the cart to display to user
  const sum = lineItems.reduce((accumulator, lineItem) => {
    const findProduct = products.find((product) =>{
      return product.id === lineItem.product_id
    })
    if(cart.id === lineItem.order_id) {
      accumulator += findProduct.price * lineItem.quantity
  
    }
    return accumulator
}, 0)
console.log("sum",sum)
const calculateLineItemTotal =(productPrice, quantity) => {
  console.log("productPrice",productPrice)
  console.log("quantity",quantity)
  console.log("item total", (productPrice* quantity))
  return productPrice * quantity
}
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id }>
                { product.name } 
                {/* added the total price for each line item in the cart here */}
                ({ lineItem.quantity }) 
                Total: ${calculateLineItemTotal(product.price, lineItem.quantity)}
                
                <button onClick={ ()=> updateLineItem(lineItem)}>Add one</button>
                { lineItem.quantity > 1 ?
                  <button onClick={ ()=> removeOneItem(lineItem)}>Remove one</button> 
                  : <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                }
              </li>
            );
          })
        }
      </ul>
      {/* added the grand total here */}
      <h3> Grand Total: ${sum} </h3>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
