import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSideMenu from './AppSideMenu';
import FeaturedProducts from './FeaturedProducts';
import FrequentlyBought from './FrequentlyBought';

// https://www.svgrepo.com/svg/419438/baked-cake-cup
// https://www.svgrepo.com/svg/404839/birthday-cake
// https://www.svgrepo.com/svg/501917/cake
// https://www.svgrepo.com/svg/501915/dialog-box

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ffc107'
    },
    secondary: {
      main: '#ff9100'
    },
  },
});

const Home = ({ user, logout }) => {
  const isLoggedIn = !!user?.id;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', minHeight: "100vh" }}>
        <CssBaseline />
        <AppHeader isLoggedIn={isLoggedIn} logout={logout} />
        <AppSideMenu />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            // height: '100vh',
            overflow: 'auto',
          }}
        >

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              {isLoggedIn &&
                <>
                  <Route path="/" element={
                    <>
                      <FeaturedProducts />
                      <FrequentlyBought />
                    </>
                  }></Route>
                  <Route path="/user-profile" element={<UserProfile />}></Route>
                </>
              }
            </Routes>
          </Container>
        </Box>
      </Box>
      <AppFooter />
    </ThemeProvider >
  );
}

export default Home