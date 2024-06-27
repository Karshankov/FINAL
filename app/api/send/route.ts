import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const json = req.json();
  const { username, attachments } = await json;

  try {
    const data = await resend.emails.send({
      from: 'lms_alovt <onboarding@resend.dev>',
      to: ['karshankov.dev@gmail.com'],
      subject: 'File',
      text: 'Новый файл!',
      react: EmailTemplate({ username, }),
      attachments: attachments.map((file : any) => ({
        filename: file.filename,
        content: file.content,
      })),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
