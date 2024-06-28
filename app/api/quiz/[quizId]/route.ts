import { QuizForms } from '@prisma/client';
import Mux from "@mux/mux-node";

 import { auth } from "@clerk/nextjs";
 import { NextResponse } from "next/server";

 import { db } from "@/lib/db";

 const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);


export async function DELETE(
  req: Request,
  { params }: { params: { quizId: string; } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Вы не авторизованны", { status: 401 });
    }


    const chapter = await db.quizForms.findUnique({
      where: {
        id: params.quizId,
      },
    });

    if (!chapter) {
      return new NextResponse("Не найдено", { status: 404 });
    }

   
    const deletedChapter = await db.quizForms.delete({
      where: {
        id: params.quizId,
      },
    });


    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: {quizId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Вы не авторизаванны", { status: 401 });
    }

    const chapter = await db.quizForms.update({
      where: {
        id: params.quizId,
      },
      data: {
        ...values,
      },
    });


    return NextResponse.json(chapter);

  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}