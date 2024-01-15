import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserProfile = ({ auth}) => {
   const isVip = auth.is_vip;
  // console.log(auth)



  return (
    <div>
      <h3> Profile  <Link to='/settings'> Settings </Link>  </h3>
    

      <ul>
        <li> Username:{ auth.username }</li>
        <li> Firstname:{ auth.firstname}</li>
        <li> Lastname: { auth.lastname}</li>
        <li> Billing Address: </li>
      </ul>
         
     { isVip ? <p>Thank you for being a VIP customer!</p> : null }
   </div>
    

   )
}

export default UserProfile;