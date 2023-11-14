import { ReactNode, createContext, useState } from "react";
import { loginUser, registerUser } from "../helpers/apiCommunicators";

type User = {
  name: string;
  email: string;
};
type UserAuth = {
  isLoggedIn: boolean;
  user: object | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // Function to login a user
  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    const data = response.data;
    if (response.status !== 200) {
      throw new Error("Unable to login");
    }
    setIsLoggedIn(true);
    setUser(data);
  };
  // Function to register a user
  const register = async (name: string, email: string, password: string) => {
    const response = await registerUser(name, email, password);
    const data = response.data;
    if (response.status !== 201) {
      throw new Error("Unable to register");
    }
    setIsLoggedIn(true);
    setUser(data);
  };
  const value = {
    isLoggedIn,
    user,
    login,
    register,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
