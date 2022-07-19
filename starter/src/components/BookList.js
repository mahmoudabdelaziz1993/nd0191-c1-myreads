import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const BookList = ({ Books }) => {
  return (
    <ol className="books-grid">
      {Books?.length > 0 &&
        Books.map((book, index) => (
          <li key={index}>
            <Book bookId={book.id} />
          </li>
        ))}
    </ol>
  );
};

export default BookList;
BookList.prototype = {
  Books: PropTypes.array.isRequired,
};
