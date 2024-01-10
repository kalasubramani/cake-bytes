import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
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
                  auth.id ? (
                    cartItem ? <button 
                    onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>
                    : <button onClick={ ()=> createLineItem(product)}>Add</button>
                  
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
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
