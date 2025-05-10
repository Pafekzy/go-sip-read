
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

const vrCategories: VRCategory[] = [
  {
    id: "immersive-learning",
    title: "Immersive Learning",
    description: "Educational experiences that provide hands-on learning through virtual reality environments.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    badgeText: "Popular",
    badgeColor: "bg-gosip-purple text-white",
    experiences: [
      {
        id: "anatomy-explorer",
        title: "Human Anatomy Explorer",
        description: "Explore the human body in detailed 3D with interactive elements to understand organ systems and physiological processes.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        difficulty: "Intermediate",
        skills: ["Biology", "Medical Knowledge", "Spatial Reasoning"]
      },
      {
        id: "space-expedition",
        title: "Space Expedition",
        description: "Travel through our solar system and beyond, learning about celestial bodies and astrophysics principles.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
        duration: "30 minutes",
        difficulty: "Beginner",
        skills: ["Astronomy", "Physics", "Navigation"]
      }
    ]
  },
  {
    id: "skill-development",
    title: "Skill Development",
    description: "Master practical skills with virtual reality training that simulates real-world applications and challenges.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=500&q=80",
    badgeText: "Trending",
    badgeColor: "bg-blue-600 text-white",
    experiences: [
      {
        id: "public-speaking",
        title: "Public Speaking Simulator",
        description: "Practice speaking in front of virtual audiences to overcome stage fright and improve presentation skills.",
        image: "https://images.unsplash.com/photo-1475721027785-f74ec9c409d7?auto=format&fit=crop&w=500&q=80",
        duration: "20 minutes",
        difficulty: "Intermediate",
        skills: ["Communication", "Confidence", "Content Delivery"]
      },
      {
        id: "coding-world",
        title: "VR Coding World",
        description: "Learn programming concepts through interactive 3D visualizations and hands-on coding exercises.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
        duration: "60 minutes",
        difficulty: "Advanced",
        skills: ["Programming", "Logic", "Problem Solving"]
      }
    ]
  },
  {
    id: "virtual-field-trips",
    title: "Virtual Field Trips",
    description: "Travel to historical sites, natural wonders, and cultural landmarks without leaving your room.",
    image: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?auto=format&fit=crop&w=500&q=80",
    badgeText: "Educational",
    badgeColor: "bg-green-600 text-white",
    experiences: [
      {
        id: "ancient-rome",
        title: "Ancient Rome Explorer",
        description: "Walk through the streets of ancient Rome in its prime, learning about Roman architecture, lifestyle, and historical events.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=500&q=80",
        duration: "40 minutes",
        difficulty: "Beginner",
        skills: ["History", "Architecture", "Cultural Studies"]
      },
      {
        id: "underwater-reef",
        title: "Underwater Reef Adventure",
        description: "Dive into coral reefs to study marine ecosystems and environmental conservation challenges.",
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        difficulty: "Intermediate",
        skills: ["Marine Biology", "Environmental Science", "Oceanography"]
      }
    ]
  },
  {
    id: "collaborative-environments",
    title: "Collaborative Environments",
    description: "Work together with others in shared virtual spaces to solve problems and complete projects.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=500&q=80",
    badgeText: "Teamwork",
    badgeColor: "bg-amber-500 text-white",
    experiences: [
      {
        id: "team-escape",
        title: "Team Escape Challenges",
        description: "Solve puzzles together with teammates in immersive virtual escape rooms that test your collective problem-solving abilities.",
        image: "https://images.unsplash.com/photo-1569360531163-a57ef939a0d2?auto=format&fit=crop&w=500&q=80",
        duration: "50 minutes",
        difficulty: "Advanced",
        skills: ["Teamwork", "Critical Thinking", "Time Management"]
      },
      {
        id: "virtual-design-lab",
        title: "Virtual Design Laboratory",
        description: "Collaborate on 3D design projects in a shared space with real-time feedback and prototyping tools.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
        duration: "55 minutes",
        difficulty: "Advanced",
        skills: ["Design Thinking", "3D Modeling", "Project Management"]
      }
    ]
  },
  {
    id: "business-simulations",
    title: "Business Simulations",
    description: "Practice entrepreneurial skills in risk-free virtual business environments.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80",
    badgeText: "Entrepreneurship",
    badgeColor: "bg-indigo-600 text-white",
    experiences: [
      {
        id: "startup-simulator",
        title: "Startup Simulator",
        description: "Build a virtual startup from ground up, making critical decisions on funding, product development, and market strategy.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=500&q=80",
        duration: "60 minutes",
        difficulty: "Intermediate",
        skills: ["Business Planning", "Financial Management", "Strategic Decision Making"]
      },
      {
        id: "negotiation-master",
        title: "Negotiation Master",
        description: "Practice high-stakes business negotiations with AI-powered virtual characters in realistic scenarios.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
        duration: "30 minutes",
        difficulty: "Advanced",
        skills: ["Negotiation", "Persuasion", "Strategic Communication"]
      },
      {
        id: "market-dynamics",
        title: "Market Dynamics Simulator",
        description: "Experience how markets respond to various business decisions in this interactive economic simulator.",
        image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        difficulty: "Advanced",
        skills: ["Market Analysis", "Economic Principles", "Competitive Strategy"]
      },
      {
        id: "investor-pitch",
        title: "Investor Pitch Training",
        description: "Perfect your pitch in front of virtual venture capitalists who provide real-time feedback on your presentation.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
        duration: "25 minutes",
        difficulty: "Intermediate",
        skills: ["Presentation Skills", "Financial Storytelling", "Investor Relations"]
      }
    ]
  },
  {
    id: "leadership-training",
    title: "Leadership Training",
    description: "Develop essential leadership skills through immersive virtual scenarios and challenges.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=500&q=80",
    badgeText: "Management",
    badgeColor: "bg-emerald-600 text-white",
    experiences: [
      {
        id: "crisis-management",
        title: "Crisis Management",
        description: "Test and improve your leadership skills in high-pressure crisis scenarios requiring quick decision-making.",
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=500&q=80",
        duration: "40 minutes",
        difficulty: "Advanced",
        skills: ["Decision Making", "Stress Management", "Team Leadership"]
      },
      {
        id: "virtual-team-building",
        title: "Virtual Team Building",
        description: "Lead diverse teams through collaborative challenges designed to build trust and enhance group dynamics.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
        duration: "50 minutes",
        difficulty: "Intermediate",
        skills: ["Team Building", "Conflict Resolution", "Emotional Intelligence"]
      },
      {
        id: "ethical-dilemmas",
        title: "Ethical Leadership Dilemmas",
        description: "Navigate complex ethical scenarios that challenge your values and decision-making as a business leader.",
        image: "https://images.unsplash.com/photo-1544535830-3d7d03fe967a?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        difficulty: "Advanced",
        skills: ["Ethical Reasoning", "Principled Leadership", "Corporate Governance"]
      },
      {
        id: "executive-presence",
        title: "Executive Presence Builder",
        description: "Refine your leadership presence and charisma in virtual boardroom and public speaking scenarios.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80",
        duration: "30 minutes",
        difficulty: "Intermediate",
        skills: ["Executive Presence", "Communication", "Confidence Building"]
      }
    ]
  },
  {
    id: "market-research",
    title: "Market Research",
    description: "Conduct virtual market research and customer testing in immersive environments.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    badgeText: "Customer Insights",
    badgeColor: "bg-cyan-600 text-white",
    experiences: [
      {
        id: "customer-journey",
        title: "Customer Journey Mapping",
        description: "Experience your product or service from the customer's perspective in a virtual environment.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        difficulty: "Beginner",
        skills: ["Customer Experience", "Empathy", "Service Design"]
      },
      {
        id: "virtual-focus-groups",
        title: "Virtual Focus Groups",
        description: "Observe and interact with AI-simulated consumer focus groups responding to your product concepts.",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        difficulty: "Intermediate",
        skills: ["Qualitative Research", "Consumer Insights", "Product Development"]
      },
      {
        id: "competitor-analysis",
        title: "Competitor Analysis Lab",
        description: "Analyze competitor products and strategies through interactive virtual demonstrations and simulations.",
        image: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?auto=format&fit=crop&w=500&q=80",
        duration: "40 minutes",
        difficulty: "Advanced",
        skills: ["Competitive Analysis", "Strategic Planning", "Market Positioning"]
      },
      {
        id: "market-trends",
        title: "Market Trends Explorer",
        description: "Visualize and interact with market data in a 3D environment to identify emerging patterns and opportunities.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
        duration: "30 minutes",
        difficulty: "Intermediate",
        skills: ["Trend Analysis", "Data Visualization", "Strategic Foresight"]
      }
    ]
  },
  {
    id: "product-design",
    title: "Product Design",
    description: "Create and test product prototypes in virtual environments before investing in physical development.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80",
    badgeText: "Innovation",
    badgeColor: "bg-rose-600 text-white",
    experiences: [
      {
        id: "virtual-prototyping",
        title: "Virtual Prototyping Studio",
        description: "Design and test product prototypes in a virtual workshop with professional tools and instant feedback.",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80",
        duration: "55 minutes",
        difficulty: "Advanced",
        skills: ["Product Design", "Prototyping", "User Testing"]
      },
      {
        id: "design-thinking",
        title: "Design Thinking Workshop",
        description: "Apply design thinking methodology in virtual collaborative spaces to solve real business problems.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=500&q=80",
        duration: "60 minutes",
        difficulty: "Intermediate",
        skills: ["Design Thinking", "Problem Solving", "Innovation"]
      },
      {
        id: "user-experience",
        title: "UX Testing Laboratory",
        description: "Observe how users interact with your digital products in a controlled virtual environment.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=500&q=80",
        duration: "40 minutes",
        difficulty: "Intermediate",
        skills: ["User Experience", "Usability Testing", "Interface Design"]
      },
      {
        id: "sustainability-design",
        title: "Sustainable Product Design",
        description: "Learn principles of sustainable design while creating eco-friendly product concepts in VR.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        difficulty: "Intermediate",
        skills: ["Sustainable Design", "Life Cycle Assessment", "Eco-Innovation"]
      }
    ]
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    description: "Master financial concepts through interactive VR experiences and simulations.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=500&q=80",
    badgeText: "Finance",
    badgeColor: "bg-green-600 text-white",
    experiences: [
      {
        id: "investment-simulator",
        title: "Investment Portfolio Simulator",
        description: "Build and manage virtual investment portfolios and see the long-term outcomes of different strategies.",
        image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=500&q=80",
        duration: "50 minutes",
        difficulty: "Intermediate",
        skills: ["Investment Strategy", "Risk Management", "Financial Planning"]
      },
      {
        id: "startup-funding",
        title: "Startup Funding Journey",
        description: "Navigate the complex world of startup financing from seed funding to IPO in this interactive simulation.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=500&q=80",
        duration: "55 minutes",
        difficulty: "Advanced",
        skills: ["Fundraising", "Valuation", "Cap Tables"]
      },
      {
        id: "cash-flow-manager",
        title: "Cash Flow Management",
        description: "Learn to manage business cash flow through challenging scenarios in this practical simulation.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
        duration: "40 minutes",
        difficulty: "Intermediate",
        skills: ["Cash Flow Analysis", "Financial Forecasting", "Business Finance"]
      },
      {
        id: "financial-statements",
        title: "Financial Statements Explorer",
        description: "Understand financial statements through interactive visualizations that bring numbers to life.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        difficulty: "Beginner",
        skills: ["Financial Literacy", "Accounting Basics", "Financial Analysis"]
      }
    ]
  },
  {
    id: "global-business",
    title: "Global Business",
    description: "Experience international business environments and cross-cultural business practices.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
    badgeText: "International",
    badgeColor: "bg-blue-600 text-white",
    experiences: [
      {
        id: "global-negotiations",
        title: "Cross-Cultural Negotiations",
        description: "Practice business negotiations with virtual counterparts from different cultural backgrounds.",
        image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        difficulty: "Advanced",
        skills: ["Cross-cultural Communication", "Global Business Etiquette", "Negotiation"]
      },
      {
        id: "global-markets",
        title: "Global Market Entry Simulation",
        description: "Plan and execute a market entry strategy for your business in different international markets.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
        duration: "60 minutes",
        difficulty: "Advanced",
        skills: ["International Business", "Market Entry Strategy", "Global Economics"]
      },
      {
        id: "supply-chain",
        title: "Global Supply Chain Explorer",
        description: "Follow products from raw materials to consumer across international supply chains in this interactive experience.",
        image: "https://images.unsplash.com/photo-1494412574745-f39b9ed80b43?auto=format&fit=crop&w=500&q=80",
        duration: "50 minutes",
        difficulty: "Intermediate",
        skills: ["Supply Chain Management", "Logistics", "International Trade"]
      },
      {
        id: "cultural-immersion",
        title: "Business Culture Immersion",
        description: "Experience business meetings and networking in different cultural contexts to build cultural intelligence.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80",
        duration: "40 minutes",
        difficulty: "Beginner",
        skills: ["Cultural Intelligence", "Global Mindset", "International Relations"]
      }
    ]
  }
];

