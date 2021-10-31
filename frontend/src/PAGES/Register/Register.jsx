import React, { Fragment, useEffect, useState } from "react";
import { MdEmail, MdOutlinePeopleOutline, MdPassword } from "react-icons/md";
import { clearError, reqRegister } from "./../../REDUX/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";

const Register = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  if (isAuthenticated) {
    history.push("/");
  }
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [regCredentials, setRegCredentials] = useState(initialState);
  const { name, email, password } = regCredentials;
  const [avatar, setAvatar] = useState("");
  console.log(avatar);
  console.log(name, email, password);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegCredentials({ ...regCredentials, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reqRegister(name, email, password, avatar));
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
            <MdOutlinePeopleOutline />
            <input
              onChange={handleChange}
              type="email"
              name="name"
              required
              placeholder="Enter Email Address"
            />
          </div>
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
          <div className="inputSection">
            <MdPassword />
            <input onChange={handleChange} type="file" name="avatar" required />
          </div>
          <button onClick={handleSubmit} className="btn btn-submit">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
