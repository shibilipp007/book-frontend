import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { changeLoginStatus } from "../features/login/loginSlice";
import api from "../lib/api";

function Root() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await api.get("/auth/verify");
        dispatch(
          changeLoginStatus({
            loggedIn: true,
            user: res.data,
          })
        );
      } catch (err) {
        dispatch(
          changeLoginStatus({
            loggedIn: false,
            user: null,
          })
        );
      }
    }

    verifyAuth();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await api.delete("/auth/logout");
      dispatch(
        changeLoginStatus({
          loggedIn: false,
          user: null,
        })
      );
    } catch (error) {
      console.log("Error logout: ", error);
    }
  };

  return (
    <>
      <header className="shadow-lg h-20">
        <div className="container flex flex-row justify-between items-center h-full mx-auto px-4 py-10">
          <h1>BookCart</h1>
          <nav>
            <ul className="flex flex-row gap-6 items-center">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/movies"}>Books</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
              {loggedIn && user ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              )}
            </ul>
          </nav>
          {loggedIn && user ? (
            <div className="bg-gray-300 h-10 w-10 flex flex-row justify-center items-center rounded-full">
              <span>{user.name.charAt(0)}</span>
            </div>
          ) : null}
        </div>
      </header>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default Root;
