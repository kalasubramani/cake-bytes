import React, { useEffect, useState } from "react";
import api from "./api";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import Switch from '@mui/material/Switch';

//Need to add a search bar into All customers-Aimee

const AllCustomers = ({ customers, setCustomers }) => {

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
  },[customers, setCustomers])

  const updateVipStatus = async (customer) => {

    const customerData = {
      id: customer.id,
      is_vip: !customer.is_vip
    }

    await api.updateVipStatus(customerData, customers, setCustomers)
  }

  const toggleVipStatus = (customer) => {
    updateVipStatus(customer)
  }

  return (
    <div>
      <h3>Cake Code Customers</h3>
    
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
