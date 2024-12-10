import { useState } from "react";

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
  message: string;
  token: string;
}

const useUser = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const data = await res.json();
      setUser(data);
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
      setUser(data);

      return data;
    } catch (err: any) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    registerUser,
    loginUser,
  };
};

export default useUser;
