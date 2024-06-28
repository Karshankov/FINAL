import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";
import { DataTable } from './_components/data-tabble';
import { columns } from './_components/columns';
import { db } from "@/lib/db";

const QuizPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const quiz = await db.quizForms.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={quiz} />
    </div>
  );
};

export default QuizPage;
