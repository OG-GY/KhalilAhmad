import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  // Honeypot field for spam protection
  honeypot: z.string().max(0, 'Spam detected').optional()
});

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 emails per 15 minutes per IP
  
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = requests.filter((time: number) => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return true;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return false;
}

// Security headers
function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  return cfConnectingIP || 
         (forwarded ? forwarded.split(',')[0].trim() : '') || 
         realIP || 
         'unknown';
}

// Create transporter
function createTransporter() {
  // Check if all required environment variables are present
  const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing environment variables:', missing);
    console.log('Available env vars:', {
      EMAIL_HOST: process.env.EMAIL_HOST ? 'SET' : 'MISSING',
      EMAIL_PORT: process.env.EMAIL_PORT ? 'SET' : 'MISSING', 
      EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'MISSING'
    });
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('Creating email transporter with:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER ? 'SET' : 'MISSING'
  });

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Additional security options
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    }
  });
}

// Sanitize content for email
function sanitizeContent(content: string): string {
  return content
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Security checks
    const clientIP = getClientIP(request);
    
    // Rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please wait 15 minutes before sending another message.' 
        },
        { 
          status: 429,
          headers: getSecurityHeaders()
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Validate using Zod schema
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    const { name, email, message, projectType, budget, timeline } = validationResult.data;

    // Additional spam checks
    const suspiciousPatterns = [
      /viagra|cialis|pharmacy/i,
      /\$\d+.*million/i,
      /click here|act now/i,
      /limited time offer/i
    ];
    
    const messageContent = `${name} ${email} ${message}`;
    if (suspiciousPatterns.some(pattern => pattern.test(messageContent))) {
      console.log(`Potential spam detected from ${clientIP}: ${email}`);
      return NextResponse.json(
        { success: false, error: 'Message content not allowed' },
        { 
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify connection
    try {
      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return NextResponse.json(
        { success: false, error: 'Email service temporarily unavailable' },
        { 
          status: 503,
          headers: getSecurityHeaders()
        }
      );
    }

    // Sanitize content
    const sanitizedName = sanitizeContent(name);
    const sanitizedMessage = sanitizeContent(message);
    
    // Prepare email content
    const emailSubject = `Portfolio Contact: ${sanitizedName}`;
    const emailBody = `
New contact form submission from your portfolio website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${sanitizedName}
Email: ${email}
IP Address: ${clientIP}
Timestamp: ${new Date().toISOString()}

${projectType ? `Project Type: ${sanitizeContent(projectType)}` : ''}
${budget ? `Budget: ${sanitizeContent(budget)}` : ''}
${timeline ? `Timeline: ${sanitizeContent(timeline)}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 Message
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitizedMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 Security Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent securely through your portfolio contact form.
Reply directly to this email to respond to ${sanitizedName}.

If this appears to be spam, please check your security settings.
    `.trim();

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'reachkhalilhere@gmail.com',
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Portfolio Contact Form',
      }
    };

    console.log('Attempting to send email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
    } catch (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { 
          status: 500,
          headers: getSecurityHeaders()
        }
      );
    }

    // Log successful submission
    console.log(`Contact form submission sent: ${email} from ${clientIP}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully! I\'ll get back to you soon.' 
      },
      { 
        status: 200,
        headers: getSecurityHeaders()
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST'
      }
    }
  );
}

export const runtime = 'nodejs';
export const maxDuration = 30;
