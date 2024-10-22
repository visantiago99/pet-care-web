"use client";

import PetList from "./PetList";
import PetForm from "./PetForm";

export default function PetManager() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pet Manager</h1>
      <PetList />
      <PetForm />
    </div>
  );
}
