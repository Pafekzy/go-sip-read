
import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Code, Database, Layers, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

// Define the category and group types
type Subcategory = {
  id: string;
  name: string;
  groups: Group[];
};

type Group = {
  id: string;
  name: string;
  prefix: string;
  description: string;
  memberCount: number;
};

type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  subcategories: Subcategory[];
};

export default function Groups() {
  const { user, hasPermission } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  // Sample data for categories and groups
  const categories: Category[] = [
    {
      id: "frontend",
      name: "Front-End Developers",
      icon: <Code className="h-5 w-5 animate-fade-in" />,
      description: "Focus on UI/UX, React, and modern web technologies",
      subcategories: [
        {
          id: "fe-react",
          name: "React",
          groups: [
            { id: "fe-react-1", name: "FER-Modern React with Hooks", prefix: "FER", description: "Learn modern React development with hooks and context", memberCount: 42 },
            { id: "fe-react-2", name: "FER-React Performance Masters", prefix: "FER", description: "Optimize your React applications for speed", memberCount: 28 },
          ]
        },
        {
          id: "fe-ui",
          name: "UI/UX Design",
          groups: [
            { id: "fe-ui-1", name: "FEU-Design Systems", prefix: "FEU", description: "Create consistent design systems for apps", memberCount: 35 },
            { id: "fe-ui-2", name: "FEU-Accessibility Champions", prefix: "FEU", description: "Making the web accessible for everyone", memberCount: 23 },
          ]
        },
      ]
    },
    {
      id: "backend",
      name: "Back-End Developers",
      icon: <Database className="h-5 w-5 animate-fade-in" />,
      description: "Master databases, APIs, and server architecture",
      subcategories: [
        {
          id: "be-node",
          name: "Node.js",
          groups: [
            { id: "be-node-1", name: "BEN-Express API Masters", prefix: "BEN", description: "Build robust APIs with Express", memberCount: 38 },
            { id: "be-node-2", name: "BEN-Node Performance", prefix: "BEN", description: "Optimize Node.js applications", memberCount: 25 },
          ]
        },
        {
          id: "be-db",
          name: "Databases",
          groups: [
            { id: "be-db-1", name: "BED-SQL Wizards", prefix: "BED", description: "Master SQL databases and queries", memberCount: 32 },
            { id: "be-db-2", name: "BED-NoSQL Experts", prefix: "BED", description: "Learn MongoDB, Redis and more", memberCount: 21 },
          ]
        },
      ]
    },
    {
      id: "fullstack",
      name: "Full Stack Developers",
      icon: <Layers className="h-5 w-5 animate-fade-in" />,
      description: "Learn both front-end and back-end development",
      subcategories: [
        {
          id: "fs-mern",
          name: "MERN Stack",
          groups: [
            { id: "fs-mern-1", name: "FSM-MERN Masters", prefix: "FSM", description: "Full stack development with MERN", memberCount: 45 },
            { id: "fs-mern-2", name: "FSM-MERN Auth Patterns", prefix: "FSM", description: "Authentication strategies for MERN apps", memberCount: 31 },
          ]
        },
        {
          id: "fs-jamstack",
          name: "JAMstack",
          groups: [
            { id: "fs-jam-1", name: "FSJ-Next.js Projects", prefix: "FSJ", description: "Building with Next.js and headless CMS", memberCount: 33 },
            { id: "fs-jam-2", name: "FSJ-Static Site Generators", prefix: "FSJ", description: "Fast sites with SSGs and APIs", memberCount: 27 },
          ]
        },
      ]
    }
  ];

  // Filter groups based on search query
  const filteredCategories = searchQuery ? 
    categories.map(category => ({
      ...category,
      subcategories: category.subcategories.map(subcategory => ({
        ...subcategory,
        groups: subcategory.groups.filter(group => 
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(subcategory => subcategory.groups.length > 0)
    })).filter(category => category.subcategories.length > 0) 
    : categories;

  const handleJoinGroup = (groupId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join a group",
        variant: "destructive",
      });
      return;
    }

    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
      toast({
        title: "Success",
        description: "You've joined the group!",
      });
    }
  };

  const handleLeaveGroup = (groupId: string) => {
    if (!hasPermission('subscribed')) {
      toast({
        title: "Subscription Required",
        description: "You need to be a subscribed user to leave a group",
        variant: "destructive",
      });
      return;
    }

    setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    toast({
      title: "Success",
      description: "You've left the group",
    });
  };

  const handleCreateGroup = () => {
    if (!hasPermission('subscribed')) {
      toast({
        title: "Subscription Required",
        description: "You need to be a subscribed user to create a group",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Coming Soon",
      description: "Group creation feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <Users className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Learning Groups</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join or create learning groups to study together and motivate each other.
        </p>

        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for groups..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleCreateGroup}
            className="bg-gosip-purple hover:bg-gosip-purple-dark"
          >
            Create Group
          </Button>
        </div>
        
        <div className="grid gap-8">
          {filteredCategories.map(category => (
            <Card key={category.id} className="gosip-card overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  {category.icon}
                  {category.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.subcategories.map(subcategory => (
                    <AccordionItem key={subcategory.id} value={subcategory.id}>
                      <AccordionTrigger className="text-lg font-medium">
                        {subcategory.name} ({subcategory.groups.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 mt-2">
                          {subcategory.groups.map(group => (
                            <div key={group.id} className="border rounded-md p-4 bg-card/50">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold">{group.name}</h4>
                                  <p className="text-muted-foreground text-sm">{group.description}</p>
                                  <p className="text-xs mt-1">Members: {group.memberCount}</p>
                                </div>
                                <div>
                                  {joinedGroups.includes(group.id) ? (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => handleLeaveGroup(group.id)}
                                    >
                                      Leave Group
                                    </Button>
                                  ) : (
                                    <Button 
                                      size="sm" 
                                      className="bg-gosip-purple hover:bg-gosip-purple-dark"
                                      onClick={() => handleJoinGroup(group.id)}
                                    >
                                      Join Group
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center p-8">
              <p className="text-xl text-muted-foreground">No groups found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
