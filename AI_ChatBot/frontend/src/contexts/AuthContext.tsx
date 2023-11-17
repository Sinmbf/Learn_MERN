import { ReactNode, createContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
} from "../helpers/apiCommunicators";

type User = {
  name: string;
  email: string;
};
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // Check the auth status of a user
  useEffect(() => {
    const checkStatus = async () => {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    };
    checkStatus();
  }, []);
  // Function to login a user
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  // Function to register a user
  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  // Function to logout a user
  const logout = async () => {
    const data = await logoutUser();
    if (data) {
      setUser(null);
      setIsLoggedIn(false);
      window.location.reload();
    }
  };

  const value = {
    isLoggedIn,
    user,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
