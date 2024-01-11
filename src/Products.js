import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const isLoggedIn = !!auth.id;
  const isAdmin = auth.is_admin;

  const navigate = useNavigate();
  
  return (
    <div>    
      <h2>Products</h2>
      <ul>
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>

                { product.name } ${product.price}

                <div
                      // key={book.id}
                       className="product"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      { product.name }
                    {/* <img src={book.coverimage} className="coverimage" /> */}
                  </div>
                
                {
                  isLoggedIn ? (
                    cartItem ? <button 
                    onClick={ ()=> updateLineItem(cartItem)}>Add another to cart</button>
                    : <button onClick={ ()=> createLineItem(product)}>Add to cart</button>
                  
                  ): null 
                }
                {
                  isAdmin ? (
                    <button onClick={()=>{navigate(`/products/${product.id}/edit`)}}>Edit Product details</button>                   
                  ): null                  
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
