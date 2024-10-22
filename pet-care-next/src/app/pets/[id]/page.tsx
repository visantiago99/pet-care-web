"use client";
import { fetchPetById } from "@/hooks/usePets";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PetData } from "@/schemas/pet";

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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados do pet</div>;
  }

  const { name, species, breed, age, medical_history, photo } =
    petData?.result || {
      id: "",
      age: "",
      breed: "",
      medical_history: "",
      name: "",
      photo: "",
      species: "",
    };

  return (
    <div>
      <h1>Cheguei na página individual do pet!</h1>
      <p>ID do pet: {id}</p>
      <p>Nome: {name}</p>
      <p>Espécie: {species}</p>
      <p>Raça: {breed}</p>
      <p>Idade: {age}</p>
      <p>Histórico Médico: {medical_history}</p>
      <img src={photo} alt={name} />
    </div>
  );
}
