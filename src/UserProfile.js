import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wishlist from "./Wishlist";

const UserProfile = ({ user, wishlistItems, products }) => {
  const isVip = user?.is_vip;
  
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
          <Wishlist wishlistItems={wishlistItems} products={products} />
        </div>
    </div>
  )
}

export default UserProfile;