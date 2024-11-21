import { PetPostFormData } from "@/schemas/pet";

export const fetchPetPostsById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/posts/pet/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error("Error fetching pet posts:", error);
    throw error;
  }
};

export const registerPetPost = async (
  petId: string,
  newPost: PetPostFormData
) => {
  const filteredPetData = Object.fromEntries(
    Object.entries(newPost).filter(([, value]) => value != null && value !== "")
  );

  const res = await fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...filteredPetData,
      pet_id: petId,
      user_id: 1 // get later from context api logged user
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to register pet: ${res.statusText}`);
  }

  return res.json();
};

export const deletePetPost = async (postId: string) => {
  const res = await fetch(`http://localhost:3001/posts/${postId}`, {
    method: "DELETE",
  });

  return res.json();
};
