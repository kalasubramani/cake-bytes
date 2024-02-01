import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const AppHeader = ({ isLoggedIn, logout ,cartCount}) => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "7rem" }}>
      <Toolbar>
        <Tooltip title="Home">
          <IconButton
            color="inherit"
            aria-label="go home"
            onClick={() => { navigate("/") }}
            sx={{
              marginRight: '36px',
            }}
          >
            <HomeIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column',p:"2rem"}}>
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            align='center'
          >
            {`The Cake {Code}`}
          </Typography>
          <Typography variant='subtitle1' marginLeft='60%'>take a byte</Typography>
        </Box>
        {isLoggedIn && (
          <>
           {/* display user profile */}
            <Tooltip title={"User profile"}>
              <IconButton
                color="inherit"
                aria-label={"user profile"}
                onClick={() => navigate("/user-profile_mui")}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            {/* display cart */}
            <Tooltip title="Cart">
          <IconButton color="inherit" onClick={()=>{navigate("/cart")}}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>  
        </IconButton>
      </Tooltip>
          </>
        )}
        <Tooltip title={isLoggedIn ? "Logout" : "Login"}>
          <IconButton
            color="inherit"
            aria-label={isLoggedIn ? "Logout" : "Login"}
            onClick={() => isLoggedIn ? logout() : navigate("/sign-in")}
          >
            {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
          </IconButton>
        </Tooltip>  

      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
        </AppBar >
  )
}

export default AppHeader;
