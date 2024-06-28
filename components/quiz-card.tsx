import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { CourseProgress } from "./course-progress";


interface QuizCardProps {
    id: string;
    title: string;
  }

export const QuizCard = ({
    id,
    title,
}: QuizCardProps) =>{
    return(
        <Link href={`/quiz/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border-4 rounded-lg p-3 h-full hover:border-slate-600">
            <div className="relative w-full aspect-video rounded-md overflow-hidden flex justify-center items-center">
  <h1 className="text-center text-xl">
    {title}
  </h1>
</div>
            </div>
        </Link>
    )
}