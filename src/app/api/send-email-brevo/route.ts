import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();
// secrit key
  // 
console.log("email info-------------",  to, subject, message,process.env.BREVO_HOST,process.env.BREVO_USER,process.env.BREVO_PASS)
 
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error with SMTP connection:", error);
  } else {
    console.log("SMTP connection successful:", success);
  }
});

  try {
  const info =  await transporter.sendMail({
     from: `"Masala GF" <${process.env.BREVO_USER}>`,
      to,
      subject,
      text: message,
    });

    console.log("info---------", info)

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error('Email error:', err);
    // console.error('Error details:', err.message || err);
    return new Response(JSON.stringify({ error: 'Failed to send email', details: err }), {
      status: 500,
    });
  }
  
}