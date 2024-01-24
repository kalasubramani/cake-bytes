import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import PasswordDialog from "./PasswordDialog";


const ProfileSettings = ({user, setUser}) => {
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [userName, setUserName] = useState(user.username);
    const [addressLine1, setAddressLine1] = useState(user.address_line1);
    const [addressLine2, setAddressLine2] = useState(user.address_line2 || '');
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zipCode, setZipCode] = useState(user.zip_code);
    const [displayField, setDisplayField] = useState(true);
    const [displayAddress, setDisplayAddress] = useState(true);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    const navigate = useNavigate();

    const handleUserUpdate = async (event) => {
        event.preventDefault();
        const updatedUserInfo = {
          user_id: user.id,  
          firstName,
          lastName,
          userName,
          is_admin: user.is_admin,
          is_vip: user.is_vip
        }

        const updateUser = async (updatedUserInfo,setUser)=>{
            await api.updateProfile(updatedUserInfo,setUser);
        }
        updateUser(updatedUserInfo,setUser);
        setDisplayField(true);
        navigate("/user-profile_mui")
      };

      const handleAddressUpdate = async (event) => {
        event.preventDefault();
        const updatedUserAddress = {
          user_id: user.id,  
          address_line1:addressLine1,
          address_line2:addressLine2 ,
          city,
          state,
          zip_code:zipCode
        }

        const changeAddress = async (updatedUserAddress,setUser)=>{
            await api.updateAddress(updatedUserAddress,setUser);
        }
        changeAddress(updatedUserAddress,setUser);
        setDisplayAddress(true);
        navigate("/user-profile_mui")
      };

      const profileUserInfo = () => {
        return (
          <Box sx={{flexGrow: 1,p:"1rem"}}>
            <Typography variant="h5">
              Customer Information
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`First Name: ${user.firstname}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`Last Name: ${user.lastname}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`Username/Email: ${user.username}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`Currently a VIP member: ${user.is_vip}`} />
                </ListItemButton>
              </ListItem>
              <Button variant="contained" onClick={()=>setDisplayField(false)}>Edit</Button>
              <Button variant="text" sx={{fontWeight:700,float:"right"}} onClick={()=>{setShowPasswordDialog(true)}}>Change Password</Button>
              <PasswordDialog open={showPasswordDialog} handleClose={()=>{setShowPasswordDialog(false)}} userId={user.id}/>
            </List>
          </Box>
        )
      }

      const updateUserInfo = () => {
        return (
          <Box sx={{flexGrow: 1,p:"1rem"}}>
            <Typography variant="h5">
              Edit Information
            </Typography>
            <Box component="form" onSubmit={handleUserUpdate}>
              <TextField
                name="firstname"
                required                
                id="firstname"
                label="First Name"
                value={firstName}
                autoFocus
                onChange={(e)=>{setFirstName(e.target.value)}}
                sx={{ m: 1 }}
              />
               <TextField
                name="lastname"
                required                
                id="lastname"
                label="Last Name"
                value={lastName}
                autoFocus
                onChange={(e)=>{setLastName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="username"
                required
                id="username"
                label="Username/Email"
                value={userName}
                autoFocus
                onChange={(e)=>{setUserName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <Button type="submit" variant="contained">Update</Button>
            </Box>
          </Box>
        )
      }

      const profileUserAddress = () => {
        return (
          <Box sx={{flexGrow: 1,p:"1rem"}}>
            <Typography variant="h5">
              Customer Address
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`${addressLine1}`} />
                </ListItemButton>
              </ListItem>
              {
                addressLine2 && (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${addressLine2}`} />
                    </ListItemButton>
                  </ListItem>
                )
              }
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`${city}, ${state} ${zipCode}`} />
                </ListItemButton>
              </ListItem>
            </List>
            <Button variant="contained" onClick={()=>setDisplayAddress(false)}>Edit</Button>
          </Box>
        )
      }

      const updateUserAddress = () => {
        return (
          <Box sx={{flexGrow: 1,p:"1rem"}}>
            <Typography variant="h5">
              Edit Address
            </Typography>
            <Box component="form" onSubmit={handleAddressUpdate}>
              <TextField
                name="address1"
                required
                id="address1"
                label="Address Line 1"
                value={addressLine1}
                autoFocus
                onChange={(e)=>{setAddressLine1(e.target.value)}}
                sx={{ m: 1 }}
              />
               <TextField
                name="address2"
                id="address2"
                label="Address Line 2 (optional)"
                value={addressLine2}
                autoFocus
                onChange={(e)=>{setAddressLine2(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="city"
                required
                id="city"
                label="City"
                value={city}
                autoFocus
                onChange={(e)=>{setCity(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="state"
                required
                id="state"
                label="State"
                value={state}
                autoFocus
                onChange={(e)=>{setState(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="zipCode"
                required
                id="zipCode"
                label="Zip Code (5 digits)"
                value={zipCode}
                autoFocus
                onChange={(e)=>{setZipCode(e.target.value)}}
                sx={{ m: 1 }}
              />
              <Button type="submit" variant="contained">Update</Button>
            </Box>
          </Box>
        )
      }

return (
    <Box sx={{ display: 'flex', p: 2, justifyContent: "space-evenly" }}>      
        {displayField ? profileUserInfo() : updateUserInfo()}
      <Divider orientation="vertical" variant="middle" flexItem/>
        {displayAddress ? profileUserAddress() : updateUserAddress()}
    </Box>
)

}

export default ProfileSettings