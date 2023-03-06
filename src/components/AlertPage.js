import React from "react";
import Alert from "@mui/material/Alert";
import { Grid } from "@material-ui/core";

const AlertPage = ({ text, severity, children }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item style={{ width: "100%" }}>
        <Alert severity={severity}>{text}</Alert>
      </Grid>
      <br />
      <Grid item style={{ marginTop: "20px" }}>
        {children}
      </Grid>
    </Grid>
  );
};
export default AlertPage;
