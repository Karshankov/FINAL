import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";


import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


const QuizLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { quizId: string}
}) =>{
const { userId } = auth();

    if (!userId){
        return redirect("/")
    }

    const quiz = await db.quizForms.findUnique({
        where: {
          id: params.quizId,
        },
      });

      if (!quiz) {
        return redirect("/");
      }

    return(
        <div className="h-full">
          <div className="m-5 flex">
            <Link href={'/searchQuiz'}>
            <Button>
              Назад
            </Button>
            
            </Link>
            
          </div>
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    )
}


export default QuizLayout;