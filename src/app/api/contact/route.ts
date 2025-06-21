import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL encryption for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    // Log environment variables for debugging (remove in production)
    console.log('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
    });

    let name: string, email: string, message: string;

    // Check content type and parse accordingly
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (contentType && contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = formData.get('name') as string;
      email = formData.get('email') as string;
      message = formData.get('message') as string;
    } else if (contentType && contentType.includes('application/json')) {
      const jsonData = await request.json();
      console.log('Received JSON data:', jsonData);
      name = jsonData.name;
      email = jsonData.email;
      message = jsonData.message;
    } else {
      // Try to parse as form data anyway
      try {
        const formData = await request.formData();
        name = formData.get('name') as string;
        email = formData.get('email') as string;
        message = formData.get('message') as string;
      } catch (error) {
        console.error('Failed to parse request body:', error);
        return NextResponse.json(
          { error: 'Invalid request format' },
          { status: 400 }
        );
      }
    }

    console.log('Parsed form data:', { name, email, message });

    if (!name || !email || !message) {
      console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'kontakt@kynetic.no',
      to: process.env.CONTACT_EMAIL || 'shahmir@kynetic.no',
      subject: 'Ny kontaktforespørsel fra kynetic.no',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Ny kontaktforespørsel
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Navn:</strong> ${name}</p>
            <p><strong>E-post:</strong> ${email}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Melding:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p>Denne meldingen ble sendt fra kontaktskjemaet på kynetic.no</p>
          </div>
        </div>
      `,
    };

    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 