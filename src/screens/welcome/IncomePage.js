import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

import Controls from "../../components/ui/Controls";

const useStyles = makeStyles((theme) => ({
  heading: {
    letterSpacing: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  question: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    fontSize: "12px",
  },
  buttonCont: {
    alignSelf: "flex-end",
    marginBottom: "1rem",
  },
}));
const IncomePage = ({ handleStep, setBudgetTotal }) => {
  const [budget, setBudget] = useState("");
  const [inputValid, setInputValid] = useState(true);

  const classes = useStyles();

  const handleSetBudgetTotal = () => {
    const isBudgetValid = budget > 0;
    setInputValid(isBudgetValid);
    isBudgetValid && (setBudgetTotal(+budget) || handleStep(2));
  };

  return (
    <>
      <Grid item xs={10}>
        <Grid item xs={12}>
          <Typography
            className={classes.heading}
            variant="h5"
            component="h2"
            align="center"
          >
            WELCOME
          </Typography>
          <Typography className={classes.question} component="p" align="center">
            How much money do you have at the moment?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            label="Amount"
            variant="filled"
            type="number"
            error={!inputValid}
            helperText={
              !inputValid &&
              "The amount is required and must be greater than zero."
            }
            size="small"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.buttonCont}>
        <Controls.Button text="Add" onClick={handleSetBudgetTotal} />
      </Grid>
    </>
  );
};
export default IncomePage;
