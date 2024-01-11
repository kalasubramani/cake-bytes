import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";


const ProductDetails = ({ products, displayPrice ,auth}) => {
  const navigate=useNavigate();
  const [reviews, setReviews] = useState([]);
  const isLoggedIn = !!auth.id ;
  
  //get the product id from url
  const { id } = useParams();

  //find selected product from products list
  const selectedProduct = products?.find((product) => {
    return product.id === id;
  });
 
  useEffect(() => {
   if (selectedProduct) {
      //fetch reviews from db
      const fetchReviews = async (productId) => {
        await api.fetchProductReviews(productId, setReviews);
      };
      fetchReviews(selectedProduct.id);
    }
  }, [selectedProduct]);

  const productReviews = reviews?.map((review) => {
    return (
      <li key={review.id}>
        {review.comments} | RATINGS : {review.ratings}
      </li>
    );
  });

  return (
    <div>
      <h2>Display selected product</h2>
      <div>
        <h3>{selectedProduct?.name}</h3>
        <p>{selectedProduct?.description}</p>
        {/* <img src={`../public/assets/${selectedProduct.product_image_name}`}></img> */}
        {/* <p>${displayPrice(selectedProduct.price)}</p> */}
        <p>${displayPrice(selectedProduct?.price)}</p>
      </div>
      <hr />
      {/* {productReviews.length > 0 ? ( */}
        <div>
          <h3>Reviews about the product</h3>
          {/* show the button only for logged in user */}
          {isLoggedIn && 
          <button onClick={() => {
                        navigate(`/products/${selectedProduct?.id}/review`);
                      }}>Write a product review</button>
           }
         {productReviews.length >0 &&  <ul>{productReviews}</ul> }
        </div>  
      {/* ) : (   */}
      {!productReviews.length && 
        <div>
          <p>There are no reviews for this product.</p>
        </div>
        }
      {/* ) 
      }*/}
    </div>
  );
};

export default ProductDetails;
