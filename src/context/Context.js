import { createContext, useState } from "react";
import Categories from "../assets/categories";

export const Context = createContext();

const localEntries = JSON.parse(localStorage.getItem("entries"));
const localCats = JSON.parse(localStorage.getItem("categories"));
const localSigned = JSON.parse(localStorage.getItem("signedIn"));
const localAvatar = localStorage.getItem("avatar");

export const Provider = ({ children }) => {
  const [categories, setCategories] = useState(Categories);
  const [activeCategories, setActiveCategories] = useState(localCats || []);
  const [entries, setEntries] = useState(localEntries || []);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(!!localSigned);
  const [userAvatar, setUserAvatar] = useState(localAvatar || "");
  const [fabModalOpen, setFabModalOpen] = useState(false);
  const [entryModalOpen, setEntryModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({});
  const [updatedEntry, setUpdatedEntry] = useState({});
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({});
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [confOpen, setConfOpen] = useState(false);

  const addNewEntry = (newEntry) => {
    setEntries([newEntry, ...entries]);

    localStorage.setItem("entries", JSON.stringify([newEntry, ...entries]));
  };

  const updateEntry = (entry) => {
    const updatedEntries = entries.map((ent) => {
      if (ent.id === entry.id) {
        return entry;
      } else {
        return ent;
      }
    });
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };
  const deleteEntry = (entry) => {
    const filterEntries = entries.filter((ent) => ent.id !== entry.id);
    setEntries(filterEntries);
    localStorage.setItem("entries", JSON.stringify(filterEntries));
  };

  const addNewCategory = (newCategory) => {
    setActiveCategories([newCategory, ...activeCategories]);
    localStorage.setItem(
      "categories",
      JSON.stringify([newCategory, ...activeCategories])
    );
  };

  const updateCategory = (category) => {
    const updatedCats = activeCategories.map((cat) => {
      if (cat.id === category.id) {
        return category;
      } else {
        return cat;
      }
    });
    setActiveCategories(updatedCats);
    localStorage.setItem("categories", JSON.stringify(updatedCats));
  };

  const ContextObj = {
    categories,
    setCategories,
    activeCategories,
    setActiveCategories,
    entries,
    setEntries,
    budgetTotal,
    setBudgetTotal,
    isSignedIn,
    setIsSignedIn,
    userAvatar,
    setUserAvatar,
    fabModalOpen,
    setFabModalOpen,
    entryModalOpen,
    setEntryModalOpen,
    newEntry,
    setNewEntry,
    updatedEntry,
    setUpdatedEntry,
    addNewEntry,
    updateEntry,
    deleteEntry,
    categoryModalOpen,
    setCategoryModalOpen,
    newCategory,
    setNewCategory,
    addNewCategory,
    updateCategory,
    updatedCategory,
    setUpdatedCategory,
    confOpen,
    setConfOpen,
  };

  return <Context.Provider value={ContextObj}>{children}</Context.Provider>;
};
