import { createContext, useContext, useEffect, useState } from "react";
import { getAll, update } from "../utils/BooksAPI";

//Create Context
export const ShelfContext = createContext(null);
// DIY Provider
export const ShelfProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const api = {
    stateShelfUpdate: async (book, shelf) => {
      let res = await update(book, shelf);
      if (res) {
        let data = await getAll();
        setState(data);
      }
    },
  };

  useEffect(() => {
    const fetchBooks = async () => {
      let data = await getAll();
      setState(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    localStorage.setItem("myReadsStorage", JSON.stringify(state));
  }, [state]);

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
