import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response?.data?.message) {
        setError(error.response?.data?.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h1 className="text-lg font-semibold text-black">Login to QueazyLearn</h1>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your details
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="bsa@abc.com"
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          Login
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <span
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
