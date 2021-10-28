import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Homepage.css";
import FeaturedProducts from "./Compos/Featured Products/FeaturedProducts";
import MetaData from "./../../Components/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../REDUX/Actions/productAction.js";
import Loader from "../../Components/Loader/Loader.jsx";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { products, loading } = useSelector((state) => state.products);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="The Thrift Shop" />
          <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#component">
              <button>
                Scroll Down <CgMouse />
              </button>
            </a>
          </div>
          {console.log(products)}
          <h6 className="collection-title">Featured Products</h6>
          <div className="featProduct-container" id="component">
            {products?.map((product) => (
              <FeaturedProducts product={product}></FeaturedProducts>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Homepage;
