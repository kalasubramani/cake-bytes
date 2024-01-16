import React from "react";
import ButtonUsage from "./mui";
import { Card, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';

const Test = ({products}) => {
  const drawerWidth = 240;
  return (
    <div>
      <h3> MUI </h3>
      <AppBar
        position="fixed"
        // sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ButtonUsage>MUI button</ButtonUsage>
      <Drawer variant="permanent">
        {["Cakes", "Valentines Cakes", "Birthday", "Annivesary","Seasonal", "Arriving soon.."].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} 
      </Drawer>
      {products.map((product)=>{return (  
      <div key={ product.id }> 
      <Card>
      {product.name}
      </Card>
      </div>
        
        )})}  

    
    </div>
  );
};

export default Test;   
