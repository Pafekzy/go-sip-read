
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageCircle, Home } from "lucide-react";
import CommentItem, { Comment } from "./CommentItem";

interface CommentsCardProps {
  comments: Comment[];
  commentText: string;
  editingCommentId: string | null;
  currentUserId: string | null;
  onCommentTextChange: (text: string) => void;
  onSubmitComment: () => void;
  onCancelEdit: () => void;
  onEditComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
  onLikeComment: (id: string) => void;
  onDislikeComment: (id: string) => void;
}

const CommentsCard: React.FC<CommentsCardProps> = ({
  comments,
  commentText,
  editingCommentId,
  currentUserId,
  onCommentTextChange,
  onSubmitComment,
  onCancelEdit,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onDislikeComment
}) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
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
          onChange={(e) => onCommentTextChange(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        {editingCommentId && (
          <Button 
            variant="outline" 
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        )}
        <div className="ml-auto">
          <Button onClick={onSubmitComment}>
            {editingCommentId ? "Update Comment" : "Submit Feedback"}
          </Button>
        </div>
      </CardFooter>

      <CardContent>
        <CardTitle className="text-xl mb-4">Community Feedback</CardTitle>
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
                currentUserId={currentUserId}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
                onLike={onLikeComment}
                onDislike={onDislikeComment}
              />
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-6">
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Return To Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommentsCard;
