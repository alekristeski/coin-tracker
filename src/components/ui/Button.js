import React from "react";
import { Button as MuiButton } from "@material-ui/core";

const Button = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <MuiButton
      style={{ width: "100%" }}
      onClick={onClick}
      color={color || "primary"}
      variant={variant || "contained"}
      size={size || "medium"}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
