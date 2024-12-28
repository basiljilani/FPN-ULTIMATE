import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Landmark, 
  Brain, 
  FileText, 
  Shield, 
  Coins, 
  Wallet, 
  CreditCard, 
  PieChart, 
  LineChart, 
  BarChart, 
  DollarSign, 
  Bitcoin, 
  Building, 
  Network 
} from 'lucide-react';
import { API_URL } from '../config/apiConfig';
import axios from 'axios';

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
}

interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string | null;
}

const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'All', icon: null },
  { id: 'fintech', name: 'FinTech', icon: 'Landmark' },
  { id: 'ai-ml', name: 'AI / ML', icon: 'Brain' },
  { id: 'research', name: 'Research / White Papers', icon: 'FileText' },
];

const ICON_COMPONENTS = {
  Landmark,
  Brain,
  FileText,
  Shield,
  Coins,
  Wallet,
  CreditCard,
  PieChart,
  LineChart,
  BarChart,
  DollarSign,
  Bitcoin,
  Building,
  Network
};

const IconComponent = ({ iconName }: { iconName: string | null }) => {
  if (!iconName || !ICON_COMPONENTS[iconName as keyof typeof ICON_COMPONENTS]) return null;
  const Icon = ICON_COMPONENTS[iconName as keyof typeof ICON_COMPONENTS];
  return <Icon className="w-4 h-4" />;
};

const Insights: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [additionalCategories, setAdditionalCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchAdditionalCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      setArticles(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load articles');
      setLoading(false);
      console.error('Error fetching articles:', err);
    }
  };

  const fetchAdditionalCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setAdditionalCategories(response.data);
    } catch (err) {
      console.error('Error fetching additional categories:', err);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17]">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Financial Insights & Analysis
          </h1>
          <p className="text-xl text-gray-400 text-center mb-12">
            Expert analysis, market trends, and strategic insights to inform your financial decisions
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-12 bg-[#1A1F2E]/60 rounded-lg text-white placeholder-gray-400 outline-none"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {/* Default Categories */}
            {DEFAULT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all
                  ${selectedCategory === category.id 
                    ? 'bg-[#4763E4] text-white' 
                    : 'bg-[#1A1F2E] text-gray-400 hover:bg-[#2A2F3E]'}`}
              >
                {category.icon && <IconComponent iconName={category.icon} />}
                {category.name}
              </button>
            ))}

            {/* Additional Categories from API */}
            {additionalCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all
                  ${selectedCategory === category.id 
                    ? 'bg-[#4763E4] text-white' 
                    : 'bg-[#1A1F2E] text-gray-400 hover:bg-[#2A2F3E]'}`}
              >
                {category.icon && <IconComponent iconName={category.icon} />}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article._id}
                to={`/insights/${article._id}`}
                className="bg-[#1A1F2E] rounded-xl p-6 hover:bg-[#2A2F3E] transition-all group block overflow-hidden"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#1E293B] text-[#4763E4] px-3 py-1 rounded-lg text-sm font-medium truncate">
                      {article.category === 'fintech' ? 'FinTech' :
                       article.category === 'ai-ml' ? 'AI / ML' :
                       article.category === 'research' ? 'Research / White Papers' :
                       article.category}
                    </span>
                    <span className="flex items-center text-gray-400 text-sm whitespace-nowrap">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime} read
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-[#4763E4] transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{article.author?.name}</p>
                      <p className="text-gray-400 text-xs truncate">{article.author?.role}</p>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap ml-4">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
