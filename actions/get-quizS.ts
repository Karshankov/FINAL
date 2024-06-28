import { db } from "@/lib/db";


interface GetQuizProps {
  quizId: string;
  src: string | null;
}

export const getQuiz = async ({
  quizId,
  src
}: GetQuizProps) => {
  console.log("getQuiz called with: ", { quizId, src });
  
  try {
    const quiz = await db.quizForms.findUnique({
      where: {
        id: quizId,
        src: src,
      },
    });
    console.log("getQuiz result: ", { quizId, src, quiz });
    return {
      quizId,
      src: quiz?.src || null
    };
  } catch (error) {
    console.log("[GET_QUIZ]", error);
    return {
      quizId: null,
      src: null,
    };
  }
};