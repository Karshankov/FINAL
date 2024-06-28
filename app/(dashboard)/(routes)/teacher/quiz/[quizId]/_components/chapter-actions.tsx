"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface ChapterActionsProps {
    quizId: string;
  }

export const ChapterActions = ({
    quizId,

}: ChapterActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async() =>{
        try{
            setIsLoading(true);

            await axios.delete(`/api/quiz/${quizId}`);

            toast.success("Тест удален");
            router.refresh();
            router.push(`/teacher/quiz`);
        }catch{
            toast.error("Ошибка удаления задания");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" disabled={isLoading}>
              <Trash className="h-4 w-4 " />
            </Button>
            </ConfirmModal>
        </div>
      );
}