import * as z from "zod";

export const petSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  age: z.string().min(1, { message: "Idade é obrigatória" }),
  breed: z
    .string()
    .min(2, { message: "Raça deve ter pelo menos 2 caracteres" }),
  species: z
    .string()
    .min(2, { message: "Espécie deve ter pelo menos 2 caracteres" }),
  photo: z.string().url({ message: "URL da foto inválida" }),
});

export type PetFormData = z.infer<typeof petSchema>;

export interface PetData extends PetFormData {
  id: string;
  medical_history: string;
}
