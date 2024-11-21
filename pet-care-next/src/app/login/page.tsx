"use client";
import { useState } from "react";
import useUser from "@/hooks/useUser"; // Importe o hook que criamos

const LoginPage = () => {
  const { loginUser, loading, error } = useUser(); // Use the login function and loading/error states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const loginData = { email, password };
    
    try {
      await loginUser(loginData); // Chama a função de login do hook
      // Aqui você pode redirecionar o usuário para outra página ou fazer algo após o login
      alert("Login realizado com sucesso!");
    } catch (err: any) {
      alert("Erro ao fazer login: " + err.message); // Exibe a mensagem de erro caso o login falhe
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
