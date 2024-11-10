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
