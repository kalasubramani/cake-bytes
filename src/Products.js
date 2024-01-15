import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';

const Products = ({ products, cartItems, createLineItem, updateLineItem, displayPrice, auth})=> {
  const [searchResults,setSearchResults] = useState();
  const isLoggedIn = !!auth.id;
  const isAdmin = auth.is_admin;

  const navigate = useNavigate();

  //display search results in the page
  const showSearchResults = (searchResults) => {
    return (
         searchResults.map((product)=>{return (
        <div key={product.id}>  
        <div                        
                        className="product"
                        onClick={() => {
                          navigate(`/products/${product.id}`);
                        }}
                      >
                        {product.name}
                      </div>
        {displayPrice.format(product.price)}
    </div>
         )}
    ))
  }
  
  return (
    <div>    
      <h2>Products</h2>
      <SearchBar searchList={products} onSearch={(results)=>{setSearchResults(results)}}/>
      <ul>
        {
             // display order details by default. If the searchResults are available, then display only search results
            searchResults ? showSearchResults(searchResults) 
            : 
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>

                <div>{ product.name }</div> 
                <div>{displayPrice.format(product.price)}</div>
                <div className="vipDiscount">{ product.vip_price ? `${displayPrice.format(product.vip_price)}  **VIP only discount!**` : "" }</div>
                
                <div
                      className="product"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      Navigate to { product.name }
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
