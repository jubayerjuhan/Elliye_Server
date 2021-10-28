import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleProduct } from "../../REDUX/Actions/productAction.js";

const ProductDetail = () => {
  const singleProduct = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Product Detail Page</h1>
    </div>
  );
};

export default ProductDetail;
