import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "uni-sphere",
    title: "Uni-Sphere Platform",
    description: "A real-world MVP streamlining student and community engagement across universities.",
    longDescription:
      "Led the end-to-end development of a scalable platform enabling campus communities to interact, collaborate, and manage their operations. Spearheaded sprint planning and implemented CRUD operations across community modules, resulting in a user-friendly experience tested by 5+ demo communities.",
    image: "/Projects/unisphere.png",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "ShadCN", "Prisma", "PostgreSQL"],
    techStack: {
      frontend: ["Next.js", "Tailwind CSS", "TypeScript", "ShadCN"],
      backend: ["Next.js API Routes", "Prisma ORM"],
      database: ["PostgreSQL"],
      tools: ["Vercel", "Git"]
    },
    links: {
      live: "https://uni-sphere-ashy.vercel.app/login",
      github: "https://github.com/OG-GY/Uni-Sphere.git"
    },
    features: [
      "Multi-community support",
      "Community creation and management",
      "Collaboration features",
      "Sprint-driven agile development",
      "Clean and accessible UI"
    ],
    status: "completed" ,
    year: 2025,
    category: "Web Platform",
    color: "#FF5733"
  },
  {
    id: "past-paper-extractor",
    title: "Past Paper Extractor",
    description: "An OCR-based web application for retrieving and storing academic past papers.",
    longDescription:
      "Engineered an OCR-driven solution using Streamlit and OpenCV that simplifies access to academic resources for students. Allowed categorization by semester, teacher, subject, and paper type, solving a recurring student pain point for past paper accessibility.",
    image: "/Projects/pastpaper.png",
    technologies: ["Streamlit", "Python", "OpenCV"],
    techStack: {
      frontend: ["Streamlit"],
      backend: ["Python", "OpenCV"],
      tools: ["GitHub"]
    },
    links: {
      live:"https://github.com/OG-GY/PastPaperExtractor"
    },
    status: "prototype" ,
    features: [
      "Image-to-text OCR",
      "Searchable past paper database",
      "Categorization by semester, subject, teacher"
    ],
    year: 2024,
    category: "OCR Tool",
    color: "#4B8BBE"
  },
  {
    id: "bulk-email-sender",
    title: "Bulk Email Sender",
    description: "A tool to automate HTML and text-based email campaigns for communities.",
    longDescription:
      "Developed an efficient community tool with dynamic HTML/text email templates, cutting email campaign prep time by 3+ hours weekly. Supported sending targeted communication to 50+ members with reusable templates.",
    image: "/Projects/bulkemail.png",
    technologies: ["Streamlit", "Python"],
    techStack: {
      frontend: ["Streamlit"],
      backend: ["Python"],
      tools: ["SMTP", "GitHub"]
    },
    links: {
      live: "https://bulk-email-sender.vercel.app",
      github: "https://github.com/OG-GY/MultipleEmailsSender"
    },
    features: [
      "Custom email templates",
      "Bulk sending functionality",
      "HTML and plain-text support"
    ],
    status: "completed" ,
    year: 2024,
    category: "Utility",
    color: "#28B463"
  },
  {
    id: "uet-portfolio",
    title: "UET Game Studio Portfolio",
    description: "A polished portfolio site for UET Game Studio showcasing student-built games.",
    longDescription:
      "Built and deployed a modern portfolio for UET Game Studio, showcasing 15+ WebGL Unity games. Integrated game cards with smooth animations, attracting visibility and cross-device compatibility. Continues to evolve with added game support and frontend enhancements.",
    image: "/Projects/ugs.png",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "AnimataUI", "ShadCN"],
    techStack: {
      frontend: ["Next.js", "Tailwind CSS", "TypeScript", "AnimataUI", "ShadCN"],
      backend: [],
      tools: ["Vercel", "Git"]
    },
    links: {
      live: "https://uetgamstudio.com",
    },
    features: [
      "Game showcase",
      "Responsive design",
      "Smooth page transitions",
      "Unity WebGL support"
    ],
    status: "completed" ,
    year: 2024,
    category: "Portfolio",
    color: "#AF7AC5"
  },
  {
    id: "portal-uet-portfolio",
    title: "Gaming Portal for UET Game Studio",
    description: "A polished portfolio site for UET Game Studio showcasing student-built games.",
    longDescription:
      "Built and deployed a modern portfolio for UET Game Studio, showcasing 15+ WebGL Unity games. Integrated game cards with smooth animations, attracting visibility and cross-device compatibility. Continues to evolve with added game support and frontend enhancements.",
    image: "/Projects/pugs.png",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "AnimataUI", "ShadCN"],
    techStack: {
      frontend: ["Next.js", "Tailwind CSS", "TypeScript", "AnimataUI", "ShadCN"],
      backend: [],
      tools: ["Vercel", "Git"]
    },
    links: {
      live: "https://portfolio.uetgamstudio.com",
    },
    features: [
      "Game showcase",
      "Responsive design",
      "Smooth page transitions",
      "Unity WebGL support"
    ],
    status: "completed" ,
    year: 2024,
    category: "Portfolio",
    color: "#AF7AC5"
  },
  {
    id: "nexus-editor",
    title: "Nexus Code Editor",
    description: "A lightweight code editor enhanced with Data Structure & Algorithm modules.",
    longDescription:
      "Architected a custom Python-based editor with core editing features like undo/redo, search, syntax highlighting, and integrated DSA operations to reinforce programming learning. Built using QT Creator and designed for students tackling algorithm problems.",
    image: "/Projects/nexuscode.png",
    technologies: ["Python", "QT Creator"],
    techStack: {
      frontend: ["QT UI"],
      backend: ["Python"],
      tools: ["PyQT5"]
    },
    links: {
      github: "https://github.com/OG-GY/Nexus-Editor"
    },
    features: [
      "Syntax highlighting",
      "Undo and redo actions",
      "DSA-integrated examples"
    ],
    status: "completed" ,
    year: 2024,
    category: "Desktop App",
    color: "#F1C40F"
  },
  {
    id: "honey-scraper",
    title: "Honey Scraper - 1 Million Books",
    description: "A scalable book metadata scraper using multi-threaded scraping pipelines.",
    longDescription:
      "Automated the extraction of metadata for over 1 million books using Python, BeautifulSoup, and PyQT. Reduced manual effort by over 14 hours while boosting team productivity by 40% via parallelized scraping.",
    image: "/Projects/honeyscrapper.png",
    technologies: ["Python", "BeautifulSoup", "PyQT5"],
    techStack: {
      backend: ["Python", "BeautifulSoup"],
      tools: ["PyQT5", "Threads"]
    },
    links: {
      github: "https://github.com/OG-GY/Honey-Scraper"
    },
    features: [
      "Multi-threaded scraping",
      "Metadata parsing",
      "Error handling for large-scale requests"
    ],
    status: "completed" ,
    year: 2023,
    category: "Scraper",
    color: "#2E86C1"
  },
  {
    id: "annexxie-cafe",
    title: "Annexxie Cafe Management System",
    description: "An ASP.NET-based management system for online food orders and user tracking.",
    longDescription:
      "Built an end-to-end cafe management system with both user-facing and admin-facing modules. Managed orders, menus, user data, and implemented SQL-based tracking for operations efficiency.",
    image: "/Projects/caffemanager.png",
    technologies: ["ASP.NET Core", "Razor Pages", "C#", "SQL"],
    techStack: {
      frontend: ["Razor Pages"],
      backend: ["C#", "ASP.NET Core"],
      database: ["SQL Server"],
      tools: ["SSMS"]
    },
    links: {
      github: "https://github.com/OG-GY/Annexxie"
    },
    features: [
      "Admin and User portals",
      "Order and menu handling",
      "Secure database schema"
    ],
    status: "completed" ,
    year: 2021,
    category: "Management System",
    color: "#F39C12"
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio (Khalil Ahmad)",
    description: "A personal web portfolio highlighting projects and professional journey.",
    longDescription:
      "Crafted a clean, multi-page portfolio website from scratch using HTML, CSS, JS, and JQuery. Highlighted community contributions, major projects, and embedded GitHub/LinkedIn integrations to build personal branding.",
    image: "/images/personal-portfolio.png",
    technologies: ["HTML", "CSS", "JavaScript", "JQuery"],
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript", "JQuery"]
    },
    links: {
      github: "https://github.com/OG-GY/Khalil-Ahmad"
    },
    features: [
      "Multi-page layout",
      "Interactive project sections",
      "Responsive design"
    ],
    status: "completed" ,
    year: 2021,
    category: "Portfolio",
    color: "#E74C3C"
  }
] satisfies Project[];
