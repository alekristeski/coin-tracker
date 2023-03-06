import React from "react";
import { Grid } from "@material-ui/core";
import Chart from "../../components/Chart";
import Controls from "../../components/ui/Controls";

const Statistics = ({ overlay }) => {
  return (
    <Grid container justifyContent="center" className={overlay || ""}>
      <Grid item xs={11}>
        <Controls.Card title="Income">
          <Chart type="Income" />
        </Controls.Card>
      </Grid>
      <Grid item xs={11}>
        <Controls.Card title="Expense">
          <Chart type="Expense" />
        </Controls.Card>
      </Grid>
      <Grid item xs={11}>
        <Controls.Card title="Expense and Income">
          <Chart type="Multi" />
        </Controls.Card>
      </Grid>
    </Grid>
  );
};
export default Statistics;
