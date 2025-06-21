# Hostinger Email Setup for Contact Form

## Step 1: Get Your Hostinger Email Credentials

1. Log into your Hostinger control panel
2. Go to "Email" section
3. Find your email account (shahmir@kynetic.no)
4. Note down:
   - Email address
   - Password
   - SMTP settings

## Step 2: Create Environment File

Create a `.env.local` file in your project root with these settings:

```env
# Hostinger SMTP Settings (Official Documentation)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=shahmir@kynetic.no
SMTP_PASSWORD=your-actual-email-password
SMTP_FROM=kontakt@kynetic.no

# Contact email where form submissions will be sent
CONTACT_EMAIL=shahmir@kynetic.no
```

## Step 3: Alternative SMTP Settings (if SSL doesn't work)

If you encounter SMTP encryption issues, use TLS with port 587 instead:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Step 4: Test the Contact Form

1. Start your development server: `npm run dev`
2. Go to `/kontakt` page
3. Fill out and submit the form
4. Check if you receive the email at shahmir@kynetic.no

## Troubleshooting

- **Authentication failed**: Double-check your email and password
- **SSL/TLS issues**: Try port 587 with `SMTP_SECURE=false`
- **Connection timeout**: Make sure your domain has correct MX records

## Official Hostinger SMTP Settings

According to Hostinger's official documentation:
- **Host**: smtp.hostinger.com
- **Port**: 465 (SSL) or 587 (TLS)
- **Encryption**: SSL for port 465, TLS for port 587

## Security Note

- Never commit your `.env.local` file to git
- Use a strong password for your email account
- Consider using an app-specific password if available

## Production Deployment

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your hosting platform's dashboard. 