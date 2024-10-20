"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PetList from "./PetList";
import PetForm from "./PetForm";

const queryClient = new QueryClient();

export default function PetManager() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pet Manager</h1>
        <PetList />
        <PetForm />
      </div>
    </QueryClientProvider>
  );
}
