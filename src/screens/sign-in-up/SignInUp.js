import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LogoHeader from "../../components/layout/LogoHeader";
import Controls from "../../components/ui/Controls";
import { Link, navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  heading: {
    letterSpacing: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function SignInUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [visible, setVisible] = useState(false);

  const { isSignedIn, setIsSignedIn, setUserAvatar } = useContext(Context);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/main");
    }
  }, []);

  const onPage = props.whichPage;

  const classes = useStyles();

  const validateUsername = (user) => {
    const mailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (user.length === 0) {
      setUsernameErrMsg("This is a required field");
    } else if (!mailReg.test(user)) {
      setUsernameErrMsg("Please enter a valid email address.");
    } else {
      setUsernameErrMsg("");
    }

    if (mailReg.test(user)) {
      return true;
    }
    return false;
  };

  const validatePassword = (pass) => {
    const lengthReg = /^.{8,32}$/;
    const charReg = /[!@#$%^&*]/;

    if (pass.length === 0) {
      setPasswordErrMsg("This is a required field");
    } else if (!lengthReg.test(pass)) {
      setPasswordErrMsg(
        "The password's length must be between 8 and 32 characters."
      );
    } else if (!charReg.test(pass)) {
      setPasswordErrMsg("The password must contain a special character.");
    } else {
      setPasswordErrMsg("");
    }

    if (lengthReg.test(pass) && charReg.test(pass)) {
      return true;
    }
    return false;
  };

  const usernameValidationHelper = () => {
    if (username.length === 0) {
      validateUsername(username);
      setUsernameIsValid(false);
    }
    if (username.length > 0) {
      validateUsername(username)
        ? setUsernameIsValid(true)
        : setUsernameIsValid(false);
    }
  };
  const passwordValidationHelper = () => {
    if (password.length === 0) {
      validatePassword(password);
      setPasswordIsValid(false);
    }
    if (password.length > 0) {
      validatePassword(password)
        ? setPasswordIsValid(true)
        : setPasswordIsValid(false);
    }
  };

  const handleSignInUpSubmit = (e) => {
    e.preventDefault();
    usernameValidationHelper();
    passwordValidationHelper();
    if (validateUsername(username) && validatePassword(password)) {
      fetch("https://randomuser.me/api/")
        .then((res) => res.json())
        .then((data) => {
          setUserAvatar(data.results[0].picture.thumbnail);
          localStorage.setItem("avatar", data.results[0].picture.thumbnail);
          if (onPage === "signIn") {
            setIsSignedIn(true);
            localStorage.setItem("signedIn", "true");
            navigate("/main");
          } else if (onPage === "signUp") {
            navigate("/welcome");
          }
        });
    }
  };

  return (
    <form onSubmit={handleSignInUpSubmit}>
      <Grid
        container
        alignItems="center"
        style={{
          height: "100vh",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Grid container justifyContent="center">
          <LogoHeader />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Typography
              className={classes.heading}
              variant="h5"
              component="h2"
              align="center"
              type="submit"
            >
              {onPage === "signIn" ? "SIGN IN" : "SIGN UP"}
            </Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={10}>
            <Controls.Input
              size="small"
              label="Username"
              value={username}
              error={!usernameIsValid}
              helperText={!usernameIsValid && usernameErrMsg}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => {
                username.length > 0 && usernameValidationHelper();
                username.length === 0 && setUsernameIsValid(true);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Controls.Input
              size="small"
              label="Password"
              type={visible ? "text" : "password"}
              value={password}
              error={!passwordIsValid}
              helperText={!passwordIsValid && passwordErrMsg}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                password.length > 0 && passwordValidationHelper();
                password.length === 0 && setPasswordIsValid(true);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setVisible(!visible)}>
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Controls.Button
              className={classes.button}
              text={onPage === "signIn" ? "SIGN IN" : "SIGN UP"}
              type="submit"
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={3} />

          <Grid item xs={6}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color="textSecondary"
              align="center"
            >
              {onPage === "signIn"
                ? "Don't have account yet?"
                : "Already have account?"}
            </Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />

          <Grid item xs={5}>
            <Link to={onPage === "signIn" ? "/signup" : "/"}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                color="primary"
                align="center"
              >
                {onPage === "signIn"
                  ? "Sign up now! It's free!"
                  : "Sign in please!"}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Grid>
    </form>
  );
}
