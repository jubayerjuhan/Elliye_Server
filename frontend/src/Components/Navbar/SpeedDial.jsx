import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import "./speeddial.css";

import { RiDashboard2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const actions = [
  { icon: <RiDashboard2Line />, name: "Orders" },
  { icon: <RiDashboard2Line />, name: "Account" },
  { icon: <RiDashboard2Line />, name: "Logout" },
];

export default function SpeedDialBasic() {
  const { user } = useSelector((state) => state.user);
  if (user.role === "admin") {
    actions.unshift({ icon: <RiDashboard2Line />, name: "Dashboard" });
  }
  return (
    <div className="sdcontainer">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
        direction="down"
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
