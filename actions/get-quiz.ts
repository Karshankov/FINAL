import { QuizForms } from "@prisma/client";
import { db } from "@/lib/db";

type QuizWithProgressWithCategory = QuizForms;

type getQuiz = {
  quizId: string;
  userId: string;
  title?: string;
  src?: string;

};

export const getQuiz = async ({
  quizId,
  userId,
  title,
  src
}: getQuiz): Promise<QuizWithProgressWithCategory[]> => {
  try {
    const quiz = await db.quizForms.findMany({
      where: {
        title: {
          contains: title,
        },
        src:{
          contains: src,
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const quizWithProgress: QuizWithProgressWithCategory[] =
      await Promise.all(
        quiz.map(async (quiz) => {
          return {
            ...quiz,
          };
        })
      );
    return quizWithProgress;
  } catch (error) {
    console.log("Ошибка получения тестов ", error);
    return [];
  }
};