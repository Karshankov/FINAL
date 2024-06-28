import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse('Вы не авторизованны', { status: 401 });
    }

    const quiz = await db.quizForms.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(quiz);
  } catch (error) {
    console.log('[QUIZ]', error);
    return new NextResponse('Ошибка', { status: 500 });
  }
}
