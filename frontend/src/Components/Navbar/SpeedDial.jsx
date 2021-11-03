import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import "./speeddial.css";
import {
  RiDashboard2Line,
  RiAccountCircleFill,
  RiFileList3Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "../../REDUX/Actions/userAction.js";
import { useAlert } from "react-alert";

export default function SpeedDialBasic() {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const actions = [
    { icon: <RiFileList3Line />, name: "Orders" },
    { icon: <RiAccountCircleFill />, name: "Account" },
    { icon: <RiLogoutCircleLine />, name: "Logout" },
  ];
  if (user.role === "admin") {
    actions.unshift({ icon: <RiDashboard2Line />, name: "Dashboard" });
  }

  const handleClick = (name) => {
    if (name === "Dashboard") {
      history.push("/admin/profile");
    } else if (name === "Logout") {
      dispatch(logoutUser());
      history.push("/");
      alert.success("Logged Out Successfully");
    } else {
      history.push(`/${name.toLowerCase()}`);
    }
  };

  return (
    <div className="sdcontainer">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={
          <img src={user.avatar.url} alt="Profile Pic" className="profilePic" />
        }
        direction="down"
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={Math.floor(Math.random() * 10)}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
