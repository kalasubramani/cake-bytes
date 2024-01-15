import React, { useEffect, useState } from "react";
import api from "./api";

const AllCustomers = ({ auth }) => {
  console.log
  const isLoggedIn = !!auth.id;
  const isAdmin = auth.is_admin;
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    //if the logged in user is an admin, get customer details from db
    if (isLoggedIn && isAdmin) {    
      const fetchCustomers = async () => {
       api.fetchAllCustomers(setCustomers);                
      };
      fetchCustomers();
    }
  }, [isLoggedIn]);

  const customerData = customers.map((customer)=>{
      return (
            <p key={customer.id}>{customer.username} 
            {customer.is_admin && <span>**ADMIN**</span>}
            {customer.is_vip ? <button>Remove VIP status</button> : <button>Make custumer VIP</button>}
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
