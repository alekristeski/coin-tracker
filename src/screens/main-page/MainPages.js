import React, { useState, useContext, useEffect } from "react";
import { Link } from "@reach/router";
import { Context } from "../../context/Context";
import TopNav from "../../components/layout/TopNav";
import FooterNav from "../../components/layout/FooterNav";
import { Dialog, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Overview from "./Overview";
import Categories from "./Categories";
import Statistics from "./Statistics";
import EntryModal from "./EntryModal";
import CategoryModal from "./CategoryModal";
import AlertPage from "../../components/AlertPage";
import Controls from "../../components/ui/Controls";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    paddingTop: "80px",
    paddingBottom: "80px",
  },
  overlay: {
    opacity: 0.25,
  },
}));

export default function MainPages() {
  const [onPage, setOnPage] = useState(0);
  const [fabButtonClicked, setFabButtonClicked] = useState("");
  const [entryClicked, setEntryClicked] = useState("");
  const [categoryClicked, setCategoryClicked] = useState("");

  const {
    activeCategories,
    newEntry,
    isSignedIn,
    fabModalOpen,
    setFabModalOpen,
    entryModalOpen,
    setEntryModalOpen,
    addNewEntry,
    updateEntry,
    updatedEntry,
    categoryModalOpen,
    setCategoryModalOpen,
    addNewCategory,
    newCategory,
    updateCategory,
    updatedCategory,
    confOpen,
  } = useContext(Context);

  useEffect(() => {
    entryModalOpen && handleEntryModalClose();
    fabModalOpen && setFabModalOpen(false);
    categoryModalOpen && setCategoryModalOpen(false);
  }, [onPage]);

  const classes = useStyles();

  const handleEntryModalOpen = (event, ent) => {
    fabModalOpen && setFabModalOpen(false);
    setEntryModalOpen(true);
    if (event.currentTarget.hasAttribute("data-usage")) {
      setFabButtonClicked(event.currentTarget.getAttribute("data-usage"));
      setEntryClicked("");
    } else {
      setEntryClicked(ent);
    }
  };
  const handleEntryModalClose = () => {
    setEntryModalOpen(false);
  };

  const handleNewEntrySubmit = (e) => {
    e.preventDefault();
    if (!entryClicked) {
      addNewEntry(newEntry);
    } else {
      updateEntry(updatedEntry);
    }
  };
  const handleCategoryModalOpen = (event, cat) => {
    fabModalOpen && setFabModalOpen(false);
    entryModalOpen && setEntryModalOpen(false);
    setCategoryModalOpen(true);
    cat ? setCategoryClicked(cat) : setCategoryClicked("");
  };

  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryClicked) {
      addNewCategory(newCategory);
    } else {
      updateCategory(updatedCategory);
    }
  };

  return isSignedIn ? (
    <Grid
      container
      style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
      className={classes.root}
    >
      <TopNav onPage={onPage} />
      {onPage === 0 && (
        <Overview
          overlay={
            (fabModalOpen || entryModalOpen || confOpen) && classes.overlay
          }
          handleEntryModalOpen={handleEntryModalOpen}
        />
      )}
      {onPage === 1 && (
        <Categories
          handleCategoryModalOpen={handleCategoryModalOpen}
          overlay={
            (fabModalOpen || entryModalOpen || categoryModalOpen) &&
            classes.overlay
          }
        />
      )}
      {onPage === 2 && (
        <Statistics
          overlay={(fabModalOpen || entryModalOpen) && classes.overlay}
        />
      )}
      <Grid item xs={10}>
        <Dialog
          open={entryModalOpen}
          onClose={handleEntryModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleNewEntrySubmit}>
            <EntryModal
              open={entryModalOpen}
              handleClose={handleEntryModalClose}
              fabButtonClicked={fabButtonClicked}
              inUpdateMode={!!entryClicked}
              entryClicked={entryClicked}
              cats={activeCategories}
            />
          </form>
        </Dialog>
      </Grid>
      <Grid item xs={10}>
        <Dialog
          open={categoryModalOpen}
          onClose={handleCategoryModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleCategorySubmit}>
            <CategoryModal
              open={categoryModalOpen}
              handleClose={handleCategoryModalClose}
              inUpdateMode={!!categoryClicked}
              categoryClicked={categoryClicked}
              cats={activeCategories}
            />
          </form>
        </Dialog>
      </Grid>
      <FooterNav
        onPage={onPage}
        setOnPage={setOnPage}
        fabModalOpen={fabModalOpen}
        setFabModalOpen={setFabModalOpen}
        handleEntryModalOpen={handleEntryModalOpen}
        setFabButtonClicked={setFabButtonClicked}
      />
    </Grid>
  ) : (
    <Grid
      container
      style={{ height: "100vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={11} sm={6} lg={3}>
        <AlertPage
          text="You need to sign in or sign up first!"
          severity={"warning"}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Controls.Button text="Go back" />
          </Link>
        </AlertPage>
      </Grid>
    </Grid>
  );
}
