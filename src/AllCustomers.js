import React, { useEffect, useState } from "react";
import api from "./api";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import Switch from '@mui/material/Switch';

//Need to add a search bar into All customers-Aimee

const AllCustomers = ({ isLoggedIn, isAdmin, isVip, user, setUser }) => {
  const [customers, setCustomers] = useState([]);
 
  useEffect(() => {
    //if the logged in user is an admin, get customer details from db
    if (isLoggedIn && isAdmin) {
      const fetchCustomers = async () => {
        api.fetchAllCustomers(setCustomers);        
      };
      fetchCustomers();
    }
  }, [isLoggedIn, isAdmin, isVip]);

  useEffect(()=>{
    if(customers){
      setCustomers(customers.sort((a,b) => {
        const nameA = a.username.toLowerCase();
        const nameB = b.username.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      }))
    } 
  },[customers])

  const updateVipStatus = async (customer) => {

    const userData = {
      id: customer.id,
      is_vip: !customer.is_vip
    }

    const updatedCustomer = await api.updateVipStatus(userData, setUser)
    const newData = customers.map((customer) => {
      return (
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    })

    setCustomers(newData)
  }

  // const customerData = customers?.map((customer) => {
  //   return (
  //     <>
  //       <p key={customer.id}>
  //         First Name: {customer.firstname}  |
  //         Last Name: {customer.lastname}  |
  //         Username: {customer.username}  |
  //         {customer.is_admin && <span>**ADMIN**</span>}

  //         {customer.is_vip ? <button onClick={() => updateVipStatus(customer)}>Remove Vip Status</button>
  //           : <button onClick={() => updateVipStatus(customer)}>Add Vip Status</button>}
  //       </p>


  //     </>

  //   )
  // })

  const toggleVipStatus = (customer) => {
    updateVipStatus(customer)
  }

  return (
    <div>
      <h3>List of all customers</h3>
      {/* {customerData} */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="view all customers">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:700}} align="center">User Name</TableCell>
              <TableCell sx={{fontWeight:700}} align="center">First Name</TableCell>
              <TableCell sx={{fontWeight:700}} align="center">Last Name</TableCell>
              <TableCell sx={{fontWeight:700}} align="center">Is Admin?</TableCell>
              <TableCell sx={{fontWeight:700}} align="center">Is VIP?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers?.map((customer) => {
                return (
                  <TableRow key={customer.id}>
                    <TableCell align="center">{customer.username}</TableCell>
                    <TableCell align="center">{customer.firstname}</TableCell>
                    <TableCell align="center">{customer.lastname}</TableCell>
                    <TableCell align="center">{customer.is_admin && <StarBorderPurple500Icon sx={{ color: 'red' }} />}</TableCell>
                    <TableCell align="center"> <Switch checked={customer.is_vip} onChange={() => toggleVipStatus(customer)} /> </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

};


export default AllCustomers;
