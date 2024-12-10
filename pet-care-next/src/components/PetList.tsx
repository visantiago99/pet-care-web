import { useQuery } from "@tanstack/react-query";
import { fetchPets, fetchPetsByUserId } from "@/hooks/usePets";
import PetCard from "./PetCard";
import { PetData } from "@/schemas/pet";
import { useUserContext } from "@/contexts/userContext";

export default function PetList({ isMyAccount }: { isMyAccount?: boolean }) {
  const { user } = useUserContext();

  const { data: pets, isLoading: isLoadingPets } = useQuery<PetData[]>({
    queryKey: ["pets"],
    queryFn: fetchPets,
    enabled: !isMyAccount,
  });

  const { data: petsFromUser, isLoading: isLoadingFromUser } = useQuery<
    PetData[]
  >({
    queryKey: ["petsFromUser"],
    queryFn: user?.userId
      ? () => fetchPetsByUserId(user.userId)
      : () => Promise.resolve([]),
    enabled: isMyAccount,
  });

  const handlePets = isMyAccount ? petsFromUser : pets;

  if (isLoadingPets || isLoadingFromUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {Array.isArray(handlePets) && handlePets.length > 0 ? (
        handlePets.map((pet) => (
          <PetCard key={pet.id} pet={pet} isMyAccount={isMyAccount} />
        ))
      ) : (
        <p>Nenhum pet disponível</p>
      )}
    </div>
  );
}
