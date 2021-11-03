import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import "./myprofile.css";
import { useHistory } from "react-router";

const MyProfile = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  return (
    <Fragment>
      <div className="profileWrapper">
        <h1 className="pageTitle">Profile</h1>
        <div className="profile">
          <div className="imageSection">
            <img src={user.avatar.url} alt="" />
            <button
              onClick={() => history.push("/profile/edit-profile")}
              className="btn-submit"
            >
              Edit Profile
            </button>
          </div>
          <div className="section">
            <div className="infoChild">
              <h1 className="title">Name</h1>
              <p className="subtitle">{user.name}</p>
            </div>
            <div className="infoChild">
              <h1 className="title">Email</h1>
              <p className="subtitle">{user.email}</p>
            </div>
            <div className="infoChild">
              <h1 className="title">Joined On</h1>
              <p className="subtitle">{user.createdAt || "01-01-2021"}</p>
            </div>
            <div className="infoChild">
              <button className="btn-submit">Edit Profile</button>
            </div>
            <div className="infoChild">
              <button className="btn-submit">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyProfile;
