
import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VideoCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  badgeText: string;
  badgeColor: string;
  videos: VideoItem[];
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

const videoCategories: VideoCategory[] = [
  {
    id: "learning-techniques",
    title: "Learning Techniques",
    description: "Videos that help you master effective learning methodologies and study habits.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    badgeText: "Popular",
    badgeColor: "bg-gosip-purple text-white",
    videos: [
      {
        id: "spaced-repetition",
        title: "Spaced Repetition: Master Any Subject",
        description: "Learn how to use spaced repetition to enhance memory retention and improve learning efficiency.",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80",
        duration: "24 minutes",
        instructor: "Dr. Maya Patterson",
        level: "Beginner",
        tags: ["Memory", "Study Skills", "Learning"]
      },
      {
        id: "pomodoro-technique",
        title: "The Pomodoro Technique Explained",
        description: "Discover how to manage your time effectively with the Pomodoro technique for better focus and productivity.",
        image: "https://images.unsplash.com/photo-1507090960745-b32f65d3113a?auto=format&fit=crop&w=500&q=80",
        duration: "18 minutes",
        instructor: "Alex Morgan",
        level: "Beginner",
        tags: ["Time Management", "Focus", "Productivity"]
      },
      {
        id: "active-recall",
        title: "Active Recall: Study Less, Remember More",
        description: "How to implement active recall in your study routine to maximize learning efficiency and retention.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=500&q=80",
        duration: "32 minutes",
        instructor: "Prof. James Chen",
        level: "Intermediate",
        tags: ["Memory", "Study Skills", "Cognitive Science"]
      },
      {
        id: "note-taking",
        title: "Advanced Note-Taking Methods",
        description: "Learn effective note-taking strategies like Cornell, Mind Mapping, and Outline methods.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=80",
        duration: "29 minutes",
        instructor: "Dr. Emma White",
        level: "Intermediate",
        tags: ["Note-Taking", "Organization", "Information Processing"]
      },
      {
        id: "concept-mapping",
        title: "Concept Mapping for Complex Topics",
        description: "How to use concept maps to understand and connect complex ideas across different subjects.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
        duration: "26 minutes",
        instructor: "Prof. Liu Wei",
        level: "Advanced",
        tags: ["Visual Learning", "Concept Maps", "Critical Thinking"]
      },
      {
        id: "memory-palace",
        title: "Building Your Memory Palace",
        description: "Step-by-step guide to creating and using the memory palace technique for extraordinary recall ability.",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=500&q=80",
        duration: "41 minutes",
        instructor: "Sebastian Knight",
        level: "Advanced",
        tags: ["Memory Techniques", "Visualization", "Mnemonics"]
      }
    ]
  },
  {
    id: "academic-subjects",
    title: "Academic Subjects",
    description: "Educational videos covering core academic subjects and disciplines.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80",
    badgeText: "Essential",
    badgeColor: "bg-blue-600 text-white",
    videos: [
      {
        id: "calculus-basics",
        title: "Calculus Fundamentals Explained Simply",
        description: "A clear introduction to calculus concepts including limits, derivatives, and integrals.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80",
        duration: "45 minutes",
        instructor: "Dr. Richard Feynman",
        level: "Intermediate",
        tags: ["Math", "Calculus", "STEM"]
      },
      {
        id: "modern-physics",
        title: "Modern Physics: Quantum Mechanics",
        description: "An accessible introduction to the strange world of quantum physics and its applications.",
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=500&q=80",
        duration: "38 minutes",
        instructor: "Dr. Samantha Lee",
        level: "Advanced",
        tags: ["Physics", "Quantum", "Science"]
      },
      {
        id: "american-civil-war",
        title: "The American Civil War: Causes and Impact",
        description: "Comprehensive analysis of the factors leading to the American Civil War and its lasting effects.",
        image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&w=500&q=80",
        duration: "52 minutes",
        instructor: "Prof. Michael Johnson",
        level: "Intermediate",
        tags: ["History", "American History", "Politics"]
      },
      {
        id: "psychology-101",
        title: "Introduction to Psychology",
        description: "Explore the fundamental concepts of psychology and human behavior.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80",
        duration: "43 minutes",
        instructor: "Dr. Anna Freud",
        level: "Beginner",
        tags: ["Psychology", "Behavior", "Social Science"]
      },
      {
        id: "cell-biology",
        title: "Cell Biology: The Building Blocks of Life",
        description: "Understanding cell structure, function, and the molecular basis of life.",
        image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=500&q=80",
        duration: "36 minutes",
        instructor: "Dr. Elena Rodriguez",
        level: "Intermediate",
        tags: ["Biology", "Molecular Biology", "Science"]
      },
      {
        id: "macroeconomics",
        title: "Principles of Macroeconomics",
        description: "Key concepts in macroeconomics including GDP, inflation, and fiscal policy.",
        image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=500&q=80",
        duration: "47 minutes",
        instructor: "Prof. Adam Smith",
        level: "Intermediate",
        tags: ["Economics", "Finance", "Policy"]
      }
    ]
  },
  {
    id: "professional-skills",
    title: "Professional Skills",
    description: "Videos to help you develop essential skills for career advancement and workplace success.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
    badgeText: "Career",
    badgeColor: "bg-green-600 text-white",
    videos: [
      {
        id: "public-speaking",
        title: "Mastering Public Speaking",
        description: "Overcome fear and deliver impactful presentations with confidence and clarity.",
        image: "https://images.unsplash.com/photo-1475721027785-f74ec9c409d7?auto=format&fit=crop&w=500&q=80",
        duration: "31 minutes",
        instructor: "Sarah Johnson",
        level: "Intermediate",
        tags: ["Communication", "Public Speaking", "Confidence"]
      },
      {
        id: "negotiation-skills",
        title: "The Art of Negotiation",
        description: "Learn proven techniques for successful negotiations in business and everyday life.",
        image: "https://images.unsplash.com/photo-1573497701240-345a600c90dd?auto=format&fit=crop&w=500&q=80",
        duration: "38 minutes",
        instructor: "David Kraft",
        level: "Intermediate",
        tags: ["Business", "Communication", "Strategy"]
      },
      {
        id: "leadership-essentials",
        title: "Leadership Essentials",
        description: "Core principles and practices that define effective leadership in modern organizations.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=500&q=80",
        duration: "44 minutes",
        instructor: "Margaret Chen",
        level: "Advanced",
        tags: ["Leadership", "Management", "Team Building"]
      },
      {
        id: "data-analysis",
        title: "Practical Data Analysis",
        description: "Hands-on guide to analyzing and interpreting data for making informed decisions.",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=500&q=80",
        duration: "49 minutes",
        instructor: "Dr. Alan Turing",
        level: "Intermediate",
        tags: ["Data Science", "Analytics", "Decision Making"]
      },
      {
        id: "digital-marketing",
        title: "Digital Marketing Fundamentals",
        description: "Introduction to key digital marketing channels, strategies, and metrics.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=80",
        duration: "37 minutes",
        instructor: "Jessica Miller",
        level: "Beginner",
        tags: ["Marketing", "Digital", "Social Media"]
      },
      {
        id: "project-management",
        title: "Effective Project Management",
        description: "Learn how to plan, execute, and close projects successfully using modern methodologies.",
        image: "https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?auto=format&fit=crop&w=500&q=80",
        duration: "42 minutes",
        instructor: "Robert Chang",
        level: "Intermediate",
        tags: ["Project Management", "Organization", "Leadership"]
      }
    ]
  },
  {
    id: "creative-arts",
    title: "Creative Arts",
    description: "Explore various artistic disciplines and develop your creative skills.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80",
    badgeText: "Creative",
    badgeColor: "bg-pink-600 text-white",
    videos: [
      {
        id: "photography-basics",
        title: "Photography Fundamentals",
        description: "Learn the essential techniques and principles behind capturing stunning photographs.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
        duration: "35 minutes",
        instructor: "Ansel Adams",
        level: "Beginner",
        tags: ["Photography", "Visual Arts", "Creativity"]
      },
      {
        id: "digital-illustration",
        title: "Digital Illustration for Beginners",
        description: "Start your journey into digital art with this comprehensive introduction to illustration.",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=500&q=80",
        duration: "47 minutes",
        instructor: "Maya Lin",
        level: "Beginner",
        tags: ["Illustration", "Digital Art", "Design"]
      },
      {
        id: "creative-writing",
        title: "Creative Writing: Finding Your Voice",
        description: "Develop your unique writing style and learn techniques to craft compelling narratives.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
        duration: "39 minutes",
        instructor: "James Joyce",
        level: "Intermediate",
        tags: ["Writing", "Storytelling", "Creativity"]
      },
      {
        id: "music-composition",
        title: "Music Composition: Theory to Practice",
        description: "Learn the principles of music theory and apply them to create your own compositions.",
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
        duration: "53 minutes",
        instructor: "Mozart Williams",
        level: "Intermediate",
        tags: ["Music", "Composition", "Theory"]
      },
      {
        id: "filmmaking",
        title: "Independent Filmmaking",
        description: "A practical guide to creating compelling films with limited resources.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80",
        duration: "48 minutes",
        instructor: "Steven Nolan",
        level: "Advanced",
        tags: ["Film", "Directing", "Production"]
      },
      {
        id: "dance-fundamentals",
        title: "Contemporary Dance Fundamentals",
        description: "Introduction to contemporary dance techniques, movement, and expression.",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
        duration: "34 minutes",
        instructor: "Maria Garcia",
        level: "Beginner",
        tags: ["Dance", "Movement", "Expression"]
      }
    ]
  }
];

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | null>(null);

  const handleCategorySelect = (category: VideoCategory) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <Film className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 gosip-gradient-text">Educational Videos</h1>
            <p className="text-xl text-muted-foreground">
              {selectedCategory 
                ? `Exploring ${selectedCategory.title}`
                : "Watch curated videos that help you learn new concepts efficiently."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoCategories.map((category) => (
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
          // Videos view for selected category
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedCategory.title} Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory.videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden relative group">
                      <img 
                        src={video.image} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{video.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span className={`${
                          video.level === 'Beginner' ? 'text-green-500' : 
                          video.level === 'Intermediate' ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {video.level}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                      <p className="text-sm font-medium mb-3">Instructor: {video.instructor}</p>
                      <div className="flex flex-wrap gap-2">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-secondary/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Watch Video</Button>
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
