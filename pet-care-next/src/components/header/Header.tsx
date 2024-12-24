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
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { user, logoutUser } = useUserContext();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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

        <nav className="hidden sm:flex space-x-6 font-poppins">
          <Link
            href="/pets"
            className={`link ${
              pathname === "/pets" ? "link-active" : "link-inactive"
            }`}
          >
            Pets
          </Link>
          <Link
            href="/about"
            className={`link ${
              pathname === "/about" ? "link-active" : "link-inactive"
            }`}
          >
            Sobre
          </Link>
          <Link
            href="/contact"
            className={`link ${
              pathname === "/contact" ? "link-active" : "link-inactive"
            }`}
          >
            Contato
          </Link>
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
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

        <div className="sm:hidden">
          <Menu className="cursor-pointer" onClick={toggleSidebar} />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        >
          <div
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-6 text-gray-700"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col space-y-4">
              <Link
                href="/pets"
                className={`link ${
                  pathname === "/pets" ? "link-active" : "link-inactive"
                }`}
                onClick={toggleSidebar}
              >
                Pets
              </Link>
              <Link
                href="/about"
                className={`link ${
                  pathname === "/about" ? "link-active" : "link-inactive"
                }`}
                onClick={toggleSidebar}
              >
                Sobre
              </Link>
              <Link
                href="/contact"
                className={`link ${
                  pathname === "/contact" ? "link-active" : "link-inactive"
                }`}
                onClick={toggleSidebar}
              >
                Contato
              </Link>

              <div className="mt-6">
                {!user ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      onClick={toggleSidebar}
                      className="link link-inactive mb-2"
                      href={"/login"}
                    >
                      Entrar
                    </Link>
                    <Link
                      onClick={toggleSidebar}
                      className="link link-inactive"
                      href={"/register"}
                    >
                      Cadastrar
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      className="link link-inactive mb-2"
                      href="/account"
                      onClick={toggleSidebar}
                    >
                      Minha Conta
                    </Link>
                    <button
                      className="link mt-2 text-left"
                      onClick={() => {
                        logoutUser();
                        toggleSidebar();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
