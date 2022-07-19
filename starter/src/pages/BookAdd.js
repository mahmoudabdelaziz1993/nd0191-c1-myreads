import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import SearchInput from "../components/SearchInput";
import { search } from "../utils/BooksAPI";

const BookAdd = () => {
  const [Query, setQuery] = useState("");
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    const fetBooksQuery = async (query) => {
      console.log("query", query);
      let data = await search(query, 10);
      setBooks(data);
    };

    if (Query.length > 0) {
      fetBooksQuery(Query);
    } else {
      setBooks([]);
    }
  }, [Query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={`/`}>
          <span className="close-search">Close</span>
        </Link>
        <SearchInput Query={Query} setQuery={setQuery} />
      </div>
      <div className="search-books-results">
        {Query.length > 0 && Books && <BookList Books={Books} />}
      </div>
    </div>
  );
};

export default BookAdd;
