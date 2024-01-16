import { Container, Grid, Paper } from "@mui/material";
import React from "react";


const FeaturedProducts = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: "7rem", mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: "20rem",
              backgroundImage: 'url(/public/assets/Chocolate.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '1rem',
            }}
          >
            featured product (Valentine's Cake)
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: "20rem",
              backgroundImage: 'url(/public/assets/Chocolate.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              borderRadius: '1rem',
            }}
          >
            featured product (Valentine's Cake)
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: "20rem",
              backgroundImage: 'url(/public/assets/Chocolate.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '1rem',
            }}
          >
            featured product (Valentine's Cake)
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FeaturedProducts;
