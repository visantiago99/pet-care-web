import RichTextEditor from "@/lib/tiptap/RichTextEditor";
import { PetData } from "@/schemas/pet";
import { BrazillianStates } from "@/types/states";
import React from "react";

interface PetDetailsProps {
  pet: PetData;
}

const PetDetails = ({ pet }: PetDetailsProps) => {
  const { age, breed, description, name, photo, species, city, state, phone } =
    pet;
  return (
    <div className="flex flex-col w-full p-10 gap-4">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[50%]">
          <img
            src={photo}
            alt={name}
            className="rounded-md w-full h-[50%] object-cover"
          />
        </div>
        <div className="lg:w-[50%]">
          <p>Nome: {name}</p>
          <p>Espécie: {species}</p>
          <p>Raça: {breed}</p>
          <p>Idade: {age}</p>
          <p>Cidade: {city}</p>
          <p>
            Estado: {BrazillianStates[state as keyof typeof BrazillianStates]}
          </p>
          <p>Contato: {phone}</p>
          <p>Descrição:</p>
          <RichTextEditor
            content={description}
            isReadOnly
            onChange={() => {
              return;
            }}
            key={Date.now().toString()}
          />
        </div>
      </div>
      <div>
        <h1>Atualizações:</h1>
      </div>
    </div>
  );
};

export default PetDetails;
