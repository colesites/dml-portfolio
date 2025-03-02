import { NextResponse } from 'next/server'
import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface RequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request): Promise<Response> {
  const { name, email, message }: RequestBody =
    await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  } as SMTPTransport.Options);

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `Message from ${name}`,
      text: `${message} from ${email}`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
  }
}
