import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //Function to handle click toggle password
  const handleClickTogglePassword = () => {
    setIsPasswordVisible((currentVal) => !currentVal);
  };
  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type === "password" && isPasswordVisible ? "text" : type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="p-3 w-full bg-gray-200 outline-1 outline-indigo-600 mb-5 pl-[11%]"
        required
      />
      {icon}
      {type === "password" &&
        (isPasswordVisible ? (
          <FaEye className="passwordIcon" onClick={handleClickTogglePassword} />
        ) : (
          <FaEyeSlash
            className="passwordIcon"
            onClick={handleClickTogglePassword}
          />
        ))}
    </div>
  );
};
export default InputBox;

InputBox.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.object,
};
