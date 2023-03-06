import React, { useReducer, useContext } from "react";
import nextId from "react-id-generator";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Controls from "../../components/ui/Controls";
import Icons from "../../assets/icons";
import {
  Checkbox,
  FormControl,
  Icon,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Context } from "../../context/Context";

const initialState = {
  catType: "Income",
  catName: "",
  icon: Icons[0],
  budget: "",
  enabled: true,
  isNameValid: true,
  btnType: "button",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CAT_TYPE":
      return { ...state, catType: action.payload };
    case "SET_CAT_NAME":
      return { ...state, catName: action.payload };
    case "SET_ICON":
      return { ...state, icon: action.payload };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    case "SET_ENABLED":
      return { ...state, enabled: action.payload };
    case "SET_IS_NAME_VALID":
      return { ...state, isNameValid: action.payload };
    case "SET_BTN_TYPE":
      return { ...state, btnType: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const CategoryModal = ({ handleClose, inUpdateMode, categoryClicked }) => {
  const [state, dispatch] = useReducer(
    reducer,
    inUpdateMode
      ? {
          ...initialState,
          catType: categoryClicked.type,
          catName: categoryClicked.name,
          icon: categoryClicked.iconName,
          budget: categoryClicked.budget,
          enabled: categoryClicked.isEnabled,
        }
      : initialState
  );

  const { setNewCategory, setUpdatedCategory } = useContext(Context);

  const validateInput = () => {
    if (!state.catName.length) {
      dispatch({ type: "SET_IS_NAME_VALID", payload: false });
      return false;
    } else {
      dispatch({ type: "SET_IS_NAME_VALID", payload: true });
      return true;
    }
  };

  const handleNewEntry = () => {
    if (validateInput()) {
      dispatch({ type: "SET_BTN_TYPE", payload: "submit" });
      if (!inUpdateMode) {
        setNewCategory({
          id: nextId(),
          name: state.catName,
          type: state.catType,
          budget: state.budget,
          iconName: state.icon,
          isEnabled: state.enabled,
        });
      } else {
        setUpdatedCategory({
          id: categoryClicked.id,
          name: state.catName,
          type: state.catType,
          budget: state.budget,
          iconName: state.icon,
          isEnabled: state.enabled,
        });
      }
      handleClose();
    }
  };

  return (
    <>
      <DialogTitle>
        {inUpdateMode ? "Update category" : "Add new category"}
      </DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          size="small"
          style={{ marginTop: "8px", marginBottom: "8px" }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) =>
              dispatch({ type: "SET_CAT_TYPE", payload: e.target.value })
            }
            value={state.catType}
            variant="outlined"
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{ marginTop: "8px", marginBottom: "8px" }}
        >
          <Controls.Input
            label="Name"
            onChange={(e) =>
              dispatch({ type: "SET_CAT_NAME", payload: e.target.value })
            }
            value={state.catName}
            onBlur={() => validateInput()}
            variant="outlined"
            size="small"
            error={!state.isNameValid}
            helperText={!state.isNameValid && "This is a required field"}
          />
        </FormControl>
        <FormControl
          fullWidth
          size="small"
          style={{ marginTop: "8px", marginBottom: "8px" }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.icon || "Icon"}
            onChange={(e) =>
              dispatch({ type: "SET_ICON", payload: e.target.value })
            }
            variant="outlined"
          >
            {Icons.map((icon) => {
              return (
                <MenuItem key={nextId()} value={icon}>
                  <Icon>{icon}</Icon>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Controls.Input
            label="Budget"
            value={state.budget}
            onChange={(e) => {
              dispatch({ type: "SET_BUDGET", payload: e.target.value });
            }}
            variant="outlined"
            type="number"
            size="small"
          />
        </FormControl>
        <FormControl fullWidth>
          <Controls.Input
            label="Enabled"
            disabled
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Checkbox
                    color="primary"
                    onChange={() =>
                      dispatch({ type: "SET_ENABLED", payload: !state.enabled })
                    }
                    checked={state.enabled}
                  />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Controls.Button
          size="small"
          variant="text"
          text="cancel"
          onClick={handleClose}
          color="primary"
        />

        <Controls.Button
          size="small"
          text={inUpdateMode ? "update" : "add"}
          type={state.btnType}
          onClick={handleNewEntry}
          color="primary"
        />
      </DialogActions>
    </>
  );
};
export default CategoryModal;
