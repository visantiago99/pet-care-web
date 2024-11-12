import * as z from "zod";

export const petSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  age: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1, { message: "Idade é obrigatória" })
  ),
  breed: z
    .string()
    .min(2, { message: "Raça deve ter pelo menos 2 caracteres" }),
  species: z
    .string()
    .min(2, { message: "Espécie deve ter pelo menos 2 caracteres" }),
  photo: z.string().url({ message: "URL da foto inválida" }),
  description: z.string(),
  city: z.string(),
  state: z.string(),
  phone: z
    .string()
    .min(10, { message: "Insira um telefone válido para contato" }),
});

export const petPostSchema = z.object({
  content: z.string().min(15, {
    message: "Escreva uma descrição depelo menos 15 caracteres para o post",
  }),
  photo: z.string().url({ message: "URL da foto inválida" }),
});

export type PetFormData = z.infer<typeof petSchema>;

export type PetPostFormData = z.infer<typeof petPostSchema>;

export interface PetData extends PetFormData {
  id: string;
}

export interface PetPost {
  post_id: number;
  pet_id: number;
  content: string;
  photo: string;
  post_date: string;
}
