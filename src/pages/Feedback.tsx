import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Trash2, Edit, ThumbsUp, ThumbsDown, MessageCircle, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const qualities = [
  "Outstanding Performance",
  "Clear Purpose & Usefulness",
  "Intuitive User Experience (UX)",
  "Polished User Interface (UI)",
  "Stability and Reliability",
  "Security and Privacy",
  "Regular Updates and Maintenance",
  "Cross-Platform Consistency",
  "Excellent Customer Support",
  "Accessibility"
];

// Define interfaces for our data types
interface Rating {
  id?: string;
  userId: string;
  qualityId: number;
  score: number;
  createdAt: string;
}

interface Comment {
  id?: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
}

interface Circle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

const FloatingCircles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const colors = ["#9b87f5", "#D6BCFA", "#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2", "#D3E4FD"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create initial circles
    const initialCircles: Circle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
      size: Math.random() * 40 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    }));
    
    setCircles(initialCircles);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      setCircles(prevCircles => prevCircles.map(circle => {
        // Basic movement
        let newX = circle.x + circle.speedX;
        let newY = circle.y + circle.speedY;
        
        // Bounce off walls
        if (newX < 0 || newX > container.offsetWidth) {
          circle.speedX *= -1;
          newX = circle.x + circle.speedX;
        }
        
        if (newY < 0 || newY > container.offsetHeight) {
          circle.speedY *= -1;
          newY = circle.y + circle.speedY;
        }
        
        // Respond to cursor with subtle attraction/repulsion
        const dx = mousePosition.x - newX;
        const dy = mousePosition.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Create repulsion effect
          const angle = Math.atan2(dy, dx);
          const repulsionForce = 0.05;
          newX -= Math.cos(angle) * repulsionForce * (150 - distance) / 150;
          newY -= Math.sin(angle) * repulsionForce * (150 - distance) / 150;
        }
        
        return {
          ...circle,
          x: newX,
          y: newY
        };
      }));
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-20 transition-transform"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
            transform: `scale(${mousePosition.x ? 1 + (1 / (Math.hypot(mousePosition.x - circle.x, mousePosition.y - circle.y) + 1)) * 0.3 : 1})`
          }}
        />
      ))}
    </div>
  );
};

const StarRating: React.FC<{ 
  quality: string, 
  qualityId: number, 
  rating: number, 
  onRatingChange: (qualityId: number, rating: number) => void 
}> = ({ quality, qualityId, rating, onRatingChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
      <span className="text-sm font-medium min-w-[200px]">{quality}</span>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => onRatingChange(qualityId, star)}
            className={`h-5 w-5 cursor-pointer ${
              star <= rating 
                ? "fill-gosip-purple text-gosip-purple" 
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CommentItem: React.FC<{ 
  comment: Comment,
  currentUserId: string | null,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
  onLike: (id: string) => void,
  onDislike: (id: string) => void
}> = ({ comment, currentUserId, onEdit, onDelete, onLike, onDislike }) => {
  const canModify = currentUserId === comment.userId;
  const isWithinEditWindow = () => {
    const createdAt = new Date(comment.createdAt);
    const now = new Date();
    const diffInMinutes = (now.getTime() - createdAt.getTime()) / 60000;
    return diffInMinutes <= 15;
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{comment.userName}</p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
            {comment.updatedAt !== comment.createdAt && " (edited)"}
          </p>
        </div>
        {canModify && isWithinEditWindow() && (
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit(comment.id!)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(comment.id!)}
              className="h-8 w-8 p-0 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )}
      </div>
      <p className="mt-2 text-foreground">{comment.text}</p>
      <div className="flex items-center mt-3 space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onLike(comment.id!)}
          className="flex items-center space-x-1 h-8 px-2"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{comment.likes}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDislike(comment.id!)}
          className="flex items-center space-x-1 h-8 px-2"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>{comment.dislikes}</span>
        </Button>
      </div>
    </div>
  );
};

export default function Feedback() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    // Load comments (in a real app this would fetch from a database)
    // For this demo, we'll use mock data
    setComments([
      {
        id: "1",
        userId: "user1",
        userName: "Olamide Kate",
        text: "I really like the new mindfulness features. They've helped me stay focused during study sessions.",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        likes: 5,
        dislikes: 1
      },
      {
        id: "2",
        userId: "user2",
        userName: "Ogbehine Caleb",
        text: "The user interface is very intuitive. I'd love to see more customization options in the future.",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        likes: 3,
        dislikes: 0
      }
    ]);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleRatingChange = (qualityId: number, score: number) => {
    setRatings((prev) => ({
      ...prev,
      [qualityId]: score
    }));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment before submitting",
        variant: "destructive",
      });
      return;
    }

    if (editingCommentId) {
      // Update existing comment
      setComments(comments.map(comment => 
        comment.id === editingCommentId 
          ? {
              ...comment, 
              text: commentText,
              updatedAt: new Date().toISOString()
            }
          : comment
      ));
      setEditingCommentId(null);
      toast({
        title: "Comment updated",
        description: "Your comment has been updated successfully"
      });
    } else {
      // Add new comment
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        userId: user?.id || "guest",
        userName: user?.email?.split('@')[0] || "Anonymous",
        text: commentText,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
      setComments([newComment, ...comments]);
      toast({
        title: "Comment added",
        description: "Your feedback has been submitted. Thank you!"
      });
    }
    
    setCommentText("");
  };

  const handleEditComment = (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      setCommentText(comment.text);
      setEditingCommentId(id);
    }
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
    toast({
      title: "Comment deleted",
      description: "Your comment has been removed"
    });
  };

  const handleLikeComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleDislikeComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, dislikes: comment.dislikes + 1 }
        : comment
    ));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative">
      <FloatingCircles />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center gosip-gradient-text">Join To Improve This Version 🫂</h1>
          <Button 
            variant="outline" 
            as={Link} 
            to="/"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return To Home
          </Button>
        </div>
        
        <Card className="mb-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Rate Our App Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-6">
              Help us improve by rating these aspects of GoSipRead on a scale of 1-5 stars
            </p>
            <div className="grid gap-4">
              {qualities.map((quality, index) => (
                <StarRating
                  key={index}
                  quality={quality}
                  qualityId={index}
                  rating={ratings[index] || 0}
                  onRatingChange={handleRatingChange}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Share Your Thoughts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Tell us what you think about GoSipRead, or suggest improvements..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {editingCommentId && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditingCommentId(null);
                  setCommentText("");
                }}
              >
                Cancel
              </Button>
            )}
            <div className="ml-auto">
              <Button onClick={handleSubmitComment}>
                {editingCommentId ? "Update Comment" : "Submit Feedback"}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Community Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                comments.map((comment) => (
                  <CommentItem 
                    key={comment.id} 
                    comment={comment}
                    currentUserId={user?.id}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                    onLike={handleLikeComment}
                    onDislike={handleDislikeComment}
                  />
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              as={Link} 
              to="/"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return To Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
