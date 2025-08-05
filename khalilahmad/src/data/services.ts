import React from 'react';
import {
  MonitorSmartphone,
  Layers3,
  Palette,
  DatabaseZap,
  Database
} from 'lucide-react';
import { Service, ServiceDetail } from '../models/service';

export const services: Service[] = [
  {
    id: '1',
    name: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces using modern JavaScript frameworks like React, Vue, or Angular.',
    icon: MonitorSmartphone,
    slug: 'frontend-development',
  },
  {
    id: '2',
    name: 'Full Stack Development',
    description: 'Developing a complete full stack scalable website with database integration and user friendly interface.',
    icon: Layers3,
    slug: 'full-stack-development',
  },
  {
    id: '3',
    name: 'UI/UX Design',
    description: 'Designing user-friendly interfaces and experiences that enhance usability and engagement.',
    icon: Palette,
    slug: 'ui-ux-design',
  },
  {
    id: '4',
    name: 'Database Development',
    description: 'Designing and implementing robust database solutions for optimal data management and performance.',
    icon: Database,
    slug: 'database-development',
  },
  {
    id: '5',
    name: 'Web Scraping',
    description: 'Extracting useful data from websites using tools like BeautifulSoup, Puppeteer, or Selenium.',
    icon: DatabaseZap,
    slug: 'web-scraping',
  },
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: '1',
    name: 'Frontend Development',
    slug: 'frontend-development',
    tagline: 'Crafting Beautiful, Responsive User Interfaces',
    description: 'Transform your ideas into stunning, interactive web applications that engage users and drive results.',
    detailedDescription: 'I specialize in creating modern, responsive, and performant frontend applications using cutting-edge technologies. From single-page applications to complex web platforms, I deliver pixel-perfect designs that work seamlessly across all devices and browsers.',
    icon: <MonitorSmartphone size={48} />,
    technologies: ['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'SCSS/SASS', 'Webpack', 'Vite'],
    features: [
      'Responsive Design for All Devices',
      'Modern JavaScript Frameworks',
      'Performance Optimization',
      'Cross-Browser Compatibility',
      'SEO-Friendly Architecture',
      'Interactive Animations',
      'Component-Based Development',
      'Progressive Web Apps (PWA)',
    ],
    process: [
      {
        step: 'Requirements Analysis',
        description: 'Understanding your vision, target audience, and technical requirements'
      },
      {
        step: 'Design Review',
        description: 'Analyzing designs and planning the component architecture'
      },
      {
        step: 'Development',
        description: 'Building responsive components with clean, maintainable code'
      },
      {
        step: 'Testing & Optimization',
        description: 'Cross-browser testing and performance optimization'
      },
      {
        step: 'Deployment & Support',
        description: 'Deploying to production and providing ongoing support'
      }
    ],
    packages: [
      {
        name: 'Basic',
        price: '$1,500 - $3,000',
        timeline: '2-3 weeks',
        features: [
          'Up to 5 responsive pages',
          'React.js or Vue.js development',
          'Mobile-first design',
          'Basic animations',
          'Cross-browser testing',
          '30 days support'
        ]
      },
      {
        name: 'Standard',
        price: '$3,000 - $6,000',
        timeline: '3-5 weeks',
        popular: true,
        features: [
          'Up to 10 responsive pages',
          'Next.js or advanced framework',
          'Advanced animations & interactions',
          'Performance optimization',
          'SEO implementation',
          'API integration',
          '60 days support'
        ]
      },
      {
        name: 'Premium',
        price: '$6,000 - $12,000',
        timeline: '5-8 weeks',
        features: [
          'Unlimited pages',
          'Complex web application',
          'Advanced state management',
          'Real-time features',
          'Progressive Web App',
          'Advanced testing suite',
          '90 days support & maintenance'
        ]
      }
    ],
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce frontend with shopping cart, product filters, and checkout flow',
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion']
      },
      {
        title: 'Portfolio Website',
        description: 'Responsive portfolio with smooth animations and dynamic content',
        technologies: ['Next.js', 'TypeScript', 'SCSS', 'Three.js']
      },
      {
        title: 'Dashboard Application',
        description: 'Complex admin dashboard with data visualization and real-time updates',
        technologies: ['React', 'Redux', 'Chart.js', 'Material-UI']
      }
    ],
    faq: [
      {
        question: 'What frontend frameworks do you work with?',
        answer: 'I primarily work with React.js, Next.js, and Vue.js. I also have experience with Angular and can adapt to your preferred technology stack.'
      },
      {
        question: 'Do you provide responsive design?',
        answer: 'Yes, all my frontend development projects are mobile-first and fully responsive, ensuring perfect functionality across all devices and screen sizes.'
      },
      {
        question: 'Can you convert designs from Figma/Adobe XD?',
        answer: 'Absolutely! I can convert designs from Figma, Adobe XD, Sketch, or any other design tool into pixel-perfect, functional code.'
      },
      {
        question: 'Do you handle browser compatibility?',
        answer: 'Yes, I ensure cross-browser compatibility and test on all major browsers including Chrome, Firefox, Safari, and Edge.'
      }
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        text: 'Khalil delivered an outstanding frontend for our SaaS platform. The code quality and attention to detail were exceptional.',
        rating: 5
      },
      {
        name: 'Mike Chen',
        company: 'Creative Agency',
        text: 'Working with Khalil was a pleasure. He transformed our designs into a beautiful, responsive website that exceeded our expectations.',
        rating: 5
      }
    ]
  },
  {
    id: '2',
    name: 'Full Stack Development',
    slug: 'full-stack-development',
    tagline: 'Complete Web Solutions from Database to User Interface',
    description: 'End-to-end web development solutions that cover everything from backend architecture to stunning frontend experiences.',
    detailedDescription: 'I provide comprehensive full-stack development services, building scalable web applications from the ground up. With expertise in both frontend and backend technologies, I create seamless, integrated solutions that meet your business needs and scale with your growth.',
    icon: <Layers3 size={48} />,
    technologies: ['Node.js', 'Express.js', 'React.js', 'Next.js', 'MongoDB', 'PostgreSQL', 'TypeScript', 'GraphQL', 'REST APIs', 'Docker', 'AWS/Vercel'],
    features: [
      'End-to-End Development',
      'Scalable Architecture',
      'RESTful & GraphQL APIs',
      'Real-time Applications',
      'Database Design & Optimization',
      'Authentication & Security',
      'Cloud Deployment',
      'CI/CD Integration',
    ],
    process: [
      {
        step: 'Requirements & Planning',
        description: 'Understanding business requirements and planning the technical architecture'
      },
      {
        step: 'Database Design',
        description: 'Designing efficient database schema and relationships'
      },
      {
        step: 'Backend Development',
        description: 'Building robust APIs, authentication, and business logic'
      },
      {
        step: 'Frontend Integration',
        description: 'Creating responsive UI and connecting to backend services'
      },
      {
        step: 'Testing & Deployment',
        description: 'Comprehensive testing and deployment to production'
      }
    ],
    packages: [
      {
        name: 'Startup',
        price: '$3,000 - $8,000',
        timeline: '4-6 weeks',
        features: [
          'CRUD web application',
          'User authentication',
          'Responsive frontend',
          'Database integration',
          'Basic admin panel',
          'Cloud deployment',
          '60 days support'
        ]
      },
      {
        name: 'Business',
        price: '$8,000 - $20,000',
        timeline: '6-10 weeks',
        popular: true,
        features: [
          'Complex web application',
          'Advanced user management',
          'Payment integration',
          'Real-time features',
          'Advanced admin dashboard',
          'API documentation',
          'Performance optimization',
          '90 days support'
        ]
      },
      {
        name: 'Enterprise',
        price: '$20,000 - $50,000',
        timeline: '10-16 weeks',
        features: [
          'Large-scale application',
          'Microservices architecture',
          'Advanced security features',
          'Multi-tenant support',
          'Advanced analytics',
          'Third-party integrations',
          'DevOps & CI/CD setup',
          '6 months support'
        ]
      }
    ],
    portfolio: [
      {
        title: 'Social Media Platform',
        description: 'Full-featured social platform with real-time messaging, posts, and user interactions',
        technologies: ['Node.js', 'React', 'MongoDB', 'Socket.io', 'Redis']
      },
      {
        title: 'E-learning Platform',
        description: 'Complete learning management system with video streaming and progress tracking',
        technologies: ['Next.js', 'Express.js', 'PostgreSQL', 'Stripe', 'AWS S3']
      },
      {
        title: 'Task Management App',
        description: 'Collaborative project management tool with real-time updates and team features',
        technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Docker']
      }
    ],
    faq: [
      {
        question: 'What technology stack do you use?',
        answer: 'I primarily use the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js for full-stack applications. I can also work with other stacks based on your requirements.'
      },
      {
        question: 'Do you handle deployment and hosting?',
        answer: 'Yes, I can deploy your application to various platforms including AWS, Vercel, Heroku, or your preferred hosting provider.'
      },
      {
        question: 'Can you integrate third-party services?',
        answer: 'Absolutely! I can integrate payment gateways, email services, social media APIs, analytics tools, and any other third-party services you need.'
      },
      {
        question: 'Do you provide ongoing maintenance?',
        answer: 'Yes, I offer maintenance packages that include bug fixes, updates, feature additions, and performance monitoring.'
      }
    ],
    testimonials: [
      {
        name: 'David Rodriguez',
        company: 'StartupXYZ',
        text: 'Khalil built our entire platform from scratch. His full-stack expertise saved us months of development time.',
        rating: 5
      },
      {
        name: 'Emily Watson',
        company: 'FinTech Solutions',
        text: 'The web application Khalil developed handles thousands of users seamlessly. Excellent architecture and performance.',
        rating: 5
      }
    ]
  },
  {
    id: '3',
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    tagline: 'Designing Experiences That Users Love',
    description: 'Creating intuitive, beautiful, and user-centered designs that enhance engagement and drive conversions.',
    detailedDescription: 'I combine creativity with data-driven insights to design user interfaces and experiences that not only look stunning but also solve real user problems. From wireframes to high-fidelity prototypes, I create designs that delight users and achieve business goals.',
    icon: <Palette size={48} />,
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Principle', 'InVision', 'Framer', 'Miro'],
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design & Branding',
      'Responsive Design Systems',
      'Usability Testing',
      'Design Handoff',
      'Design System Creation',
      'Accessibility Compliance',
    ],
    process: [
      {
        step: 'Research & Discovery',
        description: 'Understanding users, business goals, and market requirements'
      },
      {
        step: 'Wireframing',
        description: 'Creating low-fidelity wireframes to establish layout and functionality'
      },
      {
        step: 'Visual Design',
        description: 'Developing high-fidelity designs with colors, typography, and imagery'
      },
      {
        step: 'Prototyping',
        description: 'Building interactive prototypes to test user flows'
      },
      {
        step: 'Testing & Iteration',
        description: 'User testing and refining designs based on feedback'
      }
    ],
    packages: [
      {
        name: 'Basic',
        price: '$1,000 - $3,000',
        timeline: '1-2 weeks',
        features: [
          'Up to 5 page designs',
          'Wireframes & mockups',
          'Basic prototype',
          'Design system basics',
          'Mobile responsive design',
          '2 revision rounds'
        ]
      },
      {
        name: 'Professional',
        price: '$3,000 - $8,000',
        timeline: '2-4 weeks',
        popular: true,
        features: [
          'Up to 15 page designs',
          'User research & personas',
          'Interactive prototypes',
          'Complete design system',
          'Usability testing',
          'Developer handoff',
          '4 revision rounds'
        ]
      },
      {
        name: 'Enterprise',
        price: '$8,000 - $20,000',
        timeline: '4-8 weeks',
        features: [
          'Unlimited page designs',
          'Comprehensive user research',
          'Advanced prototyping',
          'Brand guidelines',
          'A/B testing designs',
          'Design documentation',
          'Ongoing design support',
          'Unlimited revisions'
        ]
      }
    ],
    portfolio: [
      {
        title: 'Mobile Banking App',
        description: 'Complete UX/UI design for a modern banking application with intuitive navigation',
        technologies: ['Figma', 'Principle', 'User Research', 'Prototyping']
      },
      {
        title: 'E-commerce Website',
        description: 'User-centered design for an online store with focus on conversion optimization',
        technologies: ['Adobe XD', 'InVision', 'Usability Testing', 'A/B Testing']
      },
      {
        title: 'SaaS Dashboard',
        description: 'Complex data visualization dashboard with clean, intuitive interface design',
        technologies: ['Figma', 'Design System', 'Data Visualization', 'Responsive Design']
      }
    ],
    faq: [
      {
        question: 'What design tools do you use?',
        answer: 'I primarily use Figma for UI/UX design, but I am also proficient in Adobe XD, Sketch, and other design tools based on your preference.'
      },
      {
        question: 'Do you conduct user research?',
        answer: 'Yes, I can conduct user interviews, surveys, and usability testing to inform design decisions and ensure user-centered solutions.'
      },
      {
        question: 'Can you work with existing brand guidelines?',
        answer: 'Absolutely! I can work within your existing brand guidelines or help develop new ones if needed.'
      },
      {
        question: 'Do you provide design systems?',
        answer: 'Yes, I create comprehensive design systems with reusable components, style guides, and documentation for consistent design implementation.'
      }
    ],
    testimonials: [
      {
        name: 'Jennifer Lee',
        company: 'Design Studio',
        text: 'Khalil\'s design work is exceptional. He created a beautiful, user-friendly interface that our users absolutely love.',
        rating: 5
      },
      {
        name: 'Alex Thompson',
        company: 'E-commerce Brand',
        text: 'The UI/UX design significantly improved our conversion rates. Khalil truly understands user psychology.',
        rating: 5
      }
    ]
  },
  {
    id: '4',
    name: 'Database Development',
    slug: 'database-development',
    tagline: 'Robust Database Solutions for Your Applications',
    description: 'Designing and implementing efficient, scalable database architectures that power your applications.',
    detailedDescription: 'I specialize in creating robust database solutions that handle your data efficiently and scale with your business growth. From schema design to performance optimization, I ensure your data infrastructure is reliable, secure, and performant.',
    icon: <Database size={48} />,
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Prisma', 'Mongoose', 'SQL', 'NoSQL', 'Database Design', 'Indexing'],
    features: [
      'Database Schema Design',
      'Performance Optimization',
      'Data Migration Services',
      'Backup & Recovery Solutions',
      'Security Implementation',
      'Indexing Strategies',
      'Query Optimization',
      'Database Monitoring',
    ],
    process: [
      {
        step: 'Requirements Analysis',
        description: 'Understanding data requirements and access patterns'
      },
      {
        step: 'Schema Design',
        description: 'Designing optimal database structure and relationships'
      },
      {
        step: 'Implementation',
        description: 'Setting up database with proper configurations'
      },
      {
        step: 'Optimization',
        description: 'Performance tuning and query optimization'
      },
      {
        step: 'Security & Backup',
        description: 'Implementing security measures and backup strategies'
      }
    ],
    packages: [
      {
        name: 'Basic',
        price: '$800 - $2,000',
        timeline: '1-2 weeks',
        features: [
          'Simple database design',
          'Up to 10 tables/collections',
          'Basic indexing',
          'Data validation',
          'Backup strategy',
          '30 days support'
        ]
      },
      {
        name: 'Standard',
        price: '$2,000 - $5,000',
        timeline: '2-4 weeks',
        popular: true,
        features: [
          'Complex database design',
          'Unlimited tables/collections',
          'Advanced indexing',
          'Performance optimization',
          'Migration scripts',
          'Monitoring setup',
          '60 days support'
        ]
      },
      {
        name: 'Enterprise',
        price: '$5,000 - $15,000',
        timeline: '3-6 weeks',
        features: [
          'Multi-database architecture',
          'Replication & sharding',
          'Advanced security',
          'Custom backup solutions',
          'Performance monitoring',
          'Documentation',
          '90 days support'
        ]
      }
    ],
    portfolio: [
      {
        title: 'E-commerce Database',
        description: 'Scalable database design for high-traffic e-commerce platform with inventory management',
        technologies: ['PostgreSQL', 'Redis', 'Indexing', 'Partitioning']
      },
      {
        title: 'Analytics Platform',
        description: 'High-performance database for real-time analytics and reporting',
        technologies: ['MongoDB', 'Aggregation', 'Time-series', 'Sharding']
      },
      {
        title: 'User Management System',
        description: 'Secure database design for user authentication and authorization',
        technologies: ['MySQL', 'Encryption', 'Indexing', 'Normalization']
      }
    ],
    faq: [
      {
        question: 'Which databases do you work with?',
        answer: 'I work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases, choosing the best fit for your specific requirements.'
      },
      {
        question: 'Can you migrate existing databases?',
        answer: 'Yes, I provide database migration services with minimal downtime and data integrity assurance.'
      },
      {
        question: 'Do you handle database optimization?',
        answer: 'Absolutely! I optimize database performance through proper indexing, query optimization, and schema refinement.'
      },
      {
        question: 'What about database security?',
        answer: 'I implement comprehensive security measures including encryption, access control, and regular security audits.'
      }
    ],
    testimonials: [
      {
        name: 'Robert Kim',
        company: 'Data Corp',
        text: 'Khalil optimized our database performance by 300%. Our queries are now lightning fast!',
        rating: 5
      },
      {
        name: 'Lisa Martinez',
        company: 'Analytics Pro',
        text: 'The database architecture Khalil designed handles millions of records seamlessly. Excellent work!',
        rating: 5
      }
    ]
  },
  {
    id: '5',
    name: 'Web Scraping',
    slug: 'web-scraping',
    tagline: 'Extract Valuable Data from Any Website',
    description: 'Automated data extraction solutions that gather the information you need efficiently and reliably.',
    detailedDescription: 'I develop custom web scraping solutions that extract valuable data from websites automatically. Whether you need product information, market research data, or competitive intelligence, I create robust scraping systems that handle dynamic content, anti-bot measures, and deliver clean, structured data.',
    icon: <DatabaseZap size={48} />,
    technologies: ['Python', 'BeautifulSoup', 'Scrapy', 'Selenium', 'Puppeteer', 'Node.js', 'Requests', 'Pandas', 'API Integration'],
    features: [
      'Dynamic Content Scraping',
      'Anti-Bot Bypass',
      'Data Cleaning & Formatting',
      'Scheduled Automation',
      'API Integration',
      'Proxy Management',
      'Error Handling',
      'Data Export Options',
    ],
    process: [
      {
        step: 'Target Analysis',
        description: 'Analyzing target websites and identifying data extraction requirements'
      },
      {
        step: 'Tool Selection',
        description: 'Choosing the best scraping tools and techniques for each target'
      },
      {
        step: 'Development',
        description: 'Building robust scraping scripts with error handling'
      },
      {
        step: 'Testing & Optimization',
        description: 'Testing scrapers and optimizing for reliability and performance'
      },
      {
        step: 'Deployment & Monitoring',
        description: 'Deploying automation and setting up monitoring systems'
      }
    ],
    packages: [
      {
        name: 'Basic',
        price: '$500 - $1,500',
        timeline: '3-7 days',
        features: [
          'Single website scraping',
          'Static content extraction',
          'Basic data cleaning',
          'CSV/JSON export',
          'Simple automation',
          '30 days support'
        ]
      },
      {
        name: 'Professional',
        price: '$1,500 - $5,000',
        timeline: '1-2 weeks',
        popular: true,
        features: [
          'Multiple websites',
          'Dynamic content handling',
          'Advanced data processing',
          'Database integration',
          'Scheduled automation',
          'Error monitoring',
          '60 days support'
        ]
      },
      {
        name: 'Enterprise',
        price: '$5,000 - $15,000',
        timeline: '2-4 weeks',
        features: [
          'Large-scale scraping',
          'Anti-bot bypass systems',
          'Real-time data processing',
          'API development',
          'Cloud deployment',
          'Advanced monitoring',
          '90 days support'
        ]
      }
    ],
    portfolio: [
      {
        title: 'E-commerce Price Monitor',
        description: 'Automated system to track product prices across multiple e-commerce platforms',
        technologies: ['Python', 'Scrapy', 'PostgreSQL', 'Celery', 'Redis']
      },
      {
        title: 'Real Estate Data Extraction',
        description: 'Comprehensive property data scraping from real estate websites',
        technologies: ['Selenium', 'BeautifulSoup', 'Pandas', 'MongoDB']
      },
      {
        title: 'Social Media Analytics',
        description: 'Social media data extraction for sentiment analysis and trend monitoring',
        technologies: ['Puppeteer', 'Node.js', 'API Integration', 'Data Processing']
      }
    ],
    faq: [
      {
        question: 'Is web scraping legal?',
        answer: 'Web scraping legality depends on the website\'s terms of service and the type of data being scraped. I ensure compliance with legal requirements and best practices.'
      },
      {
        question: 'Can you scrape dynamic websites?',
        answer: 'Yes, I use tools like Selenium and Puppeteer to scrape websites with JavaScript-rendered content and dynamic elements.'
      },
      {
        question: 'How do you handle anti-bot measures?',
        answer: 'I implement various techniques including proxy rotation, user agent randomization, and request throttling to bypass anti-bot systems ethically.'
      },
      {
        question: 'What data formats do you provide?',
        answer: 'I can deliver data in various formats including CSV, JSON, Excel, XML, or directly to your database through APIs.'
      }
    ],
    testimonials: [
      {
        name: 'Mark Wilson',
        company: 'Market Research Inc.',
        text: 'Khalil\'s web scraping solution saved us hundreds of hours of manual data collection. Highly recommended!',
        rating: 5
      },
      {
        name: 'Anna Chen',
        company: 'Price Comparison Site',
        text: 'The scraping system handles thousands of products daily with 99% accuracy. Excellent automation!',
        rating: 5
      }
    ]
  }
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return serviceDetails.find(service => service.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return serviceDetails.map(service => service.slug);
};
