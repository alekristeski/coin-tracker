import React, { useContext } from "react";
import {
  Icon,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Context } from "../context/Context";
import AlertPage from "./AlertPage";
import Controls from "./ui/Controls";

const useStyles = makeStyles({
  root: {
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#ffbdbd",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#c24242",
    },
    "& .MuiLinearProgress-colorSecondary": {
      backgroundColor: "#b5f5b6",
    },
    "& .MuiLinearProgress-barColorSecondary": {
      backgroundColor: "#3ea842",
    },
  },
  green: {
    color: "#3ea842",
  },
  red: {
    color: "#c24242",
  },
});

const CategoryCard = ({ entriesTotal, calculatePercentage, type }) => {
  const { activeCategories, entries } = useContext(Context);
  const classes = useStyles();

  const categories = activeCategories
    ? activeCategories.reduce((acc, cat) => {
        if (cat.type === type && cat.isEnabled === true) {
          acc.push(cat);
        }
        return acc;
      }, [])
    : null;

  return (
    <Controls.Card title={type}>
      <List dense>
        {categories.length ? (
          categories.map((category, idx) => {
            const matchingEntries = entries.filter(
              (entry) => entry.categoryId === category.id
            );

            const budgetExceeded =
              entriesTotal(matchingEntries) > category.budget;

            return (
              <div key={category.id + idx + category.name}>
                <ListItem disableGutters>
                  <ListItemIcon style={{ minWidth: "40px" }}>
                    <Icon
                      className={budgetExceeded ? classes.red : classes.green}
                    >
                      {category.iconName}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                  <ListItemText
                    primary={`${entriesTotal(matchingEntries)}${
                      category.budget ? `/${category.budget}` : ""
                    }`}
                    style={{ textAlign: "right" }}
                  />
                </ListItem>
                <div className={classes.root}>
                  <LinearProgress
                    variant="determinate"
                    color={budgetExceeded ? "primary" : "secondary"}
                    value={calculatePercentage(
                      entriesTotal(matchingEntries),
                      category.budget
                    )}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <ListItem disableGutters>
            <AlertPage
              severity="info"
              text={`No active ${type.toLowerCase()} categories.`}
            />
          </ListItem>
        )}
      </List>
    </Controls.Card>
  );
};

export default CategoryCard;
