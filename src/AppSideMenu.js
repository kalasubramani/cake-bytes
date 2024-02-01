import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CakeIcon from '@mui/icons-material/Cake';
import GroupsIcon from '@mui/icons-material/Groups';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useLocation, useNavigate, useSearchParams} from "react-router-dom";

const AppSideMenu = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const productCategory = queryParams.get("category");
  const location = useLocation();
 
  return (
    <Drawer sx={{ width: "15rem" }} variant="permanent" open>
      <List component="nav" sx={{ paddingTop: '8rem', width: "15rem" }}>
        <Typography variant='h6' sx={{ pl: '1em' }}>Occasions</Typography>
        {["Birthdays", "Holidays", "Cupcakes", "Special Occasions", "All Cakes"].map((category) => {
          return (
            <React.Fragment key={`key-for-${category}`}>
              <ListItemButton onClick={()=>navigate(`/products?category=${category}`)} selected={category===productCategory}>
                <ListItemIcon>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </React.Fragment>

          )
        })}
        {/* display admin menu items only for admin users */}
        {isAdmin && (
          <> 
            <Divider sx={{ my: 1 }} />
            <Typography variant='h6' sx={{ pl: '1em' }}>Admin Menu</Typography>
            <ListItemButton onClick={() => navigate("/products")} selected={!productCategory && location.pathname==='/products'}>
              <ListItemIcon>
                <QrCode2Icon />
              </ListItemIcon>
              <ListItemText primary="All Products" />
            </ListItemButton>            
            <ListItemButton onClick={()=>navigate("/orders-admin")} selected={!productCategory && location.pathname==='/orders-admin'}>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="All Orders" />
            </ListItemButton>
            <ListItemButton onClick={()=>navigate("/customers")} selected={!productCategory && location.pathname==='/customers'}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  )
}

export default AppSideMenu;
