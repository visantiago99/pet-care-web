import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PetData, PetFormData, petSchema } from "@/schemas/pet";
import { fetchPetById, registerPet, updatePet } from "@/hooks/usePets";
import RichTextEditor from "@/lib/tiptap/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BrazillianStates } from "@/types/states";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function PetForm({
  setModalOpen,
  isEdit,
  petId,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  petId?: string;
}) {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      age: 0,
      breed: "",
      species: "",
      photo: "",
      description: "",
      city: "",
      state: "",
      phone: "",
    },
  });

  const { data: petData } = useQuery<{
    message: string;
    result: PetData;
  }>({
    queryKey: ["pets", petId],
    queryFn: () => fetchPetById(petId ?? ""),
    enabled: !!petId && isEdit,
  });

  const registerMutation = useMutation({
    mutationFn: registerPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { petId: string; updatedPet: PetFormData }) =>
      updatePet(data.petId, data.updatedPet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  useEffect(() => {
    if (isEdit && petData?.result) {
      form.setValue("name", petData.result.name);
      form.setValue("age", petData.result.age);
      form.setValue("breed", petData.result.breed);
      form.setValue("species", petData.result.species);
      form.setValue("photo", petData.result.photo);
      form.setValue("description", petData.result.description);
      form.setValue("city", petData.result.city);
      form.setValue("state", petData.result.state);
      form.setValue("phone", petData.result.phone);
    }
  }, [isEdit, petData, form]);

  useEffect(() => {
    if (registerMutation.isSuccess || updateMutation.isSuccess) {
      form.reset({
        name: "",
        age: 0,
        breed: "",
        species: "",
        photo: "",
        description: "",
        city: "",
        state: "",
        phone: "",
      });

      form.setValue("description", "");

      setModalOpen(false);
    }
  }, [
    registerMutation.isSuccess,
    updateMutation.isSuccess,
    form,
    setModalOpen,
  ]);

  const onSubmit = (data: PetFormData) => {
    if (isEdit && petId) {
      updateMutation.mutate({ petId, updatedPet: data });
    } else {
      registerMutation.mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between w-full gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do pet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input placeholder="Idade do pet" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between w-full gap-2">
          <FormField
            control={form.control}
            name="species"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Espécie</FormLabel>
                <FormControl>
                  <Input placeholder="Espécie do pet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Raça</FormLabel>
                <FormControl>
                  <Input placeholder="Raça do pet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between w-full gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(BrazillianStates).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone para Contato com DDD</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Foto</FormLabel>
              <FormControl>
                <Input placeholder="URL da foto do pet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                  }}
                  key={Date.now().toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {!isEdit ? "Registrar Pet" : "Atualizar Pet"}
        </Button>
      </form>
    </Form>
  );
}
