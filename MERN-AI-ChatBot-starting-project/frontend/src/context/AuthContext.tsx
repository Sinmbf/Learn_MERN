import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Fetch if the user's cookies are valid then skip login
    const checkStatus = async () => {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    };
    checkStatus();
  }, []);
  // Function to login
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  // Function to signup
  const signup = async (name: string, email: string, password: string) => {};
  // Function to logout
  const logout = async () => {};

  // Set the values which is to be used by the children
  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };
  // Return all the states to the children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a context that can be used by the children
export const useAuth = () => useContext(AuthContext);
