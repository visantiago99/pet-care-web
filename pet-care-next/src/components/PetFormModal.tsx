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
import { useState } from "react";

function PetFormModal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Registrar Pet</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Registrar Pet</DialogTitle>
          <DialogDescription>
            Coloque as informações relacionadas ao pet que vai ser registrado.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <PetForm setModalOpen={setModalOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PetFormModal;
