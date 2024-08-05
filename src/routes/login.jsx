import axios from "axios";
import Input from "../component/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "../features/login/loginSlice";
import api from "../lib/api";

export default function Login() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatche = useDispatch();
  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      dispatche(changeLoginStatus({ loggedIn: true, user: response.data }));
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatche(changeLoginStatus(false));
    }
  };

  return (
    <form
      className="w-[400px] mx-auto mt-10 p-6 border border-gray-400"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <Input
        label={"Email"}
        id={"email"}
        type="email"
        {...register("email", { required: true })}
      />
      <Input
        label={"Password"}
        id={"password"}
        type="password"
        {...register("password", { required: true })}
      />

      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        type="submit"
      >
        Login
      </button>
      <div className="mt-1 text-center">
        <Link className="text-blue-600 hover:underline" to={`/signup`}>
          Create an account
        </Link>
      </div>
    </form>
  );
}
