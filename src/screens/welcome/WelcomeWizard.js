import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import LogoHeader from "../../components/layout/LogoHeader";
import IncomePage from "./IncomePage";
import AmountPage from "./AmountPage";
import CategoryPage from "./CategoryPage";
import { Grid, makeStyles } from "@material-ui/core";
import { navigate } from "@reach/router";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "20px",
    paddingBottom: "20px",
    height: "100vh",
  },
  noList: {
    paddingTop: "20px",
    paddingBottom: "20px",
    height: "auto",
  },
}));

export default function WelcomeWizard() {
  const [step, setStep] = useState(1);
  const { setBudgetTotal, categories, isSignedIn } = useContext(Context);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/main");
    }
  }, []);

  const classes = useStyles();
  const containerClass = `${classes.root} ${
    step === 2 || (step === 3 && categories.length > 6) ? classes.noList : ""
  }`;
  const pages = [
    <IncomePage handleStep={setStep} setBudgetTotal={setBudgetTotal} />,
    <CategoryPage handleStep={setStep} />,
    <AmountPage />,
  ];
  return (
    <Grid
      container
      justifyContent="center"
      className={containerClass}
      style={{
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid item>
        <LogoHeader />
      </Grid>
      {pages[step - 1]}
    </Grid>
  );
}
