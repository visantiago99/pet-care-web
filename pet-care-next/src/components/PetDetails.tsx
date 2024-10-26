import { PetData } from "@/schemas/pet";
import React from "react";

interface PetDetailsProps {
  pet: PetData;
}

const PetDetails = ({ pet }: PetDetailsProps) => {
  const { id, age, breed, description, name, photo, species, city, state } =
    pet;
  return (
    <div>
      <div className="p-10 flex gap-4 justify-around">
        <div>
          <img src={photo} alt={name} />
        </div>
        <div>
          <h1>Cheguei na página individual de detalhes do pet!</h1>
          <p>ID do pet: {id}</p>
          <p>Nome: {name}</p>
          <p>Espécie: {species}</p>
          <p>Raça: {breed}</p>
          <p>Idade: {age}</p>
          <p>Cidade: {city}</p>
          <p>Estado: {state}</p>
          <p>Descrição: {description}</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
