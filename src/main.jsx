import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import store from "./app/store";
import { Provider } from "react-redux";
import Home, { loader as homeLoader } from "./routes/home";
import Book, { loader as bookLoader } from "./routes/book";
import Author, { loader as authorLoader } from "./routes/author";
import Signup from "./routes/signup";
import Login from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/books/:bookId",
        element: <Book />,
        loader: bookLoader,
      },
      {
        path: "/authors/:authorId",
        element: <Author />,
        loader: authorLoader,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
