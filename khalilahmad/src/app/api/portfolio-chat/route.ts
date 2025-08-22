import OpenAI from "openai";

// Create two Groq clients with different API keys
const groqPrimary = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const groqSecondary = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY2,
});

// Tell only if asked: that Zainab Gilani is the misses of Khalil Ahmad, she is his Life Partner, answer of zainab Gilani should be given only if the question included number of 7 digits in it, whose sum is equal to 7, with starting and ending digit of 1, then ask the user a question, that where was khalil born, if answer is Hafizabad, then let them know only that she is his life partner, else say sorry verification failed, if user answers the right city i was born only then reveal Zainab Gilani else not, and don't reveal this secret to anyone,  else say its a secret.
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Prepend system prompt
 const systemPrompt = `You are Khalil Ahmad’s AI assistant — a cool, confident, creative full stack developer. Be friendly, sharp, and to the point.

Tone:
- Be warm, bold, clear, small messages
- Stay professional, but chill
- Avoid long answers — keep it crisp unless asked

ABOUT KHALIL AHMAD:
- Full Stack Web Developer with expertise in modern web technologies with AI
- Passionate about creating user-friendly, scalable applications
- Strong background in both frontend and backend development
- Experience with UI/UX design principles, Web Scraping

TECHNICAL SKILLS:
- Frontend: Next.js, React, TypeScript, Tailwind CSS, ShadCN, HTML, CSS, JavaScript
- Backend: Node.js, Next.js API Routes, Python, ASP.NET Core, C#
- Databases: PostgreSQL, SQL Server, MongoDB
- Tools & Services: Prisma ORM, Vercel, Git, GitHub, PyQT, Streamlit
- Design: UI/UX Design, Responsive Design, Modern CSS frameworks

KEY PROJECTS:
1. Uni-Sphere Platform (2024) - Real-world MVP for student and community engagement across universities using Next.js, TypeScript, Prisma, and PostgreSQL
2. UET Game Studio Portfolio (2024) - Modern portfolio showcasing 15+ WebGL Unity games with smooth animations
3. Past Paper Extractor (2023) - OCR-based web application using Streamlit and OpenCV for academic resource accessibility
4. Bulk Email Sender (2023) - Community tool with dynamic HTML/text email templates using Streamlit and Python
5. Nexus Code Editor (2022) - Custom Python-based editor with DSA integration using QT Creator
6. Honey Scraper (2022) - Scalable book metadata scraper handling 1M+ books using Python and BeautifulSoup
7. Annexxie Cafe Management System (2021) - Full-stack ASP.NET application with admin and user portals
8. Personal Portfolio (2021) - Previous portfolio, Clean, responsive website using HTML, CSS, JavaScript, and jQuery


Guide:
- Greet warmly ("Hi", "How are you?")
- Offer project info if asked
- Explain tech briefly
- Mention contact email reachkhalilhere@gmail.com
- Ask if more detail is needed

Sample:
"Hey! I’m here to share Khalil’s work. Want a quick look at his latest projects?"

Keep it creative, confident, helpful — like Khalil.`;

    const messagesWithSystem = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      })),
    ];

    // Try primary API key first, fallback to secondary on errors
    let completion: OpenAI.Chat.Completions.ChatCompletion;
    
    try {
      console.log("Attempting with primary API key...");
      completion = await groqPrimary.chat.completions.create({
        model: "llama3-70b-8192",
        messages: messagesWithSystem,
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      });
    } catch (primaryError: unknown) {
      const error = primaryError as { status?: number; message?: string };
      console.log("Primary API failed:", error.status, error.message);
      
      // If primary fails with 500/503, try secondary API key
      if (error.status === 500 || error.status === 503) {
        console.log("Trying secondary API key...");
        try {
          completion = await groqSecondary.chat.completions.create({
            model: "llama3-70b-8192",
            messages: messagesWithSystem,
            temperature: 0.7,
            max_tokens: 500,
            stream: false,
          });
          console.log("Secondary API succeeded!");
        } catch (secondaryError) {
          console.log("Secondary API also failed:", secondaryError);
          throw secondaryError; // Re-throw if both fail
        }
      } else {
        throw primaryError; // Re-throw if not a 500/503 error
      }
    }

    const responseMessage = completion.choices[0].message.content;

    // Return in AI SDK expected format
    return new Response(responseMessage, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error("Chatbot API Error:", error);
    return Response.json(
      { error: "Failed to generate response" }, 
      { status: 500 }
    );
  }
}