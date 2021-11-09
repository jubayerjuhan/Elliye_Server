import React from "react";
import { Fragment } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import "./dashboard.css";
import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";

const Dashboard = () => {
  const data = {
    labels: ["Juhan", "Abir", "Hossain"],
    datasets: [
      {
        data: [10, 10, 10],
      },
    ],
  };

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <Grid container spacing={1}>
          <Grid item md={8}>
            <div className="heroInfo">
              <div>
                <p>Product</p>
              </div>
              <div>
                <p>User</p>
              </div>
              <div>
                <p>Orders</p>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className="priceInfo">
              <h3 className="sellTotal">Total Sell</h3>
              <h1>$183239</h1>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="stockChart">
              <h3>Product Stock Status</h3>
              <Doughnut data={data} height={40} width={70} />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            grid
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Dashboard;
