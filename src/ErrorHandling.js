import { Card, Typography } from "@mui/material";
import React from "react";

const ErrorHandling = () => {
  return (
    <Card sx={{ mt: "1rem", p: "1rem", width: "58rem" }} variant="outlined">
      <Typography variant='h6'>
        Oops! Error occured.
      </Typography>
    </Card>
  )
}

export default ErrorHandling;