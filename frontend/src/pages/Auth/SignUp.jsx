import { useState } from "react";
import Input from "../../components/inputs/Input";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let profileImgURL = "";

    if (!fullname) {
      setError("Please enter your full name");
      return;
    }
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
      // Simulate signup API call
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
      <h1 className="text-lg font-semibold text-black">
        Create an Account for QueazyLearn
      </h1>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your details
      </p>

      <form action="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <Input
            type="text"
            placeholder="Bindu Satya"
            value={fullname}
            onChange={({ target }) => setFullname(target.value)}
            label="Full Name"
          />
          <Input
            type="email"
            placeholder="bsa@abc.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
          />
          <Input
            type="password"
            placeholder="Min 8 Characters"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <span
              className="font-medium text-primary cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
