import { v4 as uuidv4 } from 'uuid';

interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  projectType?: string;
  estimatedPrice?: string;
  type: 'contact' | 'calculator' | 'newsletter';
}

export async function sendEmail(data: EmailData) {
  try {
    console.log('Starting email send process with data:', data);

    // Store submission in localStorage for admin dashboard
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    console.log('Current submissions:', submissions);

    const newSubmission = {
      id: uuidv4(),
      type: data.type,
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        projectType: data.projectType,
        estimatedPrice: data.estimatedPrice,
      },
      createdAt: new Date().toISOString(),
    };
    console.log('New submission to be added:', newSubmission);

    submissions.push(newSubmission);
    localStorage.setItem('submissions', JSON.stringify(submissions));
    console.log('Updated submissions in localStorage:', submissions);

    // Send email using SendGrid
    console.log('Sending email via API...');
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('API Response status:', response.status);
    const responseData = await response.json();
    console.log('API Response data:', responseData);

    if (!response.ok) {
      const errorMessage = responseData.error || 'Failed to send email';
      const errorDetails = responseData.details ? `: ${responseData.details}` : '';
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error in sendEmail:', error);
    throw error;
  }
} 