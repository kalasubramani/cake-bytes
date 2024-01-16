import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";

const EditAProduct = ({products})=>{   
    const [name, setName]=useState('');
    const [price, setPrice]=useState(0);
    const [description, setDescription]=useState('');
    const [vip_price,setVipPrice]=useState(0);
    const [checked, setChecked]=useState(false);
   
    const navigate=useNavigate();
    
    //get the product id from url
    const { id } = useParams();

    //find selected product from products list
    const product = products?.find((product) => {
        return product.id === id;
      });
    
    const handleSubmit =(e)=>{
        e.preventDefault();
            
        const newProduct={
            product_id: id,
            name,
            price,
            description,
            vip_price
        }

        const updateProducts = async (productId)=>{
          await api.updateProduct(newProduct,productId);
        }
        updateProducts(product.id);
         
        setName('');
        setPrice('');
        setDescription('');
        setVipPrice(''); 
    
        navigate("/")
    }

    const handleCheckboxChange = () =>{      
      setVipPrice(price*.9)
    }
      
    return (
    <div>
        <h3> Cake Update </h3>
        <form onSubmit={handleSubmit}>
        <label > Cake Name : <input type="text" onChange={(e)=>{setName(e.target.value)}} className="productText" required/></label>         
          <label > Description : <input type="text" onChange={(e)=>{setDescription(e.target.value)}} className="productText" required/></label>
          <label >Price : <input type="number" step=".01" onChange={(e)=>{setPrice(e.target.value)}} className="productPrice" required/></label>
          <label > Upload image : TBD</label>
          <label>Mark product as VIP <input type="checkbox" value={checked} onChange={handleCheckboxChange} /></label>
          <button className="addProductButton" onClick={handleSubmit}>Add Cake</button>  
        </form>


    </div>
 )
}

export default EditAProduct;