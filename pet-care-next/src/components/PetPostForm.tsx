import { PetPostFormData, petPostSchema } from "@/schemas/pet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import RichTextEditor from "@/lib/tiptap/RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerPetPost } from "@/hooks/usePetsPosts";
import { Dispatch, SetStateAction, useEffect } from "react";

const PetPostForm = ({
  petId,
  setModalOpen,
}: {
  petId: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(petPostSchema),
    defaultValues: {
      content: "",
      photo: "",
    },
  });

  const registerPostMutation = useMutation({
    mutationFn: (data: { petId: string; newPost: PetPostFormData }) =>
      registerPetPost(data.petId, data.newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["petPosts"] });
    },
  });

  useEffect(() => {
    if (registerPostMutation.isSuccess) {
      form.reset({
        photo: "",
      });

      form.setValue("content", "");

      setModalOpen(false);
    }
  }, [registerPostMutation.isSuccess, form, setModalOpen]);

  const onSubmit = (data: PetPostFormData) => {
    registerPostMutation.mutate({ petId, newPost: data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                  }}
                />
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

        <Button type="submit">Registrar Post</Button>
      </form>
    </Form>
  );
};

export default PetPostForm;
