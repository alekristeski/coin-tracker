import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Context } from "../context/Context";
import Controls from "./ui/Controls";
import nextId from "react-id-generator";
import AlertPage from "./AlertPage";
import { format } from "date-fns";

const useStyles = makeStyles(() => ({
  red: {
    color: "#c24242",
  },
  green: {
    color: "#3ea842",
  },
}));

const EntriesCard = ({ handleEntryModalOpen }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [contextEnt, setContextEnt] = useState({});

  const {
    entries,
    setEntries,
    activeCategories,
    deleteEntry,
    confOpen,
    setConfOpen,
  } = useContext(Context);

  const handleContextMenu = (event, ent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
    setContextEnt(ent);
  };
  const handleDelete = () => {
    deleteEntry(contextEnt);
    handleClose();
    handleClose2();
  };

  const handleDuplicate = () => {
    setEntries([
      {
        id: nextId(),
        type: contextEnt.type,
        categoryId: contextEnt.categoryId,
        amount: contextEnt.amount,
        date: contextEnt.date,
        description: contextEnt.description,
      },
      ...entries,
    ]);
    handleClose();
  };

  const openConfirm = () => {
    setConfOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const handleClose2 = () => {
    setConfOpen(false);
  };
  const classes = useStyles();

  return (
    <Controls.Card title="Entries">
      <List dense style={{ paddingBottom: 0 }}>
        {entries.length &&
        activeCategories.some((cat) => cat.isEnabled === true) ? (
          entries.map((ent) => {
            if (
              activeCategories.find(
                (cat) => cat.id === ent.categoryId && cat.isEnabled === true
              )
            ) {
              const isIncome = ent.type === "Income";

              const whichCat = activeCategories.find(
                (cat) => cat.id === ent.categoryId
              );
              return (
                <div key={nextId()}>
                  <ListItem
                    disableGutters
                    divider
                    button
                    onClick={(event) => {
                      handleEntryModalOpen(event, ent);
                    }}
                    onContextMenu={(event) => handleContextMenu(event, ent)}
                  >
                    <ListItemIcon style={{ minWidth: "40px" }}>
                      <Icon style={{ color: "black" }}>
                        {whichCat.iconName}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" style={{ lineHeight: "1" }}>
                          {whichCat.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          style={{ fontSize: "10px" }}
                        >
                          {format(new Date(ent.date), "dd.MM.yyyy")}
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={`${isIncome ? "+" : "-"}${ent.amount}`}
                      style={{ textAlign: "right" }}
                      className={isIncome ? classes.green : classes.red}
                    />
                  </ListItem>
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
          <ListItem disableGutters>
            <AlertPage severity="info" text="No entries added yet" />
          </ListItem>
        )}
        <>
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            elevation={2}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem dense onClick={handleDuplicate}>
              Duplicate
            </MenuItem>
            <MenuItem dense onClick={handleClose}>
              Create New
            </MenuItem>
            <MenuItem dense style={{ color: "#c24242" }} onClick={openConfirm}>
              Delete
            </MenuItem>
          </Menu>
          <Dialog
            open={confOpen}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography variant="body1">
                Are you sure you want to delete entry?
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  handleClose2();
                }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  handleDelete();
                  handleClose2();
                }}
                style={{ color: "#c24242" }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </List>
    </Controls.Card>
  );
};
export default EntriesCard;
