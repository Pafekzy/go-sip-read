import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface VRCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  badgeText: string;
  badgeColor: string;
  experiences: VRExperience[];
}
interface VRExperience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
}
const vrCategories: VRCategory[] = [{
  id: "african-tech-innovation",
  title: "African Tech Innovation",
  description: "Immersive experiences showcasing Africa's tech ecosystem, innovation hubs, and entrepreneurial opportunities.",
  image: "https://images.unsplash.com/photo-1516583640087-3008d95aa328?auto=format&fit=crop&w=500&q=80",
  badgeText: "Featured",
  badgeColor: "bg-gosip-purple text-white",
  experiences: [{
    id: "lagos-tech-hub",
    title: "Lagos Tech Hub Experience",
    description: "Explore Nigeria's thriving tech ecosystem and meet virtual representations of successful Nigerian founders and investors.",
    image: "https://images.unsplash.com/photo-1580940881581-3703b144e84f?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Beginner",
    skills: ["Ecosystem Knowledge", "Networking", "Market Research"]
  }, {
    id: "kenya-fintech",
    title: "Kenyan FinTech Revolution",
    description: "Learn about M-Pesa and other Kenyan financial innovations that have transformed Africa's financial landscape.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Financial Innovation", "Mobile Banking", "Market Analysis"]
  }, {
    id: "cairo-startups",
    title: "Cairo's Startup Ecosystem",
    description: "Immerse yourself in Egypt's booming entrepreneurial scene and understand its unique strengths and opportunities.",
    image: "https://images.unsplash.com/photo-1553701275-1d6d68d68511?auto=format&fit=crop&w=500&q=80",
    duration: "35 minutes",
    difficulty: "Beginner",
    skills: ["Market Analysis", "Cultural Intelligence", "Business Development"]
  }, {
    id: "kigali-innovation",
    title: "Kigali Innovation City",
    description: "Experience Rwanda's ambitious tech hub that aims to become Africa's Silicon Valley through strategic investments.",
    image: "https://images.unsplash.com/photo-1580746738542-afb09e61cd30?auto=format&fit=crop&w=500&q=80",
    duration: "30 minutes",
    difficulty: "Beginner",
    skills: ["Urban Planning", "Tech Infrastructure", "Innovation Policy"]
  }]
}, {
  id: "sustainable-african-business",
  title: "Sustainable African Business",
  description: "Virtual experiences focused on sustainable business practices across various African contexts and industries.",
  image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=500&q=80",
  badgeText: "Sustainability",
  badgeColor: "bg-green-600 text-white",
  experiences: [{
    id: "solar-energy",
    title: "Solar Energy Ventures",
    description: "Explore successful solar energy business models in East Africa and understand their operational strategies.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Intermediate",
    skills: ["Renewable Energy", "Business Modeling", "Impact Assessment"]
  }, {
    id: "circular-economy",
    title: "Circular Economy Models",
    description: "Learn about waste management and recycling businesses that are transforming environmental challenges into opportunities.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Advanced",
    skills: ["Circular Design", "Supply Chain", "Waste Management"]
  }, {
    id: "ethical-fashion",
    title: "Ethical Fashion Supply Chains",
    description: "Visit virtual African textile factories to understand sustainable and ethical fashion production.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Ethical Sourcing", "Supply Chain Management", "Brand Building"]
  }, {
    id: "sustainable-agriculture",
    title: "AgriTech Innovations",
    description: "Experience how technology is transforming African agriculture through precision farming and supply chain innovations.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=500&q=80",
    duration: "55 minutes",
    difficulty: "Beginner",
    skills: ["Agricultural Technology", "Food Systems", "Rural Development"]
  }]
}, {
  id: "african-market-entry",
  title: "African Market Entry",
  description: "Strategic simulations for entering and navigating diverse African markets as a tech entrepreneur.",
  image: "https://images.unsplash.com/photo-1627373504172-09213dd0eb6f?auto=format&fit=crop&w=500&q=80",
  badgeText: "Strategy",
  badgeColor: "bg-blue-600 text-white",
  experiences: [{
    id: "regulatory-navigation",
    title: "Regulatory Navigation Simulator",
    description: "Practice navigating complex regulatory environments in different African countries to launch tech products successfully.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80",
    duration: "60 minutes",
    difficulty: "Advanced",
    skills: ["Regulatory Compliance", "Government Relations", "Risk Management"]
  }, {
    id: "localization-strategy",
    title: "Market Localization Strategy",
    description: "Learn to adapt your tech products for diverse African markets, considering cultural and economic factors.",
    image: "https://images.unsplash.com/photo-1606591104128-ae2b86204d13?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Intermediate",
    skills: ["Product Localization", "Cultural Intelligence", "User Experience"]
  }, {
    id: "distribution-networks",
    title: "African Distribution Networks",
    description: "Explore innovative distribution strategies for reaching customers in both urban and rural African markets.",
    image: "https://images.unsplash.com/photo-1625872596435-7934585768cc?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Advanced",
    skills: ["Distribution Strategy", "Logistics", "Last-mile Solutions"]
  }, {
    id: "partnership-building",
    title: "Strategic Partnership Simulator",
    description: "Practice identifying and negotiating with potential African business partners and stakeholders.",
    image: "https://images.unsplash.com/photo-1566667712770-51d90c7a2296?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Partnership Development", "Negotiation", "Due Diligence"]
  }]
}, {
  id: "african-investment-landscape",
  title: "African Investment Landscape",
  description: "Navigate the complex world of investment across Africa's diverse markets and sectors.",
  image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=500&q=80",
  badgeText: "Finance",
  badgeColor: "bg-amber-500 text-white",
  experiences: [{
    id: "investor-pitch-african",
    title: "African Investor Pitch Master",
    description: "Practice pitching to virtual African investors and VC firms with region-specific feedback and coaching.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=500&q=80",
    duration: "35 minutes",
    difficulty: "Advanced",
    skills: ["Pitch Development", "Financial Storytelling", "Investor Relations"]
  }, {
    id: "pan-african-funding",
    title: "Pan-African Funding Navigator",
    description: "Learn about various funding sources across the continent and how to strategically approach each one.",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Intermediate",
    skills: ["Funding Strategy", "Financial Planning", "Investor Research"]
  }, {
    id: "valuation-fundamentals",
    title: "African Startup Valuation",
    description: "Master the fundamentals of startup valuation in African contexts with different economic considerations.",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=500&q=80",
    duration: "55 minutes",
    difficulty: "Advanced",
    skills: ["Financial Valuation", "Market Analysis", "Growth Metrics"]
  }, {
    id: "currency-management",
    title: "Currency Risk Management",
    description: "Develop strategies for managing currency risks when operating businesses across multiple African countries.",
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Advanced",
    skills: ["Forex Management", "Financial Risk", "Treasury Operations"]
  }]
}, {
  id: "african-talent-development",
  title: "African Talent Development",
  description: "Strategies for building and managing high-performing teams across African markets.",
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
  badgeText: "Talent",
  badgeColor: "bg-indigo-600 text-white",
  experiences: [{
    id: "remote-team-management",
    title: "Remote African Teams",
    description: "Learn effective strategies for building and managing distributed tech teams across different African countries.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Intermediate",
    skills: ["Remote Management", "Cross-cultural Teams", "Digital Collaboration"]
  }, {
    id: "talent-sourcing",
    title: "African Tech Talent Sourcing",
    description: "Explore various channels and strategies for finding tech talent across different African tech ecosystems.",
    image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Beginner",
    skills: ["Talent Acquisition", "Employer Branding", "Recruitment"]
  }, {
    id: "skill-development",
    title: "Tech Skills Accelerator",
    description: "Design effective training programs to upskill African tech talent in emerging technologies.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Advanced",
    skills: ["Training Design", "Skills Assessment", "Learning Development"]
  }, {
    id: "retention-strategies",
    title: "Talent Retention in High-Growth Markets",
    description: "Develop effective strategies for retaining top talent in competitive African tech hubs.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=500&q=80",
    duration: "35 minutes",
    difficulty: "Intermediate",
    skills: ["Employee Experience", "Compensation Strategy", "Career Development"]
  }]
}, {
  id: "african-consumer-insights",
  title: "African Consumer Insights",
  description: "Deep dive into understanding diverse African consumer behaviors and preferences for product development.",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
  badgeText: "Research",
  badgeColor: "bg-cyan-600 text-white",
  experiences: [{
    id: "urban-consumer",
    title: "Urban African Consumer Journey",
    description: "Follow the digital life of urban consumers across major African cities to understand their tech usage patterns.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Beginner",
    skills: ["User Research", "Persona Development", "Urban Markets"]
  }, {
    id: "rural-tech-adoption",
    title: "Rural Tech Adoption Patterns",
    description: "Experience how technology is used and adopted in rural African communities with limited infrastructure.",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Intermediate",
    skills: ["Rural Markets", "Technology Adoption", "Inclusive Design"]
  }, {
    id: "payment-preferences",
    title: "African Payment Preferences",
    description: "Explore the diverse payment methods and financial behaviors of consumers across different African regions.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
    duration: "35 minutes",
    difficulty: "Intermediate",
    skills: ["Payment Systems", "Consumer Finance", "Market Segmentation"]
  }, {
    id: "mobile-first-design",
    title: "Mobile-First Product Design",
    description: "Learn to design tech products specifically for African mobile users with varying device capabilities and data constraints.",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Advanced",
    skills: ["Mobile UX", "Data-efficient Design", "Performance Optimization"]
  }]
}, {
  id: "digital-infrastructure",
  title: "African Digital Infrastructure",
  description: "Explore the evolving digital infrastructure landscape across Africa and its implications for tech businesses.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
  badgeText: "Technical",
  badgeColor: "bg-rose-600 text-white",
  experiences: [{
    id: "connectivity-solutions",
    title: "Last-Mile Connectivity Solutions",
    description: "Explore innovative approaches to solving internet connectivity challenges in underserved African regions.",
    image: "https://images.unsplash.com/photo-1494412574745-f39b9ed80b43?auto=format&fit=crop&w=500&q=80",
    duration: "55 minutes",
    difficulty: "Advanced",
    skills: ["Network Infrastructure", "Connectivity Innovation", "Rural Tech"]
  }, {
    id: "data-centers",
    title: "African Data Center Evolution",
    description: "Understand the growth and challenges of data center infrastructure across major African tech hubs.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Cloud Infrastructure", "Data Sovereignty", "Tech Infrastructure"]
  }, {
    id: "offline-solutions",
    title: "Designing for Offline Environments",
    description: "Learn strategies for building tech products that work effectively in areas with intermittent connectivity.",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Advanced",
    skills: ["Offline-first Design", "Data Synchronization", "Progressive Apps"]
  }, {
    id: "energy-innovation",
    title: "Energy Solutions for Tech",
    description: "Explore innovative power solutions for running tech businesses in regions with unreliable electricity.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Energy Management", "Sustainable Tech", "Infrastructure Planning"]
  }]
}, {
  id: "african-digital-policy",
  title: "African Digital Policy",
  description: "Navigate the complex policy and regulatory environments affecting tech businesses across African markets.",
  image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80",
  badgeText: "Policy",
  badgeColor: "bg-emerald-600 text-white",
  experiences: [{
    id: "data-protection",
    title: "Data Protection Regulations",
    description: "Navigate the evolving landscape of data protection and privacy regulations across different African countries.",
    image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Advanced",
    skills: ["Regulatory Compliance", "Data Governance", "Privacy Policy"]
  }, {
    id: "fintech-regulation",
    title: "FinTech Regulatory Environments",
    description: "Compare regulatory approaches to fintech across major African markets and their implications for innovation.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=500&q=80",
    duration: "55 minutes",
    difficulty: "Advanced",
    skills: ["Financial Regulation", "Compliance Strategy", "Regulatory Innovation"]
  }, {
    id: "digital-taxation",
    title: "Digital Taxation Frameworks",
    description: "Understand emerging digital taxation policies across Africa and their impact on tech business operations.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Intermediate",
    skills: ["Tax Planning", "Financial Compliance", "Cross-border Operations"]
  }, {
    id: "policy-advocacy",
    title: "Tech Policy Advocacy",
    description: "Learn effective strategies for engaging with policymakers to shape favorable tech regulations.",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Advanced",
    skills: ["Government Relations", "Policy Analysis", "Industry Collaboration"]
  }]
}, {
  id: "pan-african-expansion",
  title: "Pan-African Expansion",
  description: "Strategies for scaling tech businesses across multiple African markets successfully.",
  image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
  badgeText: "Growth",
  badgeColor: "bg-blue-600 text-white",
  experiences: [{
    id: "regional-strategy",
    title: "Regional Market Entry Sequencing",
    description: "Develop strategic approaches for expanding across African regions in the most effective sequence.",
    image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=500&q=80",
    duration: "60 minutes",
    difficulty: "Advanced",
    skills: ["Market Expansion", "Regional Strategy", "Growth Management"]
  }, {
    id: "localization-at-scale",
    title: "Product Localization at Scale",
    description: "Learn efficient approaches to localizing your products across multiple African languages and cultures.",
    image: "https://images.unsplash.com/photo-1490596875948-0aa0252c5c27?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Intermediate",
    skills: ["Localization Strategy", "Cultural Adaptation", "Market Fit"]
  }, {
    id: "hub-model",
    title: "Regional Hub Operations",
    description: "Design effective regional hub models for managing operations across multiple African countries.",
    image: "https://images.unsplash.com/photo-1512106374287-de3ffcfdb5c0?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Advanced",
    skills: ["Operational Strategy", "Team Structure", "Regional Management"]
  }, {
    id: "cross-border-payments",
    title: "Cross-Border Payment Solutions",
    description: "Navigate the challenges of payments and financial operations when running businesses across multiple African currencies.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Payment Infrastructure", "Currency Management", "Financial Operations"]
  }]
}, {
  id: "african-creative-economy",
  title: "African Creative Economy",
  description: "Explore opportunities at the intersection of technology and Africa's vibrant creative industries.",
  image: "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?auto=format&fit=crop&w=500&q=80",
  badgeText: "Creative",
  badgeColor: "bg-gosip-purple text-white",
  experiences: [{
    id: "digital-content",
    title: "Digital Content Creation",
    description: "Learn strategies for developing and monetizing digital content tailored for African audiences.",
    image: "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Beginner",
    skills: ["Content Strategy", "Digital Media", "Audience Development"]
  }, {
    id: "music-tech",
    title: "African Music Tech Ventures",
    description: "Explore opportunities in the rapidly evolving African music tech ecosystem with its unique distribution models.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Intermediate",
    skills: ["Music Industry", "Digital Distribution", "IP Management"]
  }, {
    id: "fashion-tech",
    title: "Fashion Tech Innovations",
    description: "Discover how technology is transforming Africa's fashion industry from production to consumer engagement.",
    image: "https://images.unsplash.com/photo-1503160865246-f8cb0f2b3fb4?auto=format&fit=crop&w=500&q=80",
    duration: "35 minutes",
    difficulty: "Beginner",
    skills: ["Fashion Industry", "E-commerce", "Digital Marketing"]
  }, {
    id: "gaming-industry",
    title: "African Gaming Industry",
    description: "Understand the unique opportunities and challenges in developing games for African markets and beyond.",
    image: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?auto=format&fit=crop&w=500&q=80",
    duration: "50 minutes",
    difficulty: "Advanced",
    skills: ["Game Development", "User Acquisition", "Monetization Strategy"]
  }]
}, {
  id: "immersive-learning",
  title: "Immersive Learning",
  description: "Educational experiences that provide hands-on learning through virtual reality environments.",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
  badgeText: "Popular",
  badgeColor: "bg-gosip-purple text-white",
  experiences: [{
    id: "anatomy-explorer",
    title: "Human Anatomy Explorer",
    description: "Explore the human body in detailed 3D with interactive elements to understand organ systems and physiological processes.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Intermediate",
    skills: ["Biology", "Medical Knowledge", "Spatial Reasoning"]
  }, {
    id: "space-expedition",
    title: "Space Expedition",
    description: "Travel through our solar system and beyond, learning about celestial bodies and astrophysics principles.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    duration: "30 minutes",
    difficulty: "Beginner",
    skills: ["Astronomy", "Physics", "Navigation"]
  }]
}, {
  id: "skill-development",
  title: "Skill Development",
  description: "Master practical skills with virtual reality training that simulates real-world applications and challenges.",
  image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=500&q=80",
  badgeText: "Trending",
  badgeColor: "bg-blue-600 text-white",
  experiences: [{
    id: "public-speaking",
    title: "Public Speaking Simulator",
    description: "Practice speaking in front of virtual audiences to overcome stage fright and improve presentation skills.",
    image: "https://images.unsplash.com/photo-1475721027785-f74ec9c409d7?auto=format&fit=crop&w=500&q=80",
    duration: "20 minutes",
    difficulty: "Intermediate",
    skills: ["Communication", "Confidence", "Content Delivery"]
  }, {
    id: "coding-world",
    title: "VR Coding World",
    description: "Learn programming concepts through interactive 3D visualizations and hands-on coding exercises.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    duration: "60 minutes",
    difficulty: "Advanced",
    skills: ["Programming", "Logic", "Problem Solving"]
  }]
}, {
  id: "virtual-field-trips",
  title: "Virtual Field Trips",
  description: "Travel to historical sites, natural wonders, and cultural landmarks without leaving your room.",
  image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?auto=format&fit=crop&w=500&q=80",
  badgeText: "Educational",
  badgeColor: "bg-green-600 text-white",
  experiences: [{
    id: "ancient-rome",
    title: "Ancient Rome Explorer",
    description: "Walk through the streets of ancient Rome in its prime, learning about Roman architecture, lifestyle, and historical events.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=500&q=80",
    duration: "35 minutes",
    difficulty: "Beginner",
    skills: ["Historical Knowledge", "Architecture", "Cultural Studies"]
  }, {
    id: "serengeti-safari",
    title: "Serengeti Virtual Safari",
    description: "Experience a virtual safari through Tanzania's Serengeti National Park and observe African wildlife in their natural habitat.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500&q=80",
    duration: "40 minutes",
    difficulty: "Beginner",
    skills: ["Wildlife Conservation", "Ecosystem Knowledge", "Geography"]
  }, {
    id: "cairo-pyramids",
    title: "Pyramids of Giza Tour",
    description: "Explore the ancient Egyptian pyramids, including inside access to areas typically restricted to the public.",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=500&q=80",
    duration: "45 minutes",
    difficulty: "Beginner",
    skills: ["Historical Knowledge", "Archaeology", "Egyptian Culture"]
  }, {
    id: "victoria-falls",
    title: "Victoria Falls Experience",
    description: "Visit the majestic Victoria Falls between Zambia and Zimbabwe and learn about its geological significance.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80",
    duration: "30 minutes",
    difficulty: "Beginner",
    skills: ["Geography", "Geology", "Environmental Science"]
  }]
}
// Add more categories and experiences here...
];
function VRLearning() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<VRCategory | null>(vrCategories[0]);
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  const handleCategorySelect = (category: VRCategory) => {
    setSelectedCategory(category);
  };
  return <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} hidden={sidebarHidden} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel with categories */}
          <div className={`border-r border-border bg-card transition-all ${sidebarHidden ? "w-0" : sidebarCollapsed ? "w-24" : "w-72"}`}>
            <div className="p-4 flex items-center justify-between">
              <h2 className={`font-semibold text-lg ${sidebarCollapsed ? "hidden" : "block"}`}>🔲</h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarHidden(!sidebarHidden)} className="h-8 w-8">
                {sidebarHidden ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="overflow-y-auto h-[calc(100vh-10rem)]">
              {vrCategories.map(category => <div key={category.id} onClick={() => handleCategorySelect(category)} className={`p-3 transition-all cursor-pointer hover:bg-accent ${selectedCategory?.id === category.id ? 'bg-accent' : ''}`}>
                  {sidebarCollapsed ? <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-md bg-cover bg-center" style={{
                  backgroundImage: `url(${category.image})`
                }} />
                    </div> : <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-md bg-cover bg-center" style={{
                  backgroundImage: `url(${category.image})`
                }} />
                      <div>
                        <h3 className="font-medium">{category.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{category.description}</p>
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 overflow-y-auto pb-8">
            {selectedCategory && <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h1 className="text-3xl font-bold">{selectedCategory.title}</h1>
                  <Badge className={selectedCategory.badgeColor}>{selectedCategory.badgeText}</Badge>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8">{selectedCategory.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategory.experiences.map(experience => <Card key={experience.id} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="h-48 bg-cover bg-center" style={{
                  backgroundImage: `url(${experience.image})`
                }} />
                      <CardHeader>
                        <CardTitle>{experience.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span className="font-medium">{experience.duration}</span>
                          <span>•</span>
                          <span>{experience.difficulty}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{experience.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.skills.map((skill, index) => <Badge key={index} variant="outline">{skill}</Badge>)}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gosip-purple">Start Experience</Button>
                      </CardFooter>
                    </Card>)}
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}
export default VRLearning;