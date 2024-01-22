import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wishlist from "./Wishlist";
import WishlistMui from "./WishlistMui";

const UserProfile = ({ user, wishlistItems, products, lineItems, cartItems, getCartItem, createLineItem, updateLineItem}) => {
  const isVip = user?.is_vip;
  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  })

  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })
 
  //displays wishlist
  return (
    <div>
      <div>
            <h3> Profile  <Link to='/settings'> Settings </Link>  </h3>
            <ul>
              <li> Username:{ user.username }</li>
              <li> Firstname:{ user.firstname}</li>
              <li> Lastname: { user.lastname}</li>
              <li> Billing Address: </li>
            </ul>
              
          { isVip ? <p>Thank you for being a VIP customer!</p> : null }
         <WishlistMui 
         wishlistItems={wishlistItems} 
         products={products}
         lineItems={lineItems}
         cartItems={cartItems}
         getCartItem={getCartItem}
         createLineItem={createLineItem}
         updateLineItem={updateLineItem}/>
          {/* <Wishlist wishlistItems={wishlistItems} products={products} cartItems={cartItems}  createWishlistItem={createWishlistItem}
                    deleteWishlistItem={deleteWishlistItem} /> */}

        </div>
    </div>
  )
}

export default UserProfile;