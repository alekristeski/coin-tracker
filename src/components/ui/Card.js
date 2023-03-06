import React from "react";
import {
  Card as MuiCard,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  heading: {
    backgroundColor: "#F4F4F4",
    padding: "10px",
  },
  content: {
    padding: "0px 10px 10px 10px",
  },
}));

export default function Card({ title, children }) {
  const classes = useStyles();
  return (
    <MuiCard raised className={classes.root}>
      <CardContent className={classes.heading} style={{}}>
        <Typography color="textSecondary">{title}</Typography>
      </CardContent>
      <CardContent className={classes.content}>{children}</CardContent>
    </MuiCard>
  );
}
