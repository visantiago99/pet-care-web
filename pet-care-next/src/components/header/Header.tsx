"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-8 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <a href="/">Meu Site</a>
        </div>

        <nav className="space-x-6">
          <a href="/pets" className="text-gray-700 hover:text-gray-900">
            Pets
          </a>
          <a href="/about" className="text-gray-700 hover:text-gray-900">
            Sobre
          </a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://via.placeholder.com/150" alt="Avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsLoggedIn(true)}>Entrar</Button>
              <Button onClick={() => setIsLoggedIn(true)}>Cadastrar</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
