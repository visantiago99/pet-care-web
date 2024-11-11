import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PetData } from "@/schemas/pet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePet } from "@/hooks/usePets";
import { Button } from "@/components/ui/button";
import { X, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "../types/types";

interface PetCardProps {
  pet: PetData;
}

export default function PetCard({ pet }: PetCardProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: () => deletePet(pet.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir ${pet.name}?`)) {
      deleteMutation.mutate();
    }
  };

  const handleEdit = (event: MouseEvent) => {
    event.stopPropagation();
    // edit pet
  };

  const handleCardClick = () => {
    router.push(`/pets/${pet.id}`);
  };

  return (
    <Card
      className="relative hover:cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle>{pet.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={(event) => handleEdit(event)}
          className="absolute top-2 right-10"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(event) => handleDelete(event)}
          className="absolute top-2 right-2"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Espécie:</strong> {pet.species}
        </p>
        <p>
          <strong>Raça:</strong> {pet.breed}
        </p>
        <p>
          <strong>Idade:</strong> {pet.age}
        </p>
        <p>
          <strong>Cidade:</strong> {pet.city}
        </p>
        <p>
          <strong>Estado:</strong> {pet.state}
        </p>
        <img
          src={pet.photo}
          alt={pet.name}
          className="mt-2 w-full h-52 object-cover rounded"
        />
      </CardContent>
    </Card>
  );
}
