import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, CssBaseline, MenuItem, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputAdornment, Switch, Alert } from '@mui/material';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { displayPrice } from './Util';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddOrEditAProduct = ({ products, setProducts }) => {
  const navigate = useNavigate();

  //get the product id from url
  const { id } = useParams();

  //find selected product from products list
  const product = products?.find((product) => {
    return product.id === id;
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [isVipProduct, setIsVipProduct] = useState(false);
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const el = useRef();

  useEffect(() => {
    const reader = new FileReader();

    const handleFileUpload = (reader) => {
      return (e) => {
        const file = e.target.files;
        reader.readAsDataURL(file[0]);
        reader.addEventListener('load', () => {
          setProductImage(reader.result);
          setShowAlert(true);
        })
      }
    }

    el.current.addEventListener('change', handleFileUpload(reader))

    return reader.removeEventListener('load', () => {
      setProductImage(reader.result);
      setShowAlert(true);
    });

  });

  useEffect(() => {
    if (product) {    
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setVipPrice(product.vip_price)
      setIsVipProduct(!!Number(product.vip_price))
      setCategory(product.category)
      setProductImage(product.product_image)
    }

  }, [product])

  const categoryOptions = [
    { value: 'Birthdays', label: 'Birthdays' },
    { value: 'Holidays', label: 'Holidays' },
    { value: 'Special Occassions', label: 'Special Occassions' },
    { value: 'Cupcakes', label: 'Cupcakes' }
  ];

  const handleMarkAsVIPProduct = () => {
    setIsVipProduct(isVipProduct => !isVipProduct);
    if (isVipProduct) {
      setVipPrice(0);
    } else {
      setVipPrice(price * .9);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const editedProduct = {
      productId: id,
      name,
      price,
      description,
      vip_price: vipPrice,
      category,
      productImage,
    }

    const updateProducts = async (editedProduct, setProducts) => {
      await api.updateProduct(editedProduct, setProducts);
    }

    const createProduct = async (newProduct, setProducts) => {
      await api.addNewProduct(newProduct, setProducts);
    }

    product ? updateProducts(editedProduct, setProducts) : createProduct(editedProduct, setProducts);

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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                autoComplete="off"
                name="name"
                required
                fullWidth
                id="name"
                label="Name of Cake"
                value={name}
                autoFocus
                onChange={(e) => { setName(e.target.value) }}
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
                onChange={(e) => { setPrice(e.target.value) }}
                value={price}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Switch checked={isVipProduct} onChange={handleMarkAsVIPProduct} />} label="Mark as VIP product" />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography align='right'>
                Product is not a VIP product if VIP price is set to zero.<br />
                Suggested VIP price (10% off): {displayPrice.format(price * .9)}
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
                onChange={(e) => { setVipPrice(e.target.value) }}
                value={vipPrice}
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
                onChange={(e) => { setDescription(e.target.value) }}
                value={description}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="category"
                name="category"
                select
                label="Select a Category"
                placeholder="Select a category"
                fullWidth
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <label >Product image : <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <input type="file" hidden ref={el} />
              </Button>
              </label>
              {
                showAlert &&
                <Alert severity="success">The selected file is loaded.</Alert>
              }
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {product ? "Edit" : "Add"} Cake
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddOrEditAProduct;