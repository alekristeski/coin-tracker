import React, { useContext } from "react";
import {
  Grid,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Controls from "../../components/ui/Controls";
import { Context } from "../../context/Context";

const useStyles = makeStyles({
  expense: {
    color: "#c24242",
  },
  income: {
    color: "#3ea842",
  },
  disabled: {
    color: "#adadad",
  },
  smallText: {
    fontSize: "7px",
    color: "grey",
    fontWeight: "600",
  },
  list: {
    paddingBottom: 0,
  },
  listItem: {
    height: "50px",
  },
});
const Categories = ({ overlay, handleCategoryModalOpen }) => {
  const classes = useStyles();

  const { activeCategories } = useContext(Context);

  const categoryStyles = (cat) => {
    const baseStyle = classes.listItem;

    const categoryType = {
      Expense: classes.expense,
      Income: classes.income,
    };

    const categoryEnabled = {
      true: categoryType[cat.type],
      false: classes.disabled,
    };

    return `${baseStyle} ${categoryEnabled[cat.isEnabled]}`;
  };
  return (
    <Grid container justifyContent="center" className={overlay || ""}>
      <Grid item xs={10}>
        <Controls.Card title="Categories">
          <List dense className={classes.list}>
            <ListItem
              button
              disableGutters
              divider
              className={classes.listItem}
              onClick={() => {
                handleCategoryModalOpen();
              }}
            >
              <ListItemIcon style={{ minWidth: "40px" }}>
                <Icon style={{ color: "black" }}>{"add"}</Icon>
              </ListItemIcon>
              <ListItemText primary="Add New Category" />
            </ListItem>
            {activeCategories.map((cat, idx) => {
              const isExpense = cat.type === "Expense" ? true : false;
              return (
                <div key={cat.id + idx + cat.name}>
                  <ListItem
                    disableGutters
                    button
                    divider
                    className={`${categoryStyles(cat)}`}
                    onClick={(event) => {
                      handleCategoryModalOpen(event, cat);
                    }}
                  >
                    <ListItemIcon style={{ minWidth: "40px" }}>
                      <Icon
                        className={`${
                          classes[
                            cat.isEnabled
                              ? isExpense
                                ? "expense"
                                : "income"
                              : "disabled"
                          ]
                        }`}
                      >
                        {cat.iconName}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText primary={cat.name} />
                    <ListItemText
                      disableTypography
                      primary={
                        cat.budget > 0 ? (
                          <Typography
                            variant="body2"
                            style={{ lineHeight: "1" }}
                          >
                            {cat.budget}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            className={classes.smallText}
                          >
                            {"NO BUDGET LIMIT"}
                          </Typography>
                        )
                      }
                      secondary={
                        cat.budget > 0 && (
                          <Typography
                            className={classes.smallText}
                            variant="caption"
                          >
                            {isExpense ? "BUDGET" : "PLANNED"}
                          </Typography>
                        )
                      }
                      style={{ textAlign: "right" }}
                    />
                  </ListItem>
                </div>
              );
            })}
          </List>
        </Controls.Card>
      </Grid>
    </Grid>
  );
};
export default Categories;
