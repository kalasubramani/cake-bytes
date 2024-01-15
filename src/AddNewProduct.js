import axios from "axios";
import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const AddNewProduct = ({setProducts})=>{
const [name,setName]=useState('');
const [description,setDescription]=useState('');
const [price,setPrice]=useState(0);
const [vip_price,setVipPrice]=useState('');

const navigate=useNavigate();

  //add product to db
  const handleSubmit =(e)=>{
    e.preventDefault();
     console.log("submit event fired")

     //create product obj to send to db
     const product={
      name,
      description,
      price,
      // product_image,
      vip_price
     }
     console.log("product obj ", product);
     const addProduct = async (resetProduct,setProducts)=>{
        const response = await api.addNewProduct(resetProduct,setProducts);
        console.log(response)
     }
     addProduct(product,setProducts);

     //clear out form fields
     setName('');
     setDescription('');
     setPrice('');
     setVipPrice('');

     //redirect to products page
     navigate("/")
  }

  const handleCheckboxChange = () =>{
    setVipPrice(price*.9)
  }
  
   return (
     <div className="addProductContainer">      
        <p> Enter new product details here</p>
        <form onSubmit={handleSubmit}>
          <label >Product Name : <input type="text" onChange={(e)=>{setName(e.target.value)}} className="productText" required/></label>         
          <label >Product Description : <input type="text" onChange={(e)=>{setDescription(e.target.value)}} className="productText" required/></label>
          <label >Price : <input type="number" step=".01" onChange={(e)=>{setPrice(e.target.value)}} className="productPrice" required/></label>
          <label >Product image : TBD</label>
          <label >Mark product as VIP<input type="checkbox" checked={vip_price} onChange={handleCheckboxChange}/></label>
          <button className="addProductButton">Add Product</button>
         </form>
      </div>
    )
}

export default AddNewProduct;

// 