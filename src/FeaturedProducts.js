import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";


const FeaturedProducts = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: "3rem", mb: 4 }}>
    
      <Paper
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: "20rem",
          backgroundImage: 'url(/public/assets/valentines-background.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '1rem',
          position: 'relative'
        }}
      >
        <Box 
          sx={{             
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white', 
            fontWeight: 'bold', 
            zIndex: 4,
            height: "20rem"
          }}>
          <Typography sx={{ fontSize: "5vw", fontWeight: 900, mb: "-.3em" }}>
            VALENTINE'S
          </Typography>
          <Typography sx={{ fontSize: "5vw", fontWeight: 900, mt: "-.3em" }}>
            DAY
          </Typography>
          <Typography sx={{ fontSize: "2vw", fontWeight: 700, mb: "-.2em" }}>
            is just around the corner
          </Typography>
          <Typography sx={{ fontSize: "3vw", fontWeight: 700, mt: "-.2em" }}>
            ORDER YOUR CAKE TODAY!
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
              justifyContent: 'right',
              pr: 0,
              height: "22rem",
              zIndex: 2,
              position: 'absolute',
              right: 0,
              bottom: '-1rem'
          }}
          alt="Valentine's Cake"
          src="/public/assets/valentines-cake-cover2.png"        
        >          
        </Box>
      </Paper>
      
    </Container>
  )
}

export default FeaturedProducts;
