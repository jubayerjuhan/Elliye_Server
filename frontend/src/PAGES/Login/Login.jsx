import React, { Fragment, useEffect, useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, reqLoginUser } from "../../REDUX/Actions/userAction.js";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

const Login = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  if (isAuthenticated) {
    history.push("/");
  }
  const initialState = {
    email: "",
    password: "",
  };
  const [loginCredentials, setLoginCredentials] = useState(initialState);
  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reqLoginUser(loginCredentials.email, loginCredentials.password));
  };
  useEffect(() => {
    dispatch(clearError());
    if (error) {
      alert.error(error);
    }
  }, [alert, dispatch, error]);
  return (
    <Fragment>
      <div className="login">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>
          <div className="inputSection">
            <MdEmail />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              required
              placeholder="Enter Email Address"
            />
          </div>
          <div className="inputSection">
            <MdPassword />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              required
              placeholder="Enter Password"
            />
          </div>
          <button onClick={handleSubmit} className="btn btn-submit">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
