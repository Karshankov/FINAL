"use client";
import { auth } from "@clerk/nextjs";
import { render } from "@react-email/render";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";


const fileSchema = z.object({
  filename: z.string().min(1,'Ввеедите минимум 5 символов').max(50, "Максимум 50 символов"),
  content: z.any().refine(val => val.length > 0, "Выберите"),
});

const formSchema = z.object({
  username: z.string().min(1,'Ввеедите минимум 5 символов').max(50, "Максимум 50 символов"),
  
  attachments: z.array(fileSchema).refine(val => val.length > 0, "Выберите"),
});


export default function EmailFormClient() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      attachments: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        attachments: values.attachments,
      }),
    });

    if (response.ok) {
      console.log("ok");
      toast.success("Работа отправленна!");
      router.push('/searchLab');
    } else {
      console.log("not ok");
      toast.error("Ошибка отправки");
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ФИО</FormLabel>
                <FormControl>
                  <Input placeholder="фио" {...field} />
                </FormControl>
                <FormDescription>
                  Ваше ФИО будет видно преподавателю
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="attachments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Файлы</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        Promise.all(
                          Array.from(files).map(async (file) => ({
                            filename: file.name,
                            content: Buffer.from(await file.arrayBuffer()).toString('base64'),
                          }))
                        ).then((filesArray) => {
                          field.onChange(filesArray);
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Отправить</Button>
      </form>
    </Form>
  );
}