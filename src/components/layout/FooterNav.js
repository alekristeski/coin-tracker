import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Fab, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../ui/Controls";
import { Context } from "../../context/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
    zIndex: "1111111",
  },
  nav: {
    backgroundColor: theme.palette.primary.main,
  },

  icons: {
    color: "white",
  },
  fabCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fabBtn: {
    bottom: "50%",
  },
  addExpBtn: {
    position: "absolute",
    bottom: "170px",
    right: "25%",
    width: "130px !important",
  },
  addIncBtn: {
    position: "absolute",
    bottom: "120px",
    right: "25%",
    width: "130px !important",
  },
}));

const FooterNav = ({ onPage, setOnPage, handleEntryModalOpen }) => {
  const {
    fabModalOpen,
    setFabModalOpen,
    entryModalOpen,
    setEntryModalOpen,
    categoryModalOpen,
    setCategoryModalOpen,
  } = useContext(Context);

  const classes = useStyles();

  const handleFabBtn = () => {
    entryModalOpen && setEntryModalOpen(false);
    categoryModalOpen && setCategoryModalOpen(false);
    setFabModalOpen(!fabModalOpen);
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Grid item xs={9}>
          <BottomNavigation
            value={onPage}
            onChange={(_, newValue) => {
              setOnPage(newValue);
            }}
            className={classes.nav}
            showLabels
          >
            <BottomNavigationAction
              className={`${classes.icons}`}
              label="Overview"
              icon={<HomeIcon />}
            />

            <BottomNavigationAction
              className={`${classes.icons}`}
              label="Categories"
              icon={<CategoryIcon />}
            />

            <BottomNavigationAction
              className={`${classes.icons}`}
              label="Statistics"
              icon={<EqualizerIcon />}
            />
          </BottomNavigation>
        </Grid>
        <Grid item xs={3} className={classes.fabCont}>
          <Fab
            className={classes.fabBtn}
            color="secondary"
            aria-label="add"
            onClick={handleFabBtn}
          >
            <AddIcon />
          </Fab>
          {fabModalOpen && (
            <Controls.Button
              text="Add Expense"
              size="small"
              className={classes.addExpBtn}
              data-usage="Expense"
              onClick={handleEntryModalOpen}
            />
          )}
          {fabModalOpen && (
            <Controls.Button
              text="Add Income"
              size="small"
              className={classes.addIncBtn}
              data-usage="Income"
              onClick={handleEntryModalOpen}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FooterNav;
