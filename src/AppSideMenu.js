import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CakeIcon from '@mui/icons-material/Cake';
import GroupsIcon from '@mui/icons-material/Groups';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from "react-router-dom";

const AppSideMenu = () => {
  const navigate = useNavigate();
  return (
    <Drawer sx={{ width: "15rem" }} variant="permanent" open>
      <List component="nav" sx={{ paddingTop: '6rem', width: "15rem" }}>
        <Typography variant='h6' sx={{ pl: '1em' }}>Occassions</Typography>
        {["Birthdays", "Valentines", "Seasonals", "Cup Cakes","Special Occassions","All Cakes"].map((menu) => {
          return (
            <React.Fragment key={`key-for-${menu}`}>
              <ListItemButton>
                <ListItemIcon>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText primary={menu} />
              </ListItemButton>
            </React.Fragment>

          )
        })}
        <Divider sx={{ my: 1 }} />
        <Typography variant='h6' sx={{ pl: '1em' }}>Admin Menu</Typography>
        {/* {["All Products", "Add New Product", "All Orders","Customers"].map((menu) => { */}
          {/* return ( */}
            {/* <React.Fragment key={`key-for-all-products`}> */}
              <ListItemButton onClick={() => navigate("/products")}>
                <ListItemIcon>
                  <QrCode2Icon/>
                </ListItemIcon>
                <ListItemText primary="All Products" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <EditNoteIcon/>
                </ListItemIcon>
                <ListItemText primary="Edit Producs" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <MonetizationOnIcon/>
                </ListItemIcon>
                <ListItemText primary="All Orders" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon/>
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItemButton>
            {/* </React.Fragment> */}
          {/* ) */}
        {/* }) */}
        {/* } */}
      </List>
    </Drawer>
  )
}

export default AppSideMenu;
