import React, { useState } from "react";
import axios from "axios";
import { Avatar, Button, Container, CssBaseline, TextField, Box, Grid, Typography } from '@mui/material'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
          Cake Bytes
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const defaultTheme = createTheme();
  
  const SignUp = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
          firstname,
          lastname,
          username,
          password,
          is_admin: false,
          is_vip: false
        };
        try {
          const response = await axios.post(
            "/api/users/register",
            user
          );    
          navigate("/thankyou?sentFrom=SignUp");
        } catch (error) {
          setError(error.response.data.message);
        }
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="none"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            inputProps={{ minLength: 3, maxLength: 12 }}
                            autoFocus
                            onChange={(e) => {setFirstname(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="none"
                            inputProps={{ minLength: 3, maxLength: 12 }}
                            onChange={(e) => {setLastname(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email or username"
                            label="Email Address or Username"
                            name="email_username"
                            autoComplete="none"
                            inputProps={{ minLength: 6, maxLength: 25 }}
                            onChange={(e) => {setUsername(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="none"
                            inputProps={{ minLength: 6, maxLength: 25 }}
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/sign-in" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                {
                    error ? <p>{error}</p> : null
                }
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    )

  }

  export default SignUp;