"use client";

import {
  StoredUserData,
  UserLoginData,
  UserRegisterData,
  UserResponse,
} from "@/types/userContextTypes";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UserContextProps {
  user: StoredUserData | null;
  registerUser: (userData: UserRegisterData) => Promise<UserResponse>;
  loginUser: (loginData: UserLoginData) => Promise<UserResponse>;
  logoutUser: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<StoredUserData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const isExpired = parsedUser.expiry <= Date.now();
      if (!isExpired) {
        setUser(parsedUser.data);
      }
    }
  }, []);

  const saveUser = (data: UserResponse) => {
    const jwtPayload = JSON.parse(atob(data.token.split(".")[1])) as {
      exp: number;
    };
    const expiry = jwtPayload.exp * 1000;
    const userData = {
      data: {
        username: data.username,
        email: data.email,
        userId: data.userId,
      },
      expiry,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData.data);
  };

  const registerUser = async (userData: UserRegisterData) => {
    const res = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erro ao registrar usuário:", errorData);
      throw new Error(errorData.message || "Erro desconhecido ao registrar.");
    }

    const data: UserResponse = await res.json();
    return data;
  };

  const loginUser = async (loginData: UserLoginData) => {
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
  };

  const logoutUser = async () => {
    const res = await fetch("http://localhost:3001/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Erro ao realizar logout no servidor.");
    }

    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
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
