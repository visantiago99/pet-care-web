import { useQuery } from "@tanstack/react-query";
import { fetchPets } from "@/hooks/usePets";
import PetCard from "./PetCard";
import { PetData } from "@/schemas/pet";

export default function PetList() {
  const { data: pets = [] } = useQuery<PetData[]>({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
