"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface CourseProgressButtonProps {
  chapterId: string;
  labsId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

export const CourseProgressButton = ({
  chapterId,
  labsId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/labs/${labsId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && nextChapterId) {
        router.push(`/labs/${labsId}/chapters/${nextChapterId}`);
      }

      toast.success("Прогресс обновлен");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Сделать задание не выполненным " : "Сделать задание выполненным"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};