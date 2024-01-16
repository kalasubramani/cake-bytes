import React from 'react';
import Products from './Products';


const Cart = ({ updateOrder, removeFromCart, updateLineItem, removeOneItem, lineItems, cart, products, displayPrice, isVip })=> {
  
  //adds grand total price in the cart to display to user
  const sum = lineItems.reduce((accumulator, lineItem) => {
    const findProduct = products.find((product) =>{
      return product.id === lineItem.product_id
    })
    if(cart.id === lineItem.order_id) {
      if(isVip && findProduct.vip_price > 0) {
        accumulator += findProduct.vip_price * lineItem.quantity
      } else {
        accumulator += findProduct.price * lineItem.quantity
      }
       
    }
    return accumulator
  }, 0)

  const calculateLineItemTotal =(productPrice, vipPrice, quantity) => {
    if(isVip && vipPrice > 0) {
      return vipPrice * quantity
    } else {
      return productPrice * quantity
    }
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
                Total: {displayPrice.format(calculateLineItemTotal(product.price, product.vip_price, lineItem.quantity))}

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
      <h3> Grand Total: {displayPrice.format(sum)} </h3>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
