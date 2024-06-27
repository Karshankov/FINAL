import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { labsId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Вы не авторизованны", { status: 401 });
    }
    const { list } = await req.json();
    const ownCourse = await db.labs.findUnique({
      where: {
        id: params.labsId,
        userId: userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Нет доступа", { status: 401 });
    }
    for (let item of list) {
      await db.chapterLabs.update({
        where: {
          id: item.id,
        },
        data: { position: item.position },
      });
    }
    return NextResponse.json("Успешно", { status: 200 });
  } catch (error) {
    console.log("REORDER_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}