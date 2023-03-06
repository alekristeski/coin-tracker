import React, { useState, useContext, useEffect } from "react";
import nextId from "react-id-generator";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Controls from "../../components/ui/Controls";
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import { format } from "date-fns";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Context } from "../../context/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));
const EntryModal = ({
  handleClose,
  fabButtonClicked,
  cats,
  inUpdateMode,
  entryClicked,
}) => {
  const [catType, setCatType] = useState(
    inUpdateMode ? entryClicked.type : fabButtonClicked
  );
  const [whatCat, setWhatCat] = useState(
    cats.filter((cat) => cat.type === catType)
  );
  const [catName, setCatName] = useState(
    inUpdateMode
      ? cats.find((cat) => cat.id === entryClicked.categoryId).name
      : ""
  );
  const [amount, setAmount] = useState(inUpdateMode ? entryClicked.amount : "");
  const [date, setDate] = useState(
    inUpdateMode ? new Date(entryClicked.date) : new Date()
  );
  const [desc, setDesc] = useState(
    inUpdateMode ? entryClicked.description : ""
  );
  const [catInputValid, setCatInputValid] = useState(true);
  const [amountInputValid, setAmountInputValid] = useState(true);
  const [btnType, setBtnType] = useState("button");

  const validateInputs = () => {
    if (!catName || !amount || amount < 1) {
      if (!catName) {
        setCatInputValid(false);
      }
      if (!amount || amount < 1) {
        setAmountInputValid(false);
      }
      return false;
    }
    return true;
  };

  const { setNewEntry, setUpdatedEntry } = useContext(Context);

  const catId = (_name) => {
    return cats.find((cat) => cat.name === _name).id;
  };

  useEffect(() => {
    if (!inUpdateMode) {
      setWhatCat(cats.filter((cat) => cat.type === catType));
      setCatName("");
    }
  }, [catType, cats, inUpdateMode]);

  const handleNewEntry = () => {
    if (validateInputs()) {
      setBtnType("submit");
      if (!inUpdateMode) {
        setNewEntry({
          id: nextId(),
          type: catType,
          categoryId: catId(catName),
          amount,
          date: format(date, "MMM dd yyyy"),
          description: desc,
        });
      } else {
        setUpdatedEntry({
          id: entryClicked.id,
          type: catType,
          categoryId: catId(catName),
          amount,
          date: format(date, "MMM dd yyyy"),
          description: desc,
        });
      }
      handleClose();
    }
  };

  const classes = useStyles();
  return (
    <>
      <DialogTitle>
        {inUpdateMode ? "Update entry" : "Add new entry"}
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
            onChange={(e) => setCatType(e.target.value)}
            value={catType}
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
          <Autocomplete
            className={classes.root}
            disablePortal
            id="combo-box-demo"
            size="small"
            options={whatCat}
            getOptionLabel={(option) => option.name}
            inputValue={catName}
            onChange={(_, value) => setCatName(value.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                error={!catInputValid}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controls.Input
            label="Amount"
            value={amount}
            onChange={(e) => {
              setAmount(+e.target.value);
            }}
            variant="outlined"
            type="number"
            size="small"
            error={!amountInputValid}
          />
        </FormControl>
        <FormControl fullWidth>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              size="small"
              inputVariant="outlined"
              format="dd.MM.yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={date}
              onChange={(date) => setDate(date)}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl fullWidth>
          <Controls.Input
            size="small"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            label="Description (optional)"
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
          type={btnType}
          onClick={handleNewEntry}
          color="primary"
        />
      </DialogActions>
    </>
  );
};
export default EntryModal;
