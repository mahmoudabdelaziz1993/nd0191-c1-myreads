import React from "react";
import { Link } from "react-router-dom";
import { useShelf } from "./../context/ShelfContext";
import BookShelf from "../components/BookShelf";

const Home = () => {
  const { state } = useShelf();

  let Books = state;
  let shelfs = Books && [...new Set(Books.map((x, i) => x.shelf))];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs &&
            shelfs?.map((item, i) => <BookShelf title={item} key={item} />)}
        </div>
      </div>
      <div className="open-search">
        <Link to={`/search`}>Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
