"use client";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/contexts/userContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { user, logoutUser } = useUserContext();
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md py-4 px-8 sticky top-0 z-50 rounded-b-xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center font-poppins">
            <img
              src="/icons/pawIcon.svg"
              alt="Paw Icon"
              className="h-6 w-6 mr-2"
            />
            Adopt Me
          </a>
        </div>

        <nav className="space-x-6 font-poppins">
          <a
            href="/pets"
            className={`link ${
              pathname === "/pets" ? "link-active" : "link-inactive"
            }`}
          >
            Pets
          </a>
          <a
            href="/about"
            className={`link ${
              pathname === "/about" ? "link-active" : "link-inactive"
            }`}
          >
            Sobre
          </a>
          <a
            href="/contact"
            className={`link ${
              pathname === "/contact" ? "link-active" : "link-inactive"
            }`}
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex gap-2">
            {!user ? (
              <>
                <Link href={"/login"}>
                  <Button className="hover:bg-orange-400">Entrar</Button>
                </Link>
                <Link href={"/register"}>
                  <Button className="hover:bg-orange-400">Cadastrar</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="text-lg font-medium text-gray-700 cursor-pointer">
                    {/* Conteúdo do Dropdown */}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={logoutUser}>
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
