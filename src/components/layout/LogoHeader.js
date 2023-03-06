import React from "react";
import { Grid } from "@material-ui/core";
import logo from "../../assets/logo-text.png";

const LogoHeader = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={4} sm={3} md={2}>
        <img
          src={logo}
          style={{ width: "100%", marginBottom: "50px" }}
          alt="logo"
        />
      </Grid>
    </Grid>
  );
};
export default LogoHeader;
