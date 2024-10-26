import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { PetFormData, petSchema } from "@/schemas/pet";
import { registerPet } from "@/hooks/usePets";
import RichTextEditor from "@/lib/tiptap/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BrazillianStates } from "@/types/states";
import { useEffect } from "react";

export default function PetForm() {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      age: "",
      breed: "",
      species: "",
      photo: "",
      description: "",
      city: "",
      state: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      form.reset({
        name: "",
        age: "",
        breed: "",
        species: "",
        photo: "",
        description: "",
        city: "",
        state: "",
      });

      form.setValue("description", "");
    }
  }, [mutation.isSuccess, form]);

  const onSubmit = (data: PetFormData) => {
    mutation.mutate(data);
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                  key={mutation.isSuccess ? Date.now().toString() : "editor"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Registrar Pet</Button>
      </form>
    </Form>
  );
}
