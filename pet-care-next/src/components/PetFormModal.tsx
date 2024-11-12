import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import PetForm from "./PetForm";

interface PetFormModalProps {
  isEdit?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
  petId?: string;
}

export default function PetFormModal({
  isEdit,
  setIsEditing,
  petId,
}: PetFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (setIsEditing) {
      setIsEditing(false);
    }
  }, [setIsEditing]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (setIsEditing) {
      setIsEditing(true);
    }
  }, [setIsEditing]);

  return (
    <>
      {!isEdit ? (
        <Button variant="outline" onClick={handleOpen}>
          Registrar Pet
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="absolute top-2 right-10"
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Pet</DialogTitle>
              <DialogDescription>
                Coloque as informações relacionadas ao pet que vai ser
                registrado.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <PetForm
                setModalOpen={handleClose}
                isEdit={isEdit ?? false}
                petId={petId}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
