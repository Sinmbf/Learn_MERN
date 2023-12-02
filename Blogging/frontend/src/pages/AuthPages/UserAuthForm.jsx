import { PropTypes } from "prop-types";
import InputBox from "../../components/InputBox";
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const UserAuthForm = ({ type }) => {
  return (
    <section className="min-h-[calc(100vh-80px)] grid place-items-center">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio text-center capitalize mb-20">
          {type === "sign-in" ? "welcome back" : "join us today"}
        </h1>
        {type === "register" && (
          <>
            {/* Full Name */}
            <InputBox
              name="fullName"
              type="text"
              placeholder="Enter full name"
              id="fullName"
              value=""
              icon={<FaRegUser className="inputIcon" />}
            />
            {/* Email */}
            <InputBox
              name="email"
              type="email"
              placeholder="Enter email name"
              id="email"
              value=""
              icon={<MdEmail className="inputIcon" />}
            />
            {/* Password */}
            <InputBox
              name="password"
              type="password"
              placeholder="Enter password"
              id="password"
              value=""
              icon={<RiLockPasswordLine className="inputIcon" />}
            />
          </>
        )}
      </form>
    </section>
  );
};
export default UserAuthForm;

UserAuthForm.propTypes = {
  type: PropTypes.string,
};
