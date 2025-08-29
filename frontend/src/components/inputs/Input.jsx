import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="w-full bg-transparent outline-none"
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                className="text-primary cursor-pointer"
                size={22}
                onClick={() => togglePasswordVisibility()}
              />
            ) : (
              <FaRegEyeSlash
                className="text-slate-400 cursor-pointer"
                size={22}
                onClick={() => togglePasswordVisibility()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
