import React from "react";
import { Grid } from "@material-ui/core";
import CategoryCard from "../../components/CategoryCard";
import EntriesCard from "../../components/EntriesCard";

const Overview = ({ overlay, handleEntryModalOpen }) => {
  const entriesTotal = (entry) => {
    return entry ? entry.reduce((acc, curr) => acc + curr.amount, 0) : 0;
  };

  const calculatePercentage = (num1, num2) => {
    return !num1 || num1 === 0
      ? 0
      : num1 > num2
      ? 100
      : Math.round((num1 / num2) * 100);
  };

  return (
    <Grid container justifyContent="center" className={overlay || ""}>
      <Grid item xs={10}>
        <CategoryCard
          type="Income"
          entriesTotal={entriesTotal}
          calculatePercentage={calculatePercentage}
        />
      </Grid>
      <Grid item xs={10}>
        <CategoryCard
          type="Expense"
          entriesTotal={entriesTotal}
          calculatePercentage={calculatePercentage}
        />
      </Grid>
      <Grid item xs={10}>
        <EntriesCard handleEntryModalOpen={handleEntryModalOpen} />
      </Grid>
    </Grid>
  );
};

export default Overview;
