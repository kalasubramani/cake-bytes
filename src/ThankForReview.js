import React from "react";
import { Link } from "react-router-dom";

const ThankForReview= ()=>{

  return(
    <>
    <h3>Review submitted - Thank you!</h3>
    <h5>Click <Link to='/orders'>here</Link> review other products you have purchased.</h5>
    </>
  )
}

export default ThankForReview;