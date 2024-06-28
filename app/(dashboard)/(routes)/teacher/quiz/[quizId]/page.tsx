import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, ScrollText } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
const ChapterIdPage = async({
    params
}:{
    params: { quizId: string }
}) => {
    const { userId } = auth();
    if (!userId) {
    return redirect("/");
  }

  const quiz = await db.quizForms.findUnique({
    where: {
      id: params.quizId,
    },
  });

  if (!quiz) {
    return redirect("/");
  }

  const requiredFields = [
    quiz.title,
    quiz.src,
    // chapter.videoUrl
];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);




    return ( 
   <>
    <div className="p-6">
        <div className="flex items-center justify-between">
        <div className="w-full">
        <Link
        href={`/teacher/quiz/`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
        >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Вернуться назад
        </Link>
        <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Создание теста</h1>
                <span className="text-sm text-slate-700">
                  Заполните все поля {completionText}
                </span>
              </div>
              <ChapterActions
                quizId={params.quizId}
              />
            </div>
        </div>   
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
            <div>
            <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard}/>
                <h2 className="text-xl">
                   Название
                </h2>
            </div>
            <ChapterTitleForm 
            initialData={quiz}
            quizId={params.quizId}
            />
            </div>
        </div>

        <div>
        <div className="flex items-center gap-x-2">
            <IconBadge icon={ScrollText}/>
            <h2 className="text-xl">
                Добавить ссылку на тест
            </h2>
        </div>
        <ChapterVideoForm 
        initialData={quiz}
        quizId={params.quizId}
        />

        </div>
        </div>
    </div> 
  </>
);
}
 
export default ChapterIdPage;