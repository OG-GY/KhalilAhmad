import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "@/app/providers";
import ClickSpark from "@/components/ui/ClickSpark";
import PortfolioChatbot from "@/components/Chatbot/custom-chatbot";
// import LenisProvider from "./providers/lenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khalil Ahmad - Full Stack Developer & UI/UX Designer",
  description:
    "Professional full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Creating beautiful, responsive applications with exceptional user experiences.",
  keywords:
    "full stack developer, web developer, React, Next.js, Node.js, UI/UX design, frontend, backend, JavaScript, TypeScript",
  authors: [{ name: "Khalil Ahmad" }],
  creator: "Khalil Ahmad",
  publisher: "Khalil Ahmad",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Khalil Ahmad - Full Stack Developer & UI/UX Designer",
    description:
      "Professional full-stack developer creating beautiful, responsive web applications",
    siteName: "Khalil Ahmad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalil Ahmad - Full Stack Developer",
    description:
      "Professional full-stack developer creating beautiful, responsive web applications",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <div className="min-h-screen bg-zinc-950">
              <ClickSpark
                sparkColor="#FEA600"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                {/* <LenisProvider> */}
                  {children}

                {/* </LenisProvider> */}
              </ClickSpark>
              <PortfolioChatbot />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
