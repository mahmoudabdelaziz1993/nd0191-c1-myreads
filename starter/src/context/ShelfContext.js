import { createContext, useContext, useEffect, useState } from "react";
import { getAll } from "../utils/BooksAPI";

//Create Context
export const ShelfContext = createContext(null);
// DIY Provider
export const ShelfProvider = ({ children }) => {
  const IntState = JSON.parse(localStorage.getItem("myReadsStorage")) || [];
  const [state, setState] = useState(IntState);
  const [Vtoken, setVtoken] = useState(null);
  const api = {
    stateShelfUpdate: async () => {
      setVtoken(Math.floor(Math.random() * 99999));
    },
  };

  useEffect(() => {
    let fetchBooks = async () => {
      let data = await getAll();
      setState(data);
    };
    fetchBooks();
    localStorage.setItem("myReadsStorage", JSON.stringify(state));
  }, [Vtoken]);

  return (
    <ShelfContext.Provider value={{ state, ...api }}>
      {children}
    </ShelfContext.Provider>
  );
};

// custom hook
export const useShelf = () => {
  const ctx = useContext(ShelfContext);
  if (!ctx) {
    throw new Error("Something went wrong !");
  }
  return { ...ctx };
};
