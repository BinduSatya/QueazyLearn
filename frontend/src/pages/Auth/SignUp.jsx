import { useRef, useState } from "react";
import Input from "../../components/inputs/Input";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let profileImageUrl = "";
    if (!name) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter a password");
      setLoading(false);
      return;
    }
    console.log("no errors upto data");
    setError(null);
    try {
      if (profilePic) {
        console.log("profile pic exists");
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response?.data?.message) {
        setError(error.response?.data?.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      // setImage(file);
      // preview = URL.createObjectURL(file);
      // if (setPreview) setPreview(preview);
      // setPreviewUrl(preview);
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    setLoading(false);
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
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
          {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}
          <div className="flex justify-center mb-6">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            {!profilePic ? (
              <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
                <LuUser className="text-xl text-orange-500" />
                <button
                  className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
                  onClick={onChooseFile}
                >
                  <LuUpload />
                </button>
              </div>
            ) : (
              <div className="relative ">
                <img
                  src={previewUrl}
                  alt="Profile Photo"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <button
                  className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
                  onClick={handleRemoveImage}
                >
                  <LuTrash />
                </button>
              </div>
            )}
          </div>
          <Input
            type="text"
            placeholder="Bindu Satya"
            value={name}
            onChange={({ target }) => setName(target.value)}
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
          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : "Sign Up"}
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
