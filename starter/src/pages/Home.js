import React from "react";
import { Link } from "react-router-dom";
import { useShelf } from "./../context/ShelfContext";
import BookList from "../components/BookList";

const Home = () => {
  const { state } = useShelf();

  let Books = state;
  let shelfs = Books && [...new Set(Books.map((x, i) => x.shelf))];
  let shelfdata = (self) => {
    let data = Books.filter((val, i) => val?.shelf === self);
    return data && <BookList Books={data} />;
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs &&
            shelfs?.map((item, i) => (
              <div className="bookshelf" key={Math.random() * i}>
                <h2 className="bookshelf-title">{item}</h2>
                <div className="bookshelf-books">{shelfdata(item)}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="open-search">
        <Link to={`/add-contact`}>Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
