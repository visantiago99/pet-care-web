"use client";

import PetList from "./PetList";
import PetForm from "./PetForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PetFormModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Registrar Pet</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Registrar Pet</DialogTitle>
          <DialogDescription>
            Coloque as informações relacionadas ao pet que vai ser registrado.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <PetForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
