import React from "react";
import { Fragment } from "react";
import CustomizedSteppers from "./../../Utils/Stepper/Stepper";
import "./confirmOrder.css";

import { useDispatch, useSelector } from "react-redux";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { name, phoneNumber, street, city, state, country, zipcode } =
    shippingInfo;
  const address = `${street}, ${city} #${zipcode}, ${country}`;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subtotal < 1000 ? 10 : 20;
  const gst = (subtotal * 15) / 100;
  const totalPrice = subtotal + shippingCharge + gst;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <CustomizedSteppers activeStep={1} />
      <div className="wholepageWrapper">
        <div className="infoSection">
          <div className="shippingInfo">
            <h3 className="header">Shipping Info</h3>
            <div className="shippingInfo-container">
              <p>
                <span>Name </span>: {name}
              </p>
              <p>
                <span>Phone </span>: {phoneNumber}
              </p>
              <p>
                <span>Address </span>: {address}
              </p>
            </div>
          </div>
          <div className="inmyCart">
            <h3 className="header">Your Cart Items</h3>
            <div className="inCart">
              {cartItems.map((item) => (
                <div className="items">
                  <div className="items-flx">
                    <img src={item.image.url} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <p>
                      {item.quantity} x ${item.price} = $
                      <b>{item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="priceSection">
          <h4>Order Summery</h4>
          <div className="priceMapping">
            <div>
              <p>Subtotal</p>
              <span>${subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges</p>
              <span>${shippingCharge}</span>
            </div>
            <div>
              <p>GST/VAT</p>
              <span>${gst}</span>
            </div>
          </div>
          <div className="total">
            <p>Total</p>
            <span>${totalPrice}</span>
          </div>
          <button className="checkoutBtn">Checkout</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
