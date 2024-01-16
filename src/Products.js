import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,useSearchParams  } from "react-router-dom";
import SearchBar from './SearchBar';
import { displayPrice } from './Util';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Products = ({ products, cartItems, createLineItem, updateLineItem, isLoggedIn, isAdmin }) => {
  const [searchResults, setSearchResults] = useState();
  const dbcategory = "Birthday"

  const navigate = useNavigate();
  const [queryParams]=useSearchParams();
  console.log("menu",queryParams.get("category"))

  //display search results in the page
  const showSearchResults = (searchResults) => {
    return (
      searchResults.map((product) => {
        return (
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
        )
      }
      ))
  }
  const showProducts=(category)=>{
    let productsToDisplay ;
    if(category){
      productsToDisplay = products.filter((product)=>{
        // return (product.category===category) 
        return (true) //display all products for all occassions untin db part is coded       
      })
    }else{
      productsToDisplay=products;
    }
    
    const allProducts = productsToDisplay?.map(product => {
      const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
      return (
        <li key={product.id}>
          <div
            className="product"
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
          >
            {product.name}
            {/* <img src={product.image} className="coverimage" /> */}
            <div>{displayPrice.format(product.price)}</div>
            <div className="vipDiscount">{product.vip_price ? `${displayPrice.format(product.vip_price)}  **VIP only discount!**` : ""}</div>

          </div>

          {
            isLoggedIn && (
              cartItem ? <button
                onClick={() => updateLineItem(cartItem)}>Add another to cart</button>
                : <button onClick={() => createLineItem(product)}>Add to cart</button>

            )
          }
          {
            isAdmin && (
              <>
                <button onClick={() => { navigate(`/products/${product.id}/edit`) }}>Edit Product details</button>

              </>
            )
          }
        </li>
      );
    })
    return allProducts;
  }

  return (
    <div>
      <h2>Products</h2>
      <SearchBar searchList={products} onSearch={(results) => { setSearchResults(results) }} />
      {
        isAdmin && (
          <Tooltip title={"Add new product"}>
            <Fab color="primary" aria-label="add" sx={{ float: 'right' }} onClick={() => navigate("/add-product")}>
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      <ul>
        {
          // display order details by default. If the searchResults are available, then display only search results
          searchResults ? showSearchResults(searchResults)
            : showProducts()
            
        }
      </ul>
    </div>
  );
};

export default Products;
