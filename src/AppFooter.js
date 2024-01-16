import React from "react";
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3050/">
        Cake Bytes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppFooter = () => {
  return (
    <Box component={'footer'} position="sticky" sx={{ display: 'flex', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#ffc107', height: "8rem" }}>
      <Container sx={{ flexGrow: 1, textAlign: 'center' }} maxWidth="sm">
        <Typography variant="body1">
          Visit us at: 1148 W. Main Ave, Chicago, IL 6065
        </Typography>
        <Typography variant="body1">
          Store Hours: M-F 10am-7pm, Sat 10am-4pm, Sun Closed
        </Typography>
        <IconButton color="inherit">
          <FacebookIcon fontSize='large' />
        </IconButton>
        <IconButton color="inherit">
          <InstagramIcon fontSize='large' />
        </IconButton>
        <IconButton color="inherit">
          <PinterestIcon fontSize='large' />
        </IconButton>
        <Copyright />
      </Container>
    </Box>
  )
}

export default AppFooter;
