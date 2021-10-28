import React, { Fragment } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../Images/Logo.png";

const Navbar = () => {
  return (
    <Fragment>
      <ReactNavbar logo={logo} burgerColor="white"></ReactNavbar>
    </Fragment>
  );
};

export default Navbar;
