import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserProfile = ({ user, wishlistItems, products }) => {
  const isVip = user?.is_vip;
  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  })

  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })

  return (
    <div>
      <div>
      <h3> Profile  <Link to='/settings'> Settings </Link> | <Link to='/orders'> My Orders </Link>  </h3>   
     
      <ul>
        <li> Username:{ user?.username }</li>
        <li> Firstname:{ user?.firstname}</li>
        <li> Lastname: { user?.lastname}</li>
        <li> Billing Address: </li>
      </ul>
         
     { isVip ? <p>Thank you for being a VIP customer!</p> : null }
   </div>
      <h2>Profile for {user?.firstname} {user?.lastname}</h2>
      <h3>username: {user?.username}</h3>
      <br />
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

export default UserProfile;