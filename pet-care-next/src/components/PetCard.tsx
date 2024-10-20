import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PetData } from "@/schemas/pet";

interface PetCardProps {
  pet: PetData;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pet.name}</CardTitle>
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
          <strong>Histórico Médico:</strong> {pet.medical_history}
        </p>
        <img
          src={pet.photo}
          alt={pet.name}
          className="mt-2 w-full h-40 object-cover rounded"
        />
      </CardContent>
    </Card>
  );
}
