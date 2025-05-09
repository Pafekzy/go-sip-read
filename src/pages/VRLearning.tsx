
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
