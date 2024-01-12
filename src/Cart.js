import React from 'react';
import Products from './Products';

const Cart = ({ updateOrder, removeFromCart, updateLineItem, removeOneItem, lineItems, cart, products })=> {
  
  const sum = lineItems.reduce((accumulator, lineItem) => {
    const findProduct = products.find((product) =>{
      return product.id === lineItem.product_id
    })
    if(cart.id === lineItem.order_id) {
      accumulator += findProduct.price * lineItem.quantity
    }
    return accumulator
}, 0)


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
                ({ lineItem.quantity }) Total: ${product.price * lineItem.quantity}.00
                 
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
      <h3> Grand Total: ${sum}.00 </h3>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
