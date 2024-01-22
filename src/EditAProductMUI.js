import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, MenuItem, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputAdornment } from '@mui/material';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { displayPrice } from './Util';



const EditAProduct = ({products, setProducts}) => {
    const navigate=useNavigate();

    //get the product id from url
    const { id } = useParams();

    //find selected product from products list
    const product = products?.find((product) => {
        return product.id === id;
      });
    
    const [name, setName]=useState(product.name);
    const [price, setPrice]=useState(product.price);
    const [description, setDescription]=useState(product.description);
    const [vip_price,setVipPrice]=useState(product.vip_price);
    const [category, setCategory]=useState(product.category);

    const categoryOptions = [
        { value: 'Birthdays', label: 'Birthdays'},
        { value: 'Holidays', label: 'Holidays'},
        { value: 'Special Occassions', label: 'Special Occassions'},
        { value: 'Cup Cakes', label: 'Cup Cakes'}
    ];
      
    const handleSubmit = (event) => {
        event.preventDefault();

        const editedProduct={
            product_id: id,
            name,
            price,
            description,
            vip_price,
            category
        }

        const updateProducts = async (productId, setProducts)=>{
            await api.updateProduct(editedProduct,productId, setProducts);
        }
        updateProducts(product.id, setProducts);

        navigate("/products")
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Typography component="h1" variant="h5">
                    Edit a Product
                </Typography>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <WarningAmberTwoToneIcon />
                    </Avatar>
                    <Typography>
                        **Only ADMIN can edit a product.**
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <WarningAmberTwoToneIcon />
                    </Avatar>
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name of Cake"
                        autoFocus
                        onChange={(e)=>{setName(e.target.value)}}
                        defaultValue={product.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        onChange={(e)=>{setPrice(e.target.value)}}
                        defaultValue={product.price}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography align='right'>
                            Product is not a VIP product if VIP price is set to zero.<br/>
                            Suggested VIP price (10% off): {displayPrice.format(product.price*.9)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        required
                        fullWidth
                        id="vip_price"
                        label="VIP Price"
                        name="vip_price"                        
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        onChange={(e)=>{setVipPrice(e.target.value)}}
                        defaultValue={product.vip_price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="description"
                        label="Description of Cake"
                        name="description"
                        multiline
                        rows={4}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        defaultValue={product.description}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="category"
                            name="category"
                            select
                            label="Select a Category"
                            defaultValue={product.category}
                            onChange={(e)=>{setCategory(e.target.value)}}
                            >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            <br />
                            Placeholder for loading image.
                        </Typography>
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Edit Cake
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default EditAProduct;