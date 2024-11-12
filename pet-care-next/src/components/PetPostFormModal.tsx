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
import PetPostForm from "./PetPostForm";

function PetPostFormModal({ petId }: { petId: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Registrar Post</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Registrar Post</DialogTitle>
          <DialogDescription>
            Coloque as informações relacionadas ao post que vai ser registrado.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <PetPostForm petId={petId} setModalOpen={setModalOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PetPostFormModal;
