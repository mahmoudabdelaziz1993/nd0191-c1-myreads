import React from "react";
import PropTypes from "prop-types";
import BookList from "./BookList";
import { useShelf } from "../context/ShelfContext";

function BookShelf({ title }) {
  const { state } = useShelf();

  let Books = state;
  let shelfdata = (title) => {
    let data = Books.filter((val, i) => val?.shelf === title);
    return data && <BookList Books={data} />;
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">{shelfdata(title)}</div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BookShelf;
