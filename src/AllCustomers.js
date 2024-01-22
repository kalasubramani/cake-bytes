import React, { useEffect, useState } from "react";
import api from "./api";

//Need to add a search bar into All customers-Aimee

const AllCustomers = ({ isLoggedIn, isAdmin, isVip, user, setUser }) => {
  const [customers, setCustomers] = useState([]);
  const [vipStatus, setVipStatus]= useState('');
  useEffect(() => {
    //if the logged in user is an admin, get customer details from db
    if (isLoggedIn && isAdmin) {    
      const fetchCustomers = async () => {
       api.fetchAllCustomers(setCustomers);                
      };
      fetchCustomers();
    }
  }, [isLoggedIn,isAdmin,isVip]);

  const updateVipStatus= (customer)=>{
    
   const userData= {
    id : customer.id,
    is_vip : !customer.is_vip
   }
   
    api.updateVipStatus(userData, setUser)
    //setVipStatus(userData.is_vip)
  }

  const customerData = customers?.map((customer)=>{
      return (
            <p key={customer.id}> 
            First Name: {customer.firstname}  |
            Last Name: {customer.lastname}  |
            Username: {customer.username}  |
            {customer.is_admin && <span>**ADMIN**</span>}

            {customer.is_vip? <button onClick={ ()=> updateVipStatus(customer)}>Remove Vip Status</button> 
                  : <button onClick={ ()=> updateVipStatus(customer)}>Add Vip Status</button>}


            
            </p>            
      )
  })
  
  
  
  return (
    <div>
      <h3>List of all customers</h3>
      {customerData}
  </div>
  )
  
};


export default AllCustomers;
