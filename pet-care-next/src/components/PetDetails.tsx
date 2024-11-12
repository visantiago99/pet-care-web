import { useQuery } from "@tanstack/react-query";
import { fetchPetPostsById } from "@/hooks/usePetsPosts";
import RichTextEditor from "@/lib/tiptap/RichTextEditor";
import { PetData, PetPost } from "@/schemas/pet";
import { BrazillianStates } from "@/types/states";
import PetPostFormModal from "./PetPostFormModal";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PetDetailsProps {
  pet: PetData;
}

const PetDetails = ({ pet }: PetDetailsProps) => {
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

  const { data: petPosts = [] } = useQuery<PetPost[]>({
    queryKey: ["petPosts", id],
    queryFn: () => fetchPetPostsById(id),
  });

  return (
    <div className="flex flex-col w-full p-10 gap-4">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[50%]">
          <img
            src={photo}
            alt={name}
            className="rounded-md h-[28rem] w-full object-cover"
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
          <p className="mt-2">Descrição:</p>
          <RichTextEditor
            content={description}
            isReadOnly
            onChange={() => {
              return;
            }}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center">
          <PetPostFormModal petId={id} />
        </div>
        <h1>Atualizações:</h1>
        <div className="flex flex-col gap-8">
          {petPosts.length ? (
            petPosts.map((post, index) => (
              <Card key={index} className="rounded-md overflow-hidden">
                <CardHeader>
                  <CardTitle>Atualização: {post.post_date}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="my-4">
                    <RichTextEditor
                      content={post.content}
                      isReadOnly
                      onChange={() => {
                        return;
                      }}
                    />
                  </div>
                  <img
                    className="rounded-md max-h-[35rem] w-full object-cover"
                    src={post.photo}
                    alt={post.content}
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <p>Não há atualizações disponíveis.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
