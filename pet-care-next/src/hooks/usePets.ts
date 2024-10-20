import { PetFormData } from "@/schemas/pet";

export const fetchPets = () =>
  fetch("http://localhost:3001/pets").then((res) => res.json());

export const registerPet = (newPet: PetFormData) => {
  const searchParams = new URLSearchParams();
  Object.entries(newPet).forEach((entry) => {
    if (entry[1]) {
      searchParams.append(...entry);
    }
  });

  return fetch("http://localhost:3001/pets", {
    method: "POST",
    body: searchParams,
  }).then((res) => res.json());
};

export const deletePet = (petId: string) => {
  return fetch(`http://localhost:3001/pets/${petId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
