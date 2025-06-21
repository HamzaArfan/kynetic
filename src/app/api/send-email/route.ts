import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message, projectType, estimatedPrice, type } = data;

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Prepare email content based on submission type
    let subject = '';
    let text = '';
    let html = '';

    switch (type) {
      case 'newsletter':
        subject = 'Ny nyhetsbrev-abonnement';
        text = `Ny abonnement fra ${name} (${email})`;
        html = `
          <h2>Ny nyhetsbrev-abonnement</h2>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
        `;
        break;

      case 'contact':
        subject = 'Ny henvendelse fra kontaktskjema';
        text = `Ny henvendelse fra ${name} (${email})${phone ? `\nTelefon: ${phone}` : ''}\n\nMelding:\n${message}`;
        html = `
          <h2>Ny henvendelse fra kontaktskjema</h2>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          <p><strong>Melding:</strong></p>
          <p>${message}</p>
        `;
        break;

      case 'calculator':
        subject = 'Ny prisberegning';
        text = `Ny prisberegning fra ${name} (${email})${phone ? `\nTelefon: ${phone}` : ''}\n\nProsjekttype: ${projectType}\nEstimert pris: ${estimatedPrice}`;
        html = `
          <h2>Ny prisberegning</h2>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          <p><strong>Prosjekttype:</strong> ${projectType}</p>
          <p><strong>Estimert pris:</strong> ${estimatedPrice}</p>
        `;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid submission type' },
          { status: 400 }
        );
    }

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'shahmiraftab@gmail.com',
      subject,
      text,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.error('Email sending error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 