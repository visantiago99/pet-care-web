"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UserLoginData {
  email: string;
  password: string;
}

interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

interface UserResponse {
  username: string;
  email: string;
  token: string;
}

interface StoredUserData {
  username: string;
  email: string;
}

interface UserContextProps {
  user: StoredUserData | null;
  loading: boolean;
  error: string | null;
  registerUser: (userData: UserRegisterData) => Promise<UserResponse>;
  loginUser: (loginData: UserLoginData) => Promise<UserResponse>;
  logoutUser: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<StoredUserData | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const isExpired = parsedUser.expiry <= Date.now();
      return isExpired ? null : parsedUser.data;
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveUser = (data: UserResponse) => {
    const jwtPayload = JSON.parse(atob(data.token.split(".")[1])) as {
      exp: number;
    };
    const expiry = jwtPayload.exp * 1000;
    const userData = {
      data: {
        username: data.username,
        email: data.email,
      },
      expiry,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData.data);
  };

  const registerUser = async (userData: UserRegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error(`Failed to register user: ${res.statusText}`);
      }

      const data: UserResponse = await res.json();
      saveUser(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (loginData: UserLoginData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        throw new Error(`Failed to login: ${res.statusText}`);
      }

      const data: UserResponse = await res.json();
      saveUser(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const { expiry } = JSON.parse(savedUser);
        if (expiry <= Date.now()) {
          logoutUser();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
