import React from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import {Link} from 'react-router-dom';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/" >
        Cake Bytes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppFooter = () => {
  return (
    <Box component={'footer'} position="sticky" sx={{ display: 'flex', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: (theme)=>theme.palette.primary.main, height: "9rem",pt:"0.5rem",pb:"0.5rem" }}>
      <Container sx={{ flexGrow: 1, textAlign: 'center' }} maxWidth="sm">
        <Typography variant="body1">
          Visit us at: 1148 W. Main Ave, Chicago, IL 6065
        </Typography>
        <Typography variant="body1">
          Store Hours: M-F 10am-7pm, Sat 10am-4pm, Sun Closed
        </Typography>
        <IconButton href="https://www.facebook.com/" color="inherit">
          <FacebookIcon fontSize='large' />
        </IconButton>
        <IconButton href= "https://www.instagram.com/"color="inherit">
          <InstagramIcon fontSize='large' />
        </IconButton>
        <IconButton href="https://www.pinterest.com/" color="inherit">
          <PinterestIcon fontSize='large' />
        </IconButton> 
        <Copyright />
      </Container>
    </Box>
  )
}

export default AppFooter;
