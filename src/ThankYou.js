import React from "react";
import { Box, Link, Typography, } from "@mui/material";

const ThankYou = ()=>{

  return(
    <>
        <Box 
            sx={{ 
                mx: 'auto',
                p: 1,
                m: 1,
                textAlign: 'center'
            }}
        >           
            <Typography variant="h1">
                Thank you
            </Typography>
            <Typography variant="h3" >
                {`for joining the Cake {Code}`}
            </Typography>   
            <Box
                component="img"
                sx={{
                    height: 400,
                    maxHeight: {xs: 400, md: 250},
                    m: 2
                }}
                alt="graphic of a cupcake"
                src="/public/assets/cupcake_icon_colored.png"
            >
            </Box>
            <Typography variant="h4" sx={{mt: 1}}>
                Please 
                <Link href="/#/sign-in" variant="inherit" underline= 'none' sx={{color: 'blue'}}>
                    {` log in`}
                </Link>
            </Typography> 

        </Box>
    </>
  )
}

export default ThankYou;