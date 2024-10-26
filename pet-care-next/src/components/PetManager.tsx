"use client";

import PetFormModal from "./PetFormModal";
import PetList from "./PetList";

export default function PetManager() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Disponíveis para adoção:</h1>
        <PetFormModal />
      </div>
      <PetList />
    </div>
  );
}
