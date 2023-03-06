import React, { useContext } from "react";
import {
  Grid,
  InputAdornment,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { navigate } from "@reach/router";
import { Context } from "../../context/Context";
import Controls from "../../components/ui/Controls";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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

const AmountPage = () => {
  const { activeCategories, setIsSignedIn } = useContext(Context);
  const classes = useStyles();

  const handleComplete = () => {
    setIsSignedIn(true);
    localStorage.setItem("signedIn", "true");
    navigate("/main");
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
            Set how much money you spend or earn on each category monthly
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List dense>
            {activeCategories.map((cat) => {
              return (
                <ListItem key={cat.id} divider={true} disableGutters>
                  <ListItemIcon>
                    <Icon style={{ color: "black" }}>{cat.iconName}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={cat.name} />
                  <InputAdornment
                    position="end"
                    children={
                      <InputBase
                        type="number"
                        color="primary"
                        style={{
                          width: "100px",
                          backgroundColor: "#ededed",
                          marginLeft: "auto",
                          textAlign: "end",
                        }}
                        onChange={(e) => {
                          cat.budget = 0 || +e.target.value;
                        }}
                      />
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.buttonCont}>
        <Controls.Button text="Complete" onClick={handleComplete} />
      </Grid>
    </>
  );
};
export default AmountPage;
