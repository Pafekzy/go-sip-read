
import { useState } from "react";
import { Link } from "react-router-dom";
import { Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PodcastCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  badgeText: string;
  badgeColor: string;
  podcasts: PodcastItem[];
}

interface PodcastItem {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  host: string;
  episodeCount: number;
  tags: string[];
}

const podcastCategories: PodcastCategory[] = [
  {
    id: "education-insights",
    title: "Education Insights",
    description: "Discussions and interviews on educational theory, policy, and innovation.",
    image: "https://images.unsplash.com/photo-1605711285791-0219c80e69d3?auto=format&fit=crop&w=500&q=80",
    badgeText: "Featured",
    badgeColor: "bg-gosip-purple text-white",
    podcasts: [
      {
        id: "future-learning",
        title: "The Future of Learning",
        description: "Exploring how education is evolving in response to technological and social changes.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        host: "Dr. Emily Chen",
        episodeCount: 24,
        tags: ["Education", "Innovation", "Technology"]
      },
      {
        id: "education-policy",
        title: "Education Policy Matters",
        description: "Analysis of current education policies and their impact on students and teachers.",
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=500&q=80",
        duration: "38 minutes",
        host: "Michael Torres",
        episodeCount: 32,
        tags: ["Policy", "Education Reform", "Equity"]
      },
      {
        id: "teacher-tales",
        title: "Teacher Tales",
        description: "Real stories from educators around the world sharing challenges and triumphs.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80",
        duration: "42 minutes",
        host: "Sarah Johnson",
        episodeCount: 48,
        tags: ["Teachers", "Classroom", "Stories"]
      },
      {
        id: "learning-science",
        title: "Learning Science Today",
        description: "The latest research on how people learn and what that means for education.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80",
        duration: "51 minutes",
        host: "Dr. Robert Kim",
        episodeCount: 29,
        tags: ["Cognitive Science", "Research", "Learning"]
      },
      {
        id: "education-equity",
        title: "Equity in Education",
        description: "Discussions on addressing disparities and promoting inclusivity in education systems.",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80",
        duration: "47 minutes",
        host: "Maria Rodriguez",
        episodeCount: 36,
        tags: ["Equity", "Inclusion", "Social Justice"]
      },
      {
        id: "parent-perspectives",
        title: "Parent Perspectives",
        description: "Parents share insights on navigating their children's educational journeys.",
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        host: "David Chen & Lisa Park",
        episodeCount: 42,
        tags: ["Parenting", "Family", "School"]
      }
    ]
  },
  {
    id: "science-tech",
    title: "Science & Technology",
    description: "Engaging discussions about scientific discoveries and technological advancements.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=500&q=80",
    badgeText: "Popular",
    badgeColor: "bg-blue-600 text-white",
    podcasts: [
      {
        id: "ai-revolution",
        title: "The AI Revolution",
        description: "Exploring artificial intelligence developments and their impact on society and work.",
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=500&q=80",
        duration: "52 minutes",
        host: "Dr. Alan Turing",
        episodeCount: 31,
        tags: ["AI", "Technology", "Future"]
      },
      {
        id: "space-odyssey",
        title: "Space Odyssey",
        description: "Journey through recent astronomical discoveries and space exploration missions.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=500&q=80",
        duration: "47 minutes",
        host: "Neil Armstrong",
        episodeCount: 28,
        tags: ["Space", "Astronomy", "Exploration"]
      },
      {
        id: "biotech-frontier",
        title: "Biotech Frontier",
        description: "The latest innovations in biotechnology and their implications for medicine and agriculture.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
        duration: "44 minutes",
        host: "Dr. Jennifer Watson",
        episodeCount: 35,
        tags: ["Biotechnology", "Medicine", "Research"]
      },
      {
        id: "digital-revolution",
        title: "Digital Revolution",
        description: "How digital technologies are transforming businesses, societies, and personal lives.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
        duration: "39 minutes",
        host: "Mark Zuckerberg",
        episodeCount: 45,
        tags: ["Digital", "Innovation", "Society"]
      },
      {
        id: "quantum-leaps",
        title: "Quantum Leaps",
        description: "Demystifying quantum physics and exploring its practical applications.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80",
        duration: "56 minutes",
        host: "Dr. Marie Curie",
        episodeCount: 22,
        tags: ["Quantum", "Physics", "Computing"]
      },
      {
        id: "green-tech",
        title: "Green Tech Revolution",
        description: "Innovations in sustainable technology addressing environmental challenges.",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=500&q=80",
        duration: "41 minutes",
        host: "Elon Musk",
        episodeCount: 38,
        tags: ["Sustainability", "CleanTech", "Environment"]
      }
    ]
  },
  {
    id: "business-entrepreneurship",
    title: "Business & Entrepreneurship",
    description: "Insights on business strategies, entrepreneurial journeys, and leadership principles.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=80",
    badgeText: "Trending",
    badgeColor: "bg-amber-500 text-white",
    podcasts: [
      {
        id: "startup-stories",
        title: "Startup Stories",
        description: "Founders share their journeys building innovative companies and overcoming challenges.",
        image: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?auto=format&fit=crop&w=500&q=80",
        duration: "49 minutes",
        host: "Jessica Chen",
        episodeCount: 52,
        tags: ["Startups", "Entrepreneurship", "Innovation"]
      },
      {
        id: "leadership-insights",
        title: "Leadership Insights",
        description: "Discussions with top executives on leadership strategies and organizational management.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
        duration: "43 minutes",
        host: "James Collins",
        episodeCount: 37,
        tags: ["Leadership", "Management", "Success"]
      },
      {
        id: "market-movers",
        title: "Market Movers",
        description: "Analysis of economic trends, market shifts, and investment strategies.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80",
        duration: "38 minutes",
        host: "Warren Buffett",
        episodeCount: 45,
        tags: ["Finance", "Markets", "Economy"]
      },
      {
        id: "future-work",
        title: "Future of Work",
        description: "Exploring how the workplace is evolving and skills needed for tomorrow's jobs.",
        image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=500&q=80",
        duration: "51 minutes",
        host: "Sarah Johnson",
        episodeCount: 29,
        tags: ["Workplace", "Careers", "Future"]
      },
      {
        id: "women-business",
        title: "Women in Business",
        description: "Highlighting female entrepreneurs, executives, and their impact on industries.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=500&q=80",
        duration: "46 minutes",
        host: "Michelle Zhang",
        episodeCount: 33,
        tags: ["Women Leaders", "Diversity", "Business"]
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing Mastery",
        description: "Strategies and case studies in effective online marketing and brand building.",
        image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        host: "Alex Morgan",
        episodeCount: 41,
        tags: ["Marketing", "Digital", "Branding"]
      }
    ]
  },
  {
    id: "personal-development",
    title: "Personal Development",
    description: "Podcasts focused on self-improvement, productivity, and achieving personal goals.",
    image: "https://images.unsplash.com/photo-1507209281643-9368ca05b9d9?auto=format&fit=crop&w=500&q=80",
    badgeText: "Growth",
    badgeColor: "bg-green-600 text-white",
    podcasts: [
      {
        id: "mindfulness-matters",
        title: "Mindfulness Matters",
        description: "Practices for cultivating awareness, reducing stress, and improving mental well-being.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80",
        duration: "32 minutes",
        host: "Dr. Jon Kabat-Zinn",
        episodeCount: 48,
        tags: ["Mindfulness", "Meditation", "Wellness"]
      },
      {
        id: "habit-formation",
        title: "The Habit Code",
        description: "Science-based strategies for building positive habits and breaking negative ones.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
        duration: "46 minutes",
        host: "Charles Duhigg",
        episodeCount: 35,
        tags: ["Habits", "Psychology", "Behavior Change"]
      },
      {
        id: "productivity-hacks",
        title: "Productivity Hacks",
        description: "Practical techniques to improve focus, efficiency, and work-life balance.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80",
        duration: "37 minutes",
        host: "David Allen",
        episodeCount: 42,
        tags: ["Productivity", "Time Management", "Organization"]
      },
      {
        id: "emotional-intelligence",
        title: "Emotional Intelligence",
        description: "Developing self-awareness, empathy, and effective emotional management.",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=500&q=80",
        duration: "43 minutes",
        host: "Dr. Daniel Goleman",
        episodeCount: 31,
        tags: ["Emotions", "Psychology", "Leadership"]
      },
      {
        id: "purpose-passion",
        title: "Purpose & Passion",
        description: "Finding meaning, identifying strengths, and pursuing fulfilling life paths.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80",
        duration: "51 minutes",
        host: "Simon Sinek",
        episodeCount: 39,
        tags: ["Purpose", "Career", "Fulfillment"]
      },
      {
        id: "financial-freedom",
        title: "Path to Financial Freedom",
        description: "Principles and strategies for building wealth and achieving financial independence.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=500&q=80",
        duration: "47 minutes",
        host: "Suze Orman",
        episodeCount: 44,
        tags: ["Finance", "Wealth", "Investment"]
      }
    ]
  },
  {
    id: "health-wellness",
    title: "Health & Wellness",
    description: "Expert conversations on physical health, nutrition, fitness, and overall wellbeing.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80",
    badgeText: "Wellness",
    badgeColor: "bg-red-500 text-white",
    podcasts: [
      {
        id: "nutrition-science",
        title: "Nutrition Science",
        description: "Evidence-based discussions about diet, nutrition, and their impact on health.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80",
        duration: "44 minutes",
        host: "Dr. Michael Greger",
        episodeCount: 37,
        tags: ["Nutrition", "Diet", "Health"]
      },
      {
        id: "fitness-evolution",
        title: "Fitness Evolution",
        description: "Exploring effective exercise approaches for different goals and body types.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80",
        duration: "39 minutes",
        host: "Arnold Schwarzenegger",
        episodeCount: 45,
        tags: ["Fitness", "Exercise", "Training"]
      },
      {
        id: "sleep-revolution",
        title: "The Sleep Revolution",
        description: "The science of sleep and strategies for improving sleep quality and health.",
        image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&w=500&q=80",
        duration: "41 minutes",
        host: "Dr. Matthew Walker",
        episodeCount: 32,
        tags: ["Sleep", "Health", "Productivity"]
      },
      {
        id: "mental-health-matters",
        title: "Mental Health Matters",
        description: "Open discussions about mental health challenges, treatments, and resilience.",
        image: "https://images.unsplash.com/photo-1507472477-43b74da7a07e?auto=format&fit=crop&w=500&q=80",
        duration: "48 minutes",
        host: "Dr. Brené Brown",
        episodeCount: 51,
        tags: ["Mental Health", "Psychology", "Wellbeing"]
      },
      {
        id: "longevity-secrets",
        title: "Longevity Secrets",
        description: "Research on aging, longevity, and practices for living a longer, healthier life.",
        image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=500&q=80",
        duration: "52 minutes",
        host: "Dr. David Sinclair",
        episodeCount: 29,
        tags: ["Longevity", "Aging", "Health"]
      },
      {
        id: "holistic-healing",
        title: "Holistic Healing",
        description: "Exploring the integration of conventional and complementary approaches to health.",
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=500&q=80",
        duration: "46 minutes",
        host: "Dr. Andrew Weil",
        episodeCount: 38,
        tags: ["Holistic", "Wellness", "Integrative"]
      }
    ]
  }
];

