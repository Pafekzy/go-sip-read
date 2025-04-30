
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import { format } from "date-fns";

export interface Comment {
  id?: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
}

interface CommentItemProps {
  comment: Comment;
  currentUserId: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  currentUserId, 
  onEdit, 
  onDelete, 
  onLike, 
  onDislike 
}) => {
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

export default CommentItem;
