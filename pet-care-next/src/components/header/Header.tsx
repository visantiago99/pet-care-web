"use client";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/contexts/userContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { user, logoutUser } = useUserContext();

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
          <div className="flex gap-2">
            {!user ? (
              <>
                <Link href={"/login"}>
                  <Button>Entrar</Button>
                </Link>
                <Link href={"/register"}>
                  <Button>Cadastrar</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="text-lg font-medium text-gray-700 cursor-pointer">
                    {user.username}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/account">Minha Conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutUser}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
