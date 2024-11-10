import { fetchPetPostsById } from "@/hooks/usePetsPosts";
import RichTextEditor from "@/lib/tiptap/RichTextEditor";
import { PetData, PetPost } from "@/schemas/pet";
import { BrazillianStates } from "@/types/states";
import React, { useEffect, useState } from "react";

interface PetDetailsProps {
  pet: PetData;
}

const PetDetails = ({ pet }: PetDetailsProps) => {
  const [petPosts, setPetPosts] = useState<PetPost[]>([]);
  const {
    age,
    breed,
    description,
    name,
    photo,
    species,
    city,
    state,
    phone,
    id,
  } = pet;

  const handleFetchPosts = async (id: string) => {
    try {
      const posts = await fetchPetPostsById(id);

      if (posts) {
        setPetPosts(posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handleFetchPosts(id);
  }, [id]);

  return (
    <div className="flex flex-col w-full p-10 gap-4">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[50%]">
          <img
            src={photo}
            alt={name}
            className="rounded-md w-full object-cover"
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
        {Array.isArray(petPosts) && petPosts.length > 0 ? (
          petPosts.map((post, index) => (
            <div key={index}>
              <p>{post.content}</p>
              <img src={post.photo} alt={post.content} />
            </div>
          ))
        ) : (
          <p>Não há atualizações disponíveis.</p>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
