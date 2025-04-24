import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();
// secrit key
  // 
console.log("email info-------------",  to, subject, message,process.env.BREVO_HOST,process.env.BREVO_USER,process.env.BREVO_PASS)
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
      from: `"Masala GF" ${process.env.BREVO_USER}`,
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