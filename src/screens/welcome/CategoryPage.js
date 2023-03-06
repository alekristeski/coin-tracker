import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Controls from "../../components/ui/Controls";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";

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
    marginBottom: "20px",
    marginTop: "20px",
  },
}));

const CategoryPage = ({ handleStep }) => {
  const [chosenCategories, setchosenCategories] = useState([]);
  const { categories, setActiveCategories } = useContext(Context);

  const classes = useStyles();

  const handleToggle = (e, cat) => {
    if (e.target.checked) {
      setchosenCategories([...chosenCategories, cat]);
    } else {
      const deleteCat = chosenCategories.filter((c) => c.id !== cat.id);
      setchosenCategories(deleteCat);
    }
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
            Choose what you spend money on
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid item>
            <List dense>
              {categories.map((cat) => {
                return (
                  <ListItem key={cat.id} divider={true} disableGutters>
                    <ListItemIcon>
                      <Icon style={{ color: "black" }}>{cat.iconName}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={cat.name} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={(e) => handleToggle(e, cat)}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.buttonCont}>
        <Controls.Button
          text="Done"
          disabled={chosenCategories.length ? false : true}
          onClick={() => {
            setActiveCategories(chosenCategories);
            localStorage.setItem(
              "categories",
              JSON.stringify(chosenCategories)
            );
            handleStep(3);
          }}
        />
      </Grid>
    </>
  );
};
export default CategoryPage;
