import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wishlist from "./Wishlist";

const UserProfile = ({ user, wishlistItems, products }) => {
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
              <li> Username:{ auth.username }</li>
              <li> Firstname:{ auth.firstname}</li>
              <li> Lastname: { auth.lastname}</li>
              <li> Billing Address: </li>
            </ul>
              
          { isVip ? <p>Thank you for being a VIP customer!</p> : null }
          <Wishlist auth={auth} wishlistItems={wishlistItems} products={products} />
        </div>
    </div>
  )
}

export default UserProfile;