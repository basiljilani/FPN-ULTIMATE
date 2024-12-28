import { LucideIcon, Landmark, Brain, FileText } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Author {
  name: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: Author;
  content: string;
}

export const categories: Category[] = [
  {
    id: 'fintech',
    name: 'FinTech',
    icon: Landmark
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    icon: Brain
  },
  {
    id: 'research',
    name: 'Research / White Papers',
    icon: FileText
  }
];

export const articles: Article[] = [
  // FinTech Articles
  {
    id: 'open-banking-revolution',
    title: 'Open Banking: Revolutionizing Financial Services',
    excerpt: 'How open banking APIs are creating new opportunities for financial innovation and improved customer experiences.',
    date: '2024-12-18',
    readTime: '6 min read',
    category: 'fintech',
    author: {
      name: 'Michael Ross',
      role: 'Banking Innovation Lead'
    },
    content: ''
  },
  {
    id: 'defi-lending-platforms',
    title: 'DeFi Lending Platforms: A New Era of Credit',
    excerpt: 'Exploring how decentralized finance is transforming traditional lending models with smart contracts and tokenization.',
    date: '2024-12-15',
    readTime: '7 min read',
    category: 'fintech',
    author: {
      name: 'Alex Wong',
      role: 'DeFi Researcher'
    },
    content: ''
  },
  {
    id: 'regtech-solutions',
    title: 'RegTech Solutions for Financial Compliance',
    excerpt: 'How regulatory technology is helping financial institutions maintain compliance and reduce operational costs.',
    date: '2024-12-12',
    readTime: '5 min read',
    category: 'fintech',
    author: {
      name: 'Emma Thompson',
      role: 'Compliance Expert'
    },
    content: ''
  },
  // Additional FinTech Articles
  {
    id: 'digital-banking-future',
    title: 'The Future of Digital Banking: 2025 and Beyond',
    excerpt: 'Exploring upcoming trends in digital banking, from AI-powered personal finance to embedded banking services.',
    date: '2024-12-11',
    readTime: '7 min read',
    category: 'fintech',
    author: {
      name: 'Jennifer Lee',
      role: 'Digital Banking Strategist'
    },
    content: ''
  },
  {
    id: 'payment-innovation',
    title: 'Payment Innovation: The Rise of Alternative Payment Methods',
    excerpt: 'How new payment technologies are reshaping the way we think about money transfers and transactions.',
    date: '2024-12-09',
    readTime: '6 min read',
    category: 'fintech',
    author: {
      name: 'Marcus Brown',
      role: 'Payment Systems Expert'
    },
    content: ''
  },
  {
    id: 'fintech-security',
    title: 'Cybersecurity in FinTech: Protecting Digital Assets',
    excerpt: 'Essential security measures and best practices for protecting financial technology infrastructure.',
    date: '2024-12-07',
    readTime: '8 min read',
    category: 'fintech',
    author: {
      name: 'Diana Chen',
      role: 'Security Architect'
    },
    content: ''
  },
  // AI/ML Articles
  {
    id: 'ai-fraud-detection',
    title: 'AI-Powered Fraud Detection Systems',
    excerpt: 'Advanced machine learning algorithms are revolutionizing how financial institutions detect and prevent fraud.',
    date: '2024-12-20',
    readTime: '8 min read',
    category: 'ai-ml',
    author: {
      name: 'David Chen',
      role: 'AI Security Specialist'
    },
    content: ''
  },
  {
    id: 'nlp-financial-analysis',
    title: 'NLP in Financial Market Analysis',
    excerpt: 'How natural language processing is transforming market sentiment analysis and trading strategies.',
    date: '2024-12-17',
    readTime: '6 min read',
    category: 'ai-ml',
    author: {
      name: 'Sarah Johnson',
      role: 'Quantitative Analyst'
    },
    content: ''
  },
  {
    id: 'ml-credit-scoring',
    title: 'Machine Learning in Credit Scoring',
    excerpt: 'Innovative approaches to credit risk assessment using advanced machine learning models.',
    date: '2024-12-14',
    readTime: '7 min read',
    category: 'ai-ml',
    author: {
      name: 'James Wilson',
      role: 'Risk Analytics Lead'
    },
    content: ''
  },
  // Additional AI/ML Articles
  {
    id: 'ai-risk-management',
    title: 'AI in Risk Management and Compliance',
    excerpt: 'How artificial intelligence is transforming risk assessment and regulatory compliance in financial institutions.',
    date: '2024-12-10',
    readTime: '7 min read',
    category: 'ai-ml',
    author: {
      name: 'Dr. Michael Zhang',
      role: 'AI Risk Specialist'
    },
    content: ''
  },
  {
    id: 'ml-market-prediction',
    title: 'Machine Learning in Market Prediction',
    excerpt: 'Advanced ML techniques being used to analyze and predict market trends with unprecedented accuracy.',
    date: '2024-12-08',
    readTime: '9 min read',
    category: 'ai-ml',
    author: {
      name: 'Dr. Rachel Anderson',
      role: 'ML Research Lead'
    },
    content: ''
  },
  {
    id: 'ai-personal-finance',
    title: 'AI-Powered Personal Finance Management',
    excerpt: 'How AI is revolutionizing personal finance through smart budgeting and investment recommendations.',
    date: '2024-12-06',
    readTime: '6 min read',
    category: 'ai-ml',
    author: {
      name: 'Sophie Taylor',
      role: 'AI Product Manager'
    },
    content: ''
  },
  // Research/White Papers
  {
    id: 'blockchain-scalability',
    title: 'Blockchain Scalability Solutions',
    excerpt: 'A comprehensive analysis of Layer 2 solutions and their impact on blockchain transaction throughput.',
    date: '2024-12-19',
    readTime: '10 min read',
    category: 'research',
    author: {
      name: 'Dr. Robert Kim',
      role: 'Blockchain Researcher'
    },
    content: ''
  },
  {
    id: 'quantum-finance',
    title: 'Quantum Computing in Finance',
    excerpt: 'Exploring the potential applications and implications of quantum computing in financial services.',
    date: '2024-12-16',
    readTime: '9 min read',
    category: 'research',
    author: {
      name: 'Dr. Lisa Zhang',
      role: 'Quantum Computing Scientist'
    },
    content: ''
  },
  {
    id: 'sustainable-fintech',
    title: 'Sustainable FinTech: ESG Integration',
    excerpt: 'Research on how financial technology can drive sustainable finance and ESG investing.',
    date: '2024-12-13',
    readTime: '8 min read',
    category: 'research',
    author: {
      name: 'Dr. Maria Garcia',
      role: 'ESG Research Lead'
    },
    content: ''
  },
  // Additional Research/White Papers
  {
    id: 'defi-regulation',
    title: 'DeFi Regulation: A Framework for the Future',
    excerpt: 'Comprehensive analysis of regulatory approaches to decentralized finance across different jurisdictions.',
    date: '2024-12-11',
    readTime: '12 min read',
    category: 'research',
    author: {
      name: 'Dr. Andrew Mitchell',
      role: 'Regulatory Research Lead'
    },
    content: ''
  },
  {
    id: 'financial-inclusion',
    title: 'Financial Inclusion in the Digital Age',
    excerpt: 'Research on how digital financial services are bridging the gap in underserved communities.',
    date: '2024-12-09',
    readTime: '11 min read',
    category: 'research',
    author: {
      name: 'Dr. Elena Rodriguez',
      role: 'Financial Inclusion Researcher'
    },
    content: ''
  },
  {
    id: 'blockchain-infrastructure',
    title: 'The Future of Financial Infrastructure: Blockchain Integration',
    excerpt: 'Analysis of blockchain technology\'s role in reshaping financial market infrastructure.',
    date: '2024-12-07',
    readTime: '13 min read',
    category: 'research',
    author: {
      name: 'Dr. Kevin Park',
      role: 'Blockchain Research Director'
    },
    content: ''
  }
];
