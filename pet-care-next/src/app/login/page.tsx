"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";

const LoginPage = () => {
  const { loginUser, loading, error } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      await loginUser(loginData);
      alert("Login realizado com sucesso!");
      router.push("/pets");
    } catch (err: any) {
      alert("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Carregando..." : "Entrar"}
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
