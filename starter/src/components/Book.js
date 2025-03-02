import React, { useEffect, useState } from "react";
import { useShelf } from "../context/ShelfContext";
import { get } from "../utils/BooksAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Book = ({ bookId }) => {
  const [Data, setData] = useState(null);
  const { stateShelfUpdate, state } = useShelf();
  let Books = state;
  let shelfs = Books && [...new Set(Books.map((x, i) => x.shelf))];
  useEffect(() => {
    const fetchBook = async (bookId) => {
      let data = await get(bookId);
      setData(data);
    };
    fetchBook(bookId);
    return () => {
      setData(null);
    };
  }, [bookId]);

  // Detrmine which shelf
  // const updateShelf = async (book, shelf) => {
  //   let data = await update(book, shelf);
  //   stateShelfUpdate(data);
  // };

  return (
    Data && (
      <div className="book">
        <div className="book-top">
          <Link to={`/Book/${Data.id}`}>
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url('https://picsum.photos/200/300?random=${Data.id}')`,
              }}
            ></div>
          </Link>
          <div className="book-shelf-changer">
            <select
              value={Data.shelf}
              onChange={(e) => {
                stateShelfUpdate(Data, e.target.value);
              }}
            >
              <option value={"none"}>None</option>
              {shelfs &&
                shelfs?.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              {/* <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option> */}
            </select>
          </div>
        </div>
        <Link to={`/Book/${Data.id}`}>
          <div className="book-title">{Data.title}</div>
          <div className="book-authors">
            {Data.authors?.toString().split("")}
          </div>
        </Link>
      </div>
    )
  );
};

export default Book;
Book.prototype = {
  bookId: PropTypes.string.isRequired,
  setRevaildate: PropTypes.func,
};
