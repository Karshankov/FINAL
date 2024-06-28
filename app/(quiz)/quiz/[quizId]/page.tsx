import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import { getQuiz } from "@/actions/get-quizS";



const ChapterIdPage = async ({
  params,
}: {
  params: { quizId: string; title: string, src: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { quizId, src } = await getQuiz({
    quizId: params.quizId,
    src: params.src,
  });
  
  console.log("ChapterIdPage result: ", { quizId, src });
  
  if (!quizId || !src) {
    return redirect("/");
  }
  
  let videoUrl = src;

  return (
    <div className="h-full w-full flex items-center justify-center">
    <iframe src={videoUrl} width="100%" height="100%"></iframe>
  </div>
  );
};

export default ChapterIdPage;