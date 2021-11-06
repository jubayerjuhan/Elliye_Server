import React, { useState } from "react";
import { Fragment } from "react";
import "./shipping.css";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { Country, State, City } from "country-state-city";

const initialState = {
  country: "",
  state: "",
  name: "",
  street: "",
  city: "",
  zipcode: "",
  phoneNumber: "",
};
const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState(initialState);
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  console.log(shippingInfo);
  return (
    <Fragment>
      <div className="shippingPage">
        <div className="shippingDetailsContainer">
          <h3>Shipping Details</h3>
          <form action="">
            <div className="formInput">
              <IoPeopleCircleOutline />
              <input
                type="text"
                placeholder="Enter Name"
                required={true}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <IoPeopleCircleOutline />
              <input
                type="text"
                placeholder="Street"
                required={true}
                name="street"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <IoPeopleCircleOutline />
              <input
                type="text"
                placeholder="City"
                required={true}
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <IoPeopleCircleOutline />
              <input
                type="text"
                placeholder="Zip Code"
                required={true}
                name="zipcode"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <IoPeopleCircleOutline />
              <input
                type="number"
                placeholder="Phone Number"
                required={true}
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="formInput">
              <IoPeopleCircleOutline />
              <select
                name="country"
                onChange={handleChange}
                required={true}
                value={shippingInfo.country || ""}
              >
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {shippingInfo.country && (
              <div className="formInput">
                <IoPeopleCircleOutline />
                <select name="state" onChange={handleChange} required={true}>
                  {State &&
                    State.getStatesOfCountry(shippingInfo.country).map(
                      (item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      )
                    )}
                </select>
              </div>
            )}
            <input className="submitBtn" type="submit" value="Save" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
