import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import BookCard from "../component/bookCard";

export async function loader({ params }) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/authors/${params.authorId}`
  );
  const { author, books } = response.data;
  console.log(author);
  return { author, books };
}

function Author() {
  const { author, books } = useLoaderData();

  return (
    <main className="container mx-auto px-4">
      <section className="py-10 grid grid-cols-2">
        <div className="justify-center flex">
          <img src={author.thumbnail} alt="" />
        </div>

        <div>
          <h1 className="text-2xl font-bold py-8">{author.name}</h1>
          <div>
            <span className=" font-bold ">Nationality:</span>
            <span>{author.nationality}</span>
          </div>
          <div>
            <span className=" font-bold ">About</span>
            <span>{author.description}</span>
          </div>
        </div>
        <div className="mt-6 px-1">
          <h1 className="text-2xl font-bold mb-4">Books</h1>
          {books?.length > 0 ? (
            <div className="grid grid-cols-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            "book not available"
          )}
        </div>
      </section>
    </main>
  );
}

export default Author;
