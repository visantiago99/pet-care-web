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
    },
  });

  const mutation = useMutation({
    mutationFn: registerPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const onSubmit = (data: PetFormData) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Form fields here */}
        <Button type="submit">Registrar Pet</Button>
      </form>
    </Form>
  );
}