export default function Podcasts() {
  const [selectedCategory, setSelectedCategory] = useState<PodcastCategory | null>(null);

  const handleCategorySelect = (category: PodcastCategory) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <Headphones className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 gosip-gradient-text">Educational Podcasts</h1>
            <p className="text-xl text-muted-foreground">
              {selectedCategory 
                ? `Exploring ${selectedCategory.title}`
                : "Listen to thought-provoking podcasts from industry leaders and experts in various fields."
              }
            </p>
          </div>
          {selectedCategory && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToCategories}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Back to Categories
            </Button>
          )}
        </div>
        
        {!selectedCategory ? (
          // Categories view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcastCategories.map((category) => (
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
                    Browse Podcasts <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Podcasts view for selected category
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedCategory.title} Podcasts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory.podcasts.map((podcast) => (
                  <Card key={podcast.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden relative group">
                      <img 
                        src={podcast.image} 
                        alt={podcast.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                          Listen Now
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{podcast.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{podcast.duration}</span>
                        <span>•</span>
                        <span>{podcast.episodeCount} Episodes</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{podcast.description}</p>
                      <p className="text-sm font-medium mb-3">Host: {podcast.host}</p>
                      <div className="flex flex-wrap gap-2">
                        {podcast.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-secondary/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Listen to Podcast</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
