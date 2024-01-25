import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import api from "./api";

const PasswordDialog = ({open,handleClose,userId})=>{
  return(
  <Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    component: 'form',
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const password = formJson.password;
      api.resetPassword(password,userId);
      handleClose();
    },
  }}
>
  <DialogTitle>Update Password</DialogTitle>
  <DialogContent>
    <DialogContentText>
      To update your password, please enter your new password here.
    </DialogContentText>
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="password"
      label="New password"
      type="password"
      fullWidth
      variant="standard"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button type="submit">Update Password</Button>
  </DialogActions>
</Dialog>
)
}

export default PasswordDialog;