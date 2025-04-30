
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import FloatingCircles from "./FloatingCircles";
import RatingCard from "./RatingCard";
import CommentsCard from "./CommentsCard";
import { Comment } from "./CommentItem";

const FeedbackContainer: React.FC = () => {
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

  const handleCancelEdit = () => {
    setEditingCommentId(null);
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
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return To Home
            </Link>
          </Button>
        </div>
        
        <RatingCard 
          ratings={ratings} 
          onRatingChange={handleRatingChange} 
        />
        
        <CommentsCard 
          comments={comments}
          commentText={commentText}
          editingCommentId={editingCommentId}
          currentUserId={user?.id}
          onCommentTextChange={setCommentText}
          onSubmitComment={handleSubmitComment}
          onCancelEdit={handleCancelEdit}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          onLikeComment={handleLikeComment}
          onDislikeComment={handleDislikeComment}
        />
      </div>
    </div>
  );
};

export default FeedbackContainer;
