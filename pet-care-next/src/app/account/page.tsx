"use client";

import PetManager from "@/components/PetManager";
import { useUserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AccountPage = () => {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

  return (
    <div className="container mx-auto p-4">
      {user && <PetManager isMyAccount />}
      {!user && (
        <div className="flex justify-center h-screen">
          <h1 className="text-4xl content-center">
            Você precisa estar logado para acessar essa página,
            redirecionando...
          </h1>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
