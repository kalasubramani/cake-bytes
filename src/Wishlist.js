import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Wishlist = ({ wishlistItems, products }) => {

  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  })

  //use the product ids to create an array of the wishlist products
  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })

  //displays wishlist
  return (
    <div>
      <h2>My Wishlist</h2>
      <ul>
        { wishlistProducts?.length > 0 ? 
          (
            wishlistProducts?.map((product) => {
              return (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              )
            })
          ) : (
            <h3>Add a product to your wishlist to get started.</h3>
          )
        }
      </ul>
    </div>
  )
}

export default Wishlist