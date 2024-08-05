import { useForm } from "react-hook-form";
import Input from "../component/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "../features/login/loginSlice";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatche = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        data
      );
      dispatche(changeLoginStatus(true));
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
      noValidate
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
      <Input
        label={"Name"}
        id={"name"}
        type="text"
        {...register("name", { required: true })}
      />
      <Input
        label={"Email"}
        id={"email"}
        type="email"
        {...register("email", {
          required: true,
          pattern: { value: EMAIL_REGEX, message: "Invalid Format" },
        })}
        error={errors.email?.message}
      />
      <Input
        label={"Password"}
        id={"password"}
        type="password"
        {...register("password", {
          required: true,
          minLength: { value: 6, message: "Password must have 6 character" },
        })}
        error={errors.password?.message}
      />
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        type="submit"
      >
        Signup
      </button>
      <div className="mt-1 text-center">
        <Link className="text-blue-600 hover:underline" to={`/login`}>
          Already have an acoount?
        </Link>
      </div>
    </form>
  );
}

export default Signup;
