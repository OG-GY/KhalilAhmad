# Khalil Ahmad Portfolio

This is a [Next.js](https://nextjs.org) project showcasing Khalil Ahmad's web development work and services. It features a modern, responsive design with interactive components and secure contact functionality.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15.2.1 and Tailwind CSS
- **Interactive Components**: Custom UI components with animations and hover effects
- **Secure Contact Forms**: Multiple contact forms with spam protection and email functionality
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: Fast loading with optimized images and fonts

## 📧 Contact Form System

The portfolio includes two secure contact forms with comprehensive email functionality:

### Available Forms
1. **General Contact Form** (`/src/components/ContactComponents/GeneralContactForm.tsx`)
   - Basic contact with name, email, and message
   - Simple and quick for general inquiries

2. **Request Quote Form** (`/src/components/ContactComponents/RequestQuoteForm.tsx`)
   - Advanced form for project quotes
   - Includes project type, budget range, timeline selection
   - Detailed project description field

### Security Features
- **Spam Protection**: Honeypot fields to catch automated submissions
- **Rate Limiting**: IP-based rate limiting (5 submissions per hour per IP)
- **Data Validation**: Server-side validation using Zod schema validation
- **Content Sanitization**: HTML content is stripped from user inputs
- **SMTP Security**: TLS encryption for email transmission
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Email Configuration

The contact forms send emails to: **iamkhali2005@gmail.com**

#### Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# For Gmail, use App Password (not regular password)
# Generate at: https://myaccount.google.com/apppasswords
```

#### Email Setup Instructions

1. **Gmail Setup** (Recommended):
   ```bash
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   ```
   - Enable 2-Factor Authentication on your Gmail account
   - Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Use the 16-digit app password (not your regular password)

2. **Alternative SMTP Providers**:
   - **Outlook**: smtp-mail.outlook.com, Port 587
   - **Yahoo**: smtp.mail.yahoo.com, Port 587
   - **Custom SMTP**: Configure according to your provider

#### Email Features
- **HTML Email Templates**: Rich formatted emails with proper styling
- **Automatic Replies**: Confirmation emails sent to users
- **Error Notifications**: Failed delivery notifications
- **Content Formatting**: Properly formatted project details and contact information

### API Endpoint

**POST** `/api/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project...",
  "projectType": "Web Development", // Optional - for quote requests
  "budget": "$500-$1000", // Optional - for quote requests
  "timeline": "1M", // Optional - for quote requests
  "honeypot": "" // Must be empty - spam protection
}
```

**Response**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response**:
```json
{
  "error": "Validation failed",
  "details": ["Email is required", "Message is required"]
}
```

### Security Considerations

1. **Rate Limiting**: 5 submissions per hour per IP address
2. **Validation**: All inputs validated on both client and server
3. **Honeypot Protection**: Hidden fields to catch bots
4. **Content Sanitization**: HTML tags stripped from user inputs
5. **SMTP Security**: TLS encryption for email transmission
6. **Error Handling**: No sensitive information exposed in errors

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd khalilahmad
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your email configuration
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/          # Contact form API endpoint
│   │       └── route.ts      # Secure email handling
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ContactComponents/    # Contact form components
│   │   ├── GeneralContactForm.tsx
│   │   └── RequestQuoteForm.tsx
│   ├── ui/                   # Reusable UI components
│   └── ...                   # Other components
├── data/
│   └── projects.ts           # Project data
└── types/
    └── project.ts            # TypeScript types
```

## 🔧 Technologies Used

- **Framework**: Next.js 15.2.1
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Email**: Nodemailer
- **Validation**: Zod
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📱 Contact Form Usage

### For General Inquiries
1. Navigate to the contact section
2. Fill in the General Contact Form
3. Submit and receive confirmation

### For Project Quotes
1. Use the Request Quote Form
2. Select project type, budget, and timeline
3. Provide detailed project description
4. Submit for personalized quote

## 🚨 Troubleshooting

### Email Not Sending
1. **Check Environment Variables**: Ensure all EMAIL_* variables are set correctly
2. **Gmail Issues**: Make sure you're using an App Password, not your regular password
3. **SMTP Settings**: Verify host, port, and credentials with your provider
4. **Rate Limiting**: Wait an hour if you've hit the rate limit (5 emails/hour)

### Development Issues
1. **Clear Browser Cache**: Hard refresh or clear cache if styles aren't updating
2. **Restart Dev Server**: Stop and restart `npm run dev` if hot reload isn't working
3. **Check Console**: Browser and terminal console for error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary to Khalil Ahmad.

## 📞 Support

For questions or support, please contact through the portfolio contact forms or email directly at iamkhali2005@gmail.com.

---

**Built with ❤️ by Khalil Ahmad**
