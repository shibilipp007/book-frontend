import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader({ params }) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/books/${params.bookId}`
  );
  const book = response.data;
  console.log(book);
  return { book };
}

function Book(props) {
  const { book } = useLoaderData();
  return (
    <>
      <main className="container mx-auto px-4">
        <section className="py-10 grid grid-cols-2 gap-6 items-center">
          <div className="justify-center flex ">
            <img
              className="w-[300px] object-contain aspect-[3/4] "
              src={book.thumbnail}
              alt=""
            />
          </div>
          <div>
            <h2 className="text-xl font-bold ">{book.title}</h2>

            <p>{book.description}</p>
          </div>
          <div></div>
          <div className="flex flex-col  ">
            <div>
              <span className="min-w-20 mr-1 inline-block">Author: </span>
              <span className="min-w-20 mr-1 inline-block">
                <Link
                  className="text-blue-600 hover:underline"
                  to={`/authors/${book.author._id}`}
                >
                  {book.author.name}
                </Link>
              </span>
            </div>
            <div>
              <span className="min-w-20 mr-1 inline-block"> Language: </span>
              <span className="min-w-20 mr-1 inline-block">
                {book.language}
              </span>
            </div>

            <div>
              <span className="min-w-20 mr-1 inline-block"> Publisher: </span>
              <span className="min-w-20 mr-1 inline-block">
                {book.publisher}
              </span>
            </div>
            <div>
              <span className="min-w-20 mr-1 inline-block"> Published: </span>
              <span className="min-w-20 mr-1 inline-block">
                {new Date(book.publishedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Book;
