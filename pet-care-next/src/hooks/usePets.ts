import { PetFormData } from "@/schemas/pet";

export const fetchPets = async () => {
  const res = await fetch("http://localhost:3001/pets");
  return res.json();
};

export const fetchPetsByUserId = async (userId: string) => {
  const res = await fetch(`http://localhost:3001/pets/user/${userId}`);
  return res.json();
};

export const fetchPetById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/pets/${id}`);
  return res.json();
};

export const registerPet = async (newPet: PetFormData) => {
  const filteredPetData = Object.fromEntries(
    Object.entries(newPet).filter(([, value]) => value != null && value !== "")
  );

  const res = await fetch("http://localhost:3001/pets", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...filteredPetData,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to register pet: ${res.statusText}`);
  }

  return res.json();
};

export const updatePet = async (petId: string, updatedPet: PetFormData) => {
  const filteredPetData = Object.fromEntries(
    Object.entries(updatedPet).filter(
      ([, value]) => value != null && value !== ""
    )
  );

  const res = await fetch(`http://localhost:3001/pets/${petId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filteredPetData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update pet: ${res.statusText}`);
  }

  return res.json();
};

export const deletePet = async (petId: string) => {
  const res = await fetch(`http://localhost:3001/pets/${petId}`, {
    method: "DELETE",
  });

  return res.json();
};
