import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, pages, design, integrations, budget, ekstra, navn, bedrift, epost, telefon } = body;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Nytt prisforslag fra ${navn}`,
      html: `
        <h2>Nytt prisforslag</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Antall sider:</strong> ${pages}</p>
        <p><strong>Designpreferanser:</strong> ${design.join(', ')}</p>
        <p><strong>Integrasjoner:</strong> ${integrations.join(', ')}</p>
        <p><strong>Budsjett:</strong> ${budget}</p>
        <p><strong>Ekstra opplysninger:</strong> ${ekstra || 'Ingen'}</p>
        <hr>
        <h3>Kontaktinformasjon</h3>
        <p><strong>Navn:</strong> ${navn}</p>
        <p><strong>Bedrift:</strong> ${bedrift}</p>
        <p><strong>E-post:</strong> ${epost}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending price quote:', error);
    return NextResponse.json(
      { error: 'Failed to send price quote' },
      { status: 500 }
    );
  }
} 