export default function VRLearning() {
  const [selectedCategory, setSelectedCategory] = useState<VRCategory | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleCategorySelect = (category: VRCategory) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {selectedCategory && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToCategories}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              )}
              <div>
                <h1 className="text-3xl font-bold mb-1">VR Learning</h1>
                <p className="text-muted-foreground">
                  {selectedCategory 
                    ? `Exploring ${selectedCategory.title}`
                    : "Immersive educational experiences in virtual reality"
                  }
                </p>
              </div>
            </div>
            <div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex"
              >
                {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
            </div>
          </div>

          {!selectedCategory ? (
            // Categories view
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vrCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{category.title}</CardTitle>
                      <Badge className={category.badgeColor}>{category.badgeText}</Badge>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-1">
                    <Button variant="ghost" size="sm" className="ml-auto flex items-center gap-1">
                      Explore <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            // Experiences view for selected category
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">{selectedCategory.title} Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategory.experiences.map((experience) => (
                    <Card key={experience.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={experience.image} 
                          alt={experience.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{experience.duration}</span>
                          <span>•</span>
                          <span className={`${
                            experience.difficulty === 'Beginner' ? 'text-green-500' : 
                            experience.difficulty === 'Intermediate' ? 'text-amber-500' : 'text-red-500'
                          }`}>
                            {experience.difficulty}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{experience.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-secondary/50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Start Experience</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
