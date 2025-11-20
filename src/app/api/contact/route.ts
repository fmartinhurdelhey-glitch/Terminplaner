import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure the email transport for Strato
const transporter = nodemailer.createTransport({
  host: 'smtp.strato.de',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email, question } = await request.json();

    // Send email
    await transporter.sendMail({
      from: `"Terminplaner Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Your email address
      subject: 'Neue FAQ-Anfrage',
      text: `
        Neue Frage von: ${email}
        
        Frage:
        ${question}
        
        Bitte antworte schnellstmöglich auf diese Anfrage.
      `,
      html: `
        <h2>Neue FAQ-Anfrage</h2>
        <p><strong>Von:</strong> ${email}</p>
        <p><strong>Frage:</strong></p>
        <p>${question.replace(/\n/g, '<br>')}</p>
        <p>Bitte antworte schnellstmöglich auf diese Anfrage.</p>
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
