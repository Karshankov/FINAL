"use client";

import * as z from "zod";
import axios from "axios";
// import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, ScrollText } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { QuizForms } from "@prisma/client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";

interface ChapterVideoFormProps {
  initialData: QuizForms;
  quizId: string;
};

const formSchema = z.object({
  src: z.string(),
});

// const formSchema = z.object({
//     title: z.string().min(1),
//   });
export const ChapterVideoForm = ({
  initialData,
  quizId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/quiz/${quizId}`, values);
      toast.success("Тест обнавлен!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Ошибка загрузки видео");
    }
  }
  console.log(initialData) 
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Ссылка на Google-Form
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Назад</>
          )}
          {!isEditing && !initialData.src && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Добавить ссылку
            </>
          )}
          {!isEditing && initialData.src && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Изменить ссылку
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.src ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ScrollText className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
             <iframe
                className="video"
                width="700"
                height="400"
                src= {initialData.src}
                title="GoogleForm Tests"
                allowFullScreen
              ></iframe>
          </div>
        )
      )}
      {isEditing && (
        <div>
          <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
            >
                <FormField
                control={form.control}
                name="src"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input
                        disabled={isSubmitting}
                        placeholder="Например: Постороение карт карно"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex items-center gap-x-2">
                <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                >
                    Сохранить
                </Button>
                </div>
            </form>
        </Form>
          <div className="text-xs text-muted-foreground mt-4">
           Вставьте ссылку на тест
          </div>
        </div>
      )}
      {initialData.src && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Нужно несколько минут для подгрузки теста.
        </div>
      )}
    </div>
  )
}