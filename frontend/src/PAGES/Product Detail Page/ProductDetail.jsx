import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleProduct } from "../../REDUX/Actions/productAction.js";
import Carousel from "react-material-ui-carousel";
import "./productDetail.css";
import ReactStars from "react-rating-stars-component";

const ProductDetail = () => {
  const { singleProduct } = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const options = {
    productcount: 5,
    value: singleProduct?.ratings,
    size: 24,
    isHalf: true,
    edit: false,
    activeColor: "#ffd700",
  };

  const handlePlus = () => {};
  return (
    <Fragment>
      <div className="productDetail">
        <Carousel>
          {singleProduct?.images &&
            singleProduct?.images.map((image, i) => (
              <img
                className="carousolImage"
                src={image.url}
                alt={`${i}`}
                key={i}
              />
            ))}
        </Carousel>
        <div className="infoSection">
          <h1 className="productTitle">{singleProduct?.name}</h1>
          <p className="productId">Product #{singleProduct?._id}</p>
          <div className="ratingSection">
            <ReactStars {...options}></ReactStars>
            <p className="ratingNo">{singleProduct?.numOfReviews} Reviews</p>
          </div>
          <div className="addCartSection">
            <h1 className="price">${singleProduct?.price}</h1>
            <div className="quantitySelector">
              <button className="btn minusButton">-</button>
              <input type="number" className="quantity" defaultValue="1" />
              <button className="btn plusButton" onClick={handlePlus}>
                +
              </button>
            </div>
            <button className="btn-big addToCart"> Add To Cart</button>
            <h3 className="status">
              Status : {""}
              <b className={singleProduct?.stock > 0 ? "green" : "red"}>
                {singleProduct?.stock > 0 ? "In Stock" : "Out Of Stock"}
              </b>
            </h3>
          </div>
          <div className="briefInfo">
            <p className="description">{singleProduct?.description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetail;
