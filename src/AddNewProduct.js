import axios from "axios";
import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const AddNewProduct = ({setProducts})=>{
const [name,setName]=useState('');
const [description,setDescription]=useState('');
const [price,setPrice]=useState(0);
const [is_vip_product,setVipProduct]=useState(false);

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
      is_vip_product
     }
     console.log("product obj ", product);
     const addProduct = async (newProduct,setProducts)=>{
        const response = await api.addNewProduct(newProduct,setProducts);
        
     }
     addProduct(product,setProducts);

     //clear out form fields
     setName('');
     setDescription('');
     setPrice('');
     setVipProduct(false); //default value = false

     //redirect to products page
     navigate("/")
  }

  const handleCheckboxChange = () =>{
    setVipProduct(isVipProduct => !isVipProduct)
  }
  console.log('value of checkbox : ', is_vip_product);
   return (
     <div className="addProductContainer">      
        <p> Enter new product details here</p>
        <form onSubmit={handleSubmit}>
          <label >Product Name : <input type="text" onChange={(e)=>{setName(e.target.value)}} className="productText" required/></label>         
          <label >Product Description : <input type="text" onChange={(e)=>{setDescription(e.target.value)}} className="productText" required/></label>
          <label >Price : <input type="number" step=".01" onChange={(e)=>{setPrice(e.target.value)}} className="productPrice" required/></label>
          <label >Product image : TBD</label>
          <label >Mark product as VIP only <input type="checkbox" checked={is_vip_product} onChange={handleCheckboxChange}/></label>
          <button className="addProductButton">Add Product</button>
         </form>
      </div>
    )
}

export default AddNewProduct;

// 