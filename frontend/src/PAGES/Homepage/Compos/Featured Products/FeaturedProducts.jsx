import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const FeaturedProducts = ({ product }) => {
  const options = {
    productcount: 5,
    value: 4.5,
    size: 24,
    isHalf: true,
    edit: false,
    activeColor: "#ffd700",
  };
  console.log(product);
  return (
    <Link className="feat-product-card" to={`product/${product._id}`}>
      <div className="container">
        <div className="image">
          <img className="img-responsive" src={product.images[0].url} alt="" />
        </div>
        <h5 className="title">{product.name}</h5>
        <ReactStars {...options} />
        <span>(456 Reviews)</span>
        <h5 className="product-price">${product.price}</h5>
      </div>
    </Link>
  );
};

export default FeaturedProducts;
