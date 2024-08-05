import BookCard from "../component/bookCard";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/books`
  );
  const books = response.data;
  console.log(books);
  return { books };
}

function Home() {
  const { books } = useLoaderData();
  return (
    <>
      <main className="container mx-auto px-4">
        <section className="py-10">
          <h2 className="text-2xl font-bold mb-4">Books</h2>
          <div className="grid grid-cols-4 gap-4 ">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
