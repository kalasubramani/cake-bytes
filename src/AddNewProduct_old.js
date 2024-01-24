import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddNewProduct = ({ setProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [vip_price, setVipPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const navigate = useNavigate();
  const el = useRef();

  //add product to db
  const handleSubmit = (e) => {
    e.preventDefault();

    //create product obj to send to db
    const product = {
      name,
      description,
      price,
      productImage,
      vip_price: 55 //TDB - add value to this field when the product is added to db
    }

    const addProduct = async (resetProduct, setProducts) => {
      await api.addNewProduct(resetProduct, setProducts);
    }
    //add new product to db and update the product-state with the new product added
    addProduct(product, setProducts);

    //clear out form fields
    setName('');
    setDescription('');
    setPrice('');
    setVipPrice('');

    //redirect to products page
    navigate("/")
  }

  const handleCheckboxChange = () => {
    setVipPrice(price * .9)
  }

  useEffect(() => {
    const reader = new FileReader();

    const handleFileUpload = (reader) => {
      return (e) => {
        const file = e.target.files;
        reader.readAsDataURL(file[0]);
        reader.addEventListener('load', () => {
          setProductImage(reader.result);
        })
      }
    }

    el.current.addEventListener('change', handleFileUpload(reader))

    return reader.removeEventListener('load', () => {
      setProductImage(reader.result);
    });

  });

  return (
    <div className="addProductContainer">
      <p> Enter new product details here</p>
      <form onSubmit={handleSubmit}>
        <label >Product Name : <input type="text" onChange={(e) => { setName(e.target.value) }} className="productText" required /></label>
        <label >Product Description : <input type="text" onChange={(e) => { setDescription(e.target.value) }} className="productText" required /></label>
        <label >Price : <input type="number" step=".01" onChange={(e) => { setPrice(e.target.value) }} className="productPrice" required /></label>
        <label >Product image : <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <input type="file" hidden ref={el} />
        </Button>
        </label>
        {
          productImage &&
          <Alert severity="success">The selected file is loaded.</Alert>
        }
        <label >Mark product as VIP<input type="checkbox" checked={vip_price} onChange={handleCheckboxChange} /></label>
        <button className="addProductButton" disabled={!productImage} >Add Product</button>
      </form>
    </div>
  )
}

export default AddNewProduct;

