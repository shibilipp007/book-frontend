import React from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  const book = props.book;
  return (
    <>
      <article className="pb-4 shadow-md">
        <Link to={`/books/${book._id}`}>
          <img
            className="object-cover w-full aspect-[3/4]"
            src={book.thumbnail}
            alt=""
          />
        </Link>

        <div className="px-2 pt-2">
          <h3 className="text-xl mb-2 ">{book.title}</h3>
          <span>{book.language}</span>
        </div>
      </article>
    </>
  );
}

export default BookCard;
