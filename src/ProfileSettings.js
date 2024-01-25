import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';


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
          firstName,
          lastName,
          userName,
          is_admin: user.is_admin,
          is_vip: user.is_vip
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
          <Box>
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
            </List>
          </Box>
        )
      }

      const updateUserInfo = () => {
        return (
          <Box>
            <Typography variant="h5">
              Edit Information
            </Typography>
            <Box component="form" onSubmit={handleUserUpdate}>
              <TextField
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                inputProps={{ minLength: 3, maxLength: 12 }}
                value={firstName}
                autoFocus
                onChange={(e)=>{setFirstName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="lastname"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                inputProps={{ minLength: 3, maxLength: 12 }}
                value={lastName}
                autoFocus
                onChange={(e)=>{setLastName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username/Email"
                inputProps={{ minLength: 6, maxLength: 15 }}
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
          <Box>
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
          <Box>
            <Typography variant="h5">
              Edit Address
            </Typography>
            <Box component="form" onSubmit={handleAddressUpdate}>
              <TextField
                name="address1"
                required
                fullWidth
                id="address1"
                label="Address Line 1"
                inputProps={{ minLength: 10, maxLength: 30 }}
                value={addressLine1}
                autoFocus
                onChange={(e)=>{setAddressLine1(e.target.value)}}
                sx={{ m: 1 }}
              />
               <TextField
                name="address2"
                fullWidth
                id="address2"
                label="Address Line 2 (optional)"
                inputProps={{ minLength: 3, maxLength: 30 }}
                value={addressLine2}
                autoFocus
                onChange={(e)=>{setAddressLine2(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="city"
                required
                fullWidth
                id="city"
                label="City"
                inputProps={{ minLength: 3, maxLength: 25 }}
                value={city}
                autoFocus
                onChange={(e)=>{setCity(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="state"
                required
                fullWidth
                id="state"
                label="State"
                inputProps={{ minLength: 2, maxLength: 2 }}
                value={state}
                autoFocus
                onChange={(e)=>{setState(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="zipCode"
                required
                fullWidth
                id="zipCode"
                label="Zip Code (5 digits)"
                inputProps={{ minLength: 5, maxLength: 5 }}
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
    <Box sx={{ display: 'flex', flexGrow: 1, p: 2, justifyContent: "space-around" }}>
      <Box>
        {displayField ? profileUserInfo() : updateUserInfo()}
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box>
        {displayAddress ? profileUserAddress() : updateUserAddress()}
      </Box>        
    </Box>
)

}

export default ProfileSettings