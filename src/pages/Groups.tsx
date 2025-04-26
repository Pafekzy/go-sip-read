
import { Link } from "react-router-dom";
import { Users, Code, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Groups() {
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
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="gosip-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Front-End Developers
              </CardTitle>
              <CardDescription>
                Focus on UI/UX, React, and modern web technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gosip-purple hover:bg-gosip-purple-dark">
                Join Group
              </Button>
            </CardContent>
          </Card>

          <Card className="gosip-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Back-End Developers
              </CardTitle>
              <CardDescription>
                Master databases, APIs, and server architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gosip-purple hover:bg-gosip-purple-dark">
                Join Group
              </Button>
            </CardContent>
          </Card>

          <Card className="gosip-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Full Stack Developers
              </CardTitle>
              <CardDescription>
                Learn both front-end and back-end development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gosip-purple hover:bg-gosip-purple-dark">
                Join Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
