import { PetFormData } from "@/schemas/pet";

export const fetchPets = async () => {
  const res = await fetch("http://localhost:3001/pets");
  return res.json();
};

export const fetchPetById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/pets/${id}`);
  return res.json();
};

export const registerPet = async (newPet: PetFormData) => {
  const searchParams = new URLSearchParams();
  Object.entries(newPet).forEach((entry) => {
    if (entry[1]) {
      searchParams.append(...entry);
    }
  });

  const res = await fetch("http://localhost:3001/pets", {
    method: "POST",
    body: searchParams,
  });

  return res.json();
};

export const deletePet = async (petId: string) => {
  const res = await fetch(`http://localhost:3001/pets/${petId}`, {
    method: "DELETE",
  });

  return res.json();
};
