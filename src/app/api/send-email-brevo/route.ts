import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();
// secrit key
  // 

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: 587,
    auth: {
      user: process.env.BREVO_USER, // Brevo verified sender
      pass:  process.env.BREVO_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Masala GF" <your-brevo-email@example.com>',
      to,
      subject,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error('Email error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}