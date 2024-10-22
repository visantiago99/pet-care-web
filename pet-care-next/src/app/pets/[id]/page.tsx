"use client";
import { fetchPetById } from "@/hooks/usePets";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PetData } from "@/schemas/pet";
import PetDetails from "@/components/PetDetails";

export default function PetDetailsPage() {
  const { id } = useParams();

  const {
    data: petData,
    isLoading,
    error,
  } = useQuery<{
    message: string;
    result: PetData;
  }>({
    queryKey: ["pets", id],
    queryFn: () => fetchPetById(id.toString()),
    enabled: !!id,
  });

  return (
    <>
      {isLoading && <div>Carregando...</div>}
      {petData?.result && <PetDetails pet={petData.result} />}
      {error && <div>Erro ao carregar os dados do pet</div>}
    </>
  );
}
