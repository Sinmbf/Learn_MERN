import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center">
      <form className="grid grid-cols-1 border-2 border-indigo-900 p-8 rounded-md h-full">
        <div className="text-center text-3xl mb-4 text-indigo-800">
          <h2>Login to your account</h2>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-indigo-800" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            placeholder="Eg: sinmbf@gmail.com"
            className="border-2 border-indigo-600 rounded-md p-2 sm:w-96 w-72 focus:outline-none focus:border-blue-500"
            required
          />
          {/* Email Error Display */}
          <div className="text-sm text-red-700">
            Incorrect email or password
          </div>
        </div>
        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-indigo-800" htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="password"
            className="inline border-2 border-indigo-600 rounded-md p-2 sm:w-96 w-72 focus:outline-none focus:border-blue-500"
            required
            minLength={5}
          />

          <span
            className="absolute translate-y-[40%] right-5 cursor-pointer"
            onClick={() => {
              setShowPassword((currentState) => (currentState ? false : true));
            }}
          >
            <i
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
            />
          </span>
          {/* Password Error Display */}
          <div className="text-sm text-red-700">
            Incorrect email or password
          </div>
        </div>
        {/* Login button */}
        <button className="p-4 rounded-md bg-indigo-500 text-white hover:bg-indigo-900 hover:text-gray-400 active:bg-white active:text-black">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
