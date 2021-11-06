import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearError,
  getSingleProduct,
} from "../../REDUX/Actions/productAction.js";
import Carousel from "react-material-ui-carousel";
import "./productDetail.css";
import ReactStars from "react-rating-stars-component";
import ReviewShow from "./../../Components/ReviewShowingComponent/ReviewShow";
import Loader from "./../../Components/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "./../../Components/MetaData/MetaData";
import { addToCart } from "../../REDUX/Actions/cartAction.js";

const ProductDetail = () => {
  const { singleProduct, error, loading } = useSelector(
    (state) => state.singleProduct
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getSingleProduct(id));
  }, [dispatch, id, alert, error]);

  const options = {
    productcount: 5,
    value: singleProduct?.ratings,
    size: 24,
    isHalf: true,
    edit: false,
    activeColor: "#ffd700",
  };

  const increaseQuantity = (e) => {
    if (quantity >= singleProduct.stock) {
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(singleProduct._id, quantity));
    alert.success("Item Added To Cart");
  };
  return (
    <Fragment>
      <MetaData title={`${singleProduct?.name}`} />
      {loading ? (
        <Loader />
      ) : (
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
                <p className="ratingNo">
                  {singleProduct?.numOfReviews} Reviews
                </p>
              </div>
              <div className="addCartSection">
                <h1 className="price">${singleProduct?.price}</h1>
                <div className="quantitySelector">
                  <button
                    className="btn minusButton"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity"
                    value={quantity}
                    readOnly
                  />
                  <button className="btn plusButton" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
                <button className="btn-big addToCart" onClick={handleAddToCart}>
                  {" "}
                  Add To Cart
                </button>
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
            <div className="reviewContainer">
              <div className="titleContainer">
                <h1 className="title">Reviews</h1>
              </div>
              {singleProduct?.reviews?.length > 0 ? (
                <ReviewShow reviews={singleProduct?.reviews}></ReviewShow>
              ) : (
                <h4>Not Yet Reviewed</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